import React, { useState, useEffect, ChangeEventHandler, MouseEventHandler } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Load, Container, Form, Question, Field, InputLabel, InputRadio, Line, Text, Button, Error, Section, Asked, Answered } from './StyledComponents/StyleQuizz';

interface UrlApi {
  urlApi: string;
}

interface Question {
  incorrect_answers: string[];
  correct_answer: string;
  difficulty: string;
  category: string;
  question: string;
  type: string;
}

interface Mounted extends Question {
  questionNumber: number;
  allAnswers: string[];
  isCorrect: boolean;
  correct: string;
  wrong: string;
}

interface Answers {
  name: string;
  value: string;
}

export default function Quizz({ urlApi }: UrlApi) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoaded, setIsloaded] = useState(false);
  const [isFinished, setIsFinished] = useState<JSX.Element[][]>();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState<Answers[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(urlApi);
      const data = await response.json();

      const organizedResults = (data.results.map((question: Question, index: number) => {
        function shuffleArray(questionsArray: Array<string>) {
          const tempArray = questionsArray;
          for (let i = tempArray.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = tempArray[i];
            tempArray[i] = tempArray[j];
            tempArray[j] = temp;
          }
          return tempArray;
        }

        function htmlDecode(input: string) {
          const parser = new DOMParser().parseFromString(input, 'text/html');
          if(parser.documentElement.textContent == null) return "";
          return parser.documentElement.textContent;
        }

        const mixedQuestions= [...question.incorrect_answers.map((incAnswer) => htmlDecode(incAnswer)), htmlDecode(question.correct_answer)];

        return {
          questionNumber: index,
          question: htmlDecode(question.question),
          type: htmlDecode(question.type),
          correct: htmlDecode(question.correct_answer),
          allAnswers: shuffleArray(mixedQuestions),
        };
      }));

      setQuestions(organizedResults);
      setIsloaded(true);
    }
    fetchData();
  }, []);

  const selectAnswer: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const newAnswer = { name, value };
    const tempArray = answers;
    if (tempArray.length === 0) {
      tempArray.push(newAnswer);
    } else {
      const index = tempArray.findIndex((obj) => obj.name === name);
      if (index === -1) {
        tempArray.push(newAnswer);
      } else {
        tempArray[index] = newAnswer;
      }
    }
    setAnswers(tempArray);
  };

  const mountQuestions = (arr: Mounted[]) => {
    const mountedQuestions = arr.map((question) => {
      if (question.type === 'boolean') {
        return (
          <Field key={question.questionNumber}>
            <Question>{question.question}</Question>
            <InputRadio id={`${question.questionNumber}0`} name={`${question.questionNumber}`} value={question.allAnswers[0]} onChange={selectAnswer} />
            <InputLabel htmlFor={`${question.questionNumber}0`}>
              {question.allAnswers[0]}
            </InputLabel>
            <InputRadio id={`${question.questionNumber}1`} name={`${question.questionNumber}`} value={question.allAnswers[1]} onChange={selectAnswer} />
            <InputLabel htmlFor={`${question.questionNumber}1`}>
              {question.allAnswers[1]}
            </InputLabel>
            <Line />
          </Field>
        );
      }
      if (question.type === 'multiple') {
        return (
          <Field key={question.questionNumber}>
            <Question>{question.question}</Question>
            <InputRadio id={`${question.questionNumber}0`} name={`${question.questionNumber}`} value={question.allAnswers[0]} onChange={selectAnswer} />
            <InputLabel htmlFor={`${question.questionNumber}0`}>
              {question.allAnswers[0]}
            </InputLabel>
            <InputRadio id={`${question.questionNumber}1`} name={`${question.questionNumber}`} value={question.allAnswers[1]} onChange={selectAnswer} />
            <InputLabel htmlFor={`${question.questionNumber}1`}>
              {question.allAnswers[1]}
            </InputLabel>
            <InputRadio id={`${question.questionNumber}2`} name={`${question.questionNumber}`} value={question.allAnswers[2]} onChange={selectAnswer} />
            <InputLabel htmlFor={`${question.questionNumber}2`}>
              {question.allAnswers[2]}
            </InputLabel>
            <InputRadio id={`${question.questionNumber}3`} name={`${question.questionNumber}`} value={question.allAnswers[3]} onChange={selectAnswer} />
            <InputLabel htmlFor={`${question.questionNumber}3`}>
              {question.allAnswers[3]}
            </InputLabel>
            <Line />
          </Field>
        );
      }
      return (
        <Section key={question.questionNumber}>
          <Asked>{question.question}</Asked>
          <Answered bgColor="#94D7A2">
            {question.correct}
          </Answered>
          {!question.isCorrect && (
          <Answered bgColor="#F8BCBC">
            {question.wrong}
          </Answered>
          )}
          <Line />
        </Section>
      );
    });

    function separatePages(results: JSX.Element[], numberOfQuestions: number) {
      const tempArray = [];
      for (let i = 0; i < results.length; i += numberOfQuestions) {
        const page = results.slice(i, i + numberOfQuestions);
        tempArray.push(page);
      }
      return tempArray;
    }

    return separatePages(mountedQuestions, 5);
  };

  const changePage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, arr: string | any[]) => {
    e.preventDefault();
    if (isFinished) {
      setCurrentPage((prevState) => prevState + 1);
    } else if (arr.length / (currentPage + 1) === 5) {
      setCurrentPage((prevState) => prevState + 1);
    } else {
      setError('You need to answer all the answers to go');
    }
  };

  const finish = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const tempArray: Mounted[] = [];
    for (let i = 0; i < answers.length; i += 1) {
      const response = answers[i];
      for (let j = 0; j < questions.length; j += 1) {
        const question: Mounted = questions[j];
        if (Number(response.name) === question.questionNumber) {
          tempArray.push({
            isCorrect: response.value === question.correct,
            questionNumber: question.questionNumber,
            question: question.question,
            correct: question.correct,
            wrong: response.value,
            incorrect_answers: [],
            correct_answer: '',
            allAnswers: [],
            difficulty: '',
            category: '',
            type: ''
          });
        }
      }
    }
    setCurrentPage(0);
    setIsFinished(mountQuestions(tempArray));
  };

  const allPages = mountQuestions(questions);

  return (
    <Container>
      <Form>
        {!isFinished && (
          <>
            {!isLoaded && <Load>Loading...</Load>}
            {isLoaded && (
            <>
              {allPages[currentPage]}
              <Text>
                Page
                {' '}
                {currentPage + 1}
                {' '}
                of
                {' '}
                {allPages.length}
              </Text>
              {error !== '' && <Error>{error}</Error>}
              {allPages.length > 1 && currentPage < allPages.length - 1 ? <Button onClick={(e) => changePage(e, answers)}>Next Page</Button> : <Button onClick={finish}>Finish</Button>}
            </>
            )}
          </>
        )}
        {isFinished && (
          <>
            {isFinished[currentPage]}
            {isFinished.length > 1 && currentPage < isFinished.length - 1 ? <Button onClick={(e) => changePage(e, isFinished)}>Next Answers</Button> : <Link to="/"><Button>Restart Quizz</Button></Link>}
          </>
        )}
      </Form>
    </Container>

  );
}

Quizz.propTypes = {
  urlApi: PropTypes.string,
};

Quizz.defaultProps = {
  urlApi: 'vazio',
};
