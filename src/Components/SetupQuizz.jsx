import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Container, Title, Load, InputField, List, InputNumber, InputRadio, ContainerButton, Button, LinkStyle,
} from './StyledComponents/StyleSetup';

export default function SetupQuizz({ getUrl }) {
  const [options, setOptions] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      setCategories(await data.trivia_categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>));
      setIsLoaded(true);
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const startQuizz = () => {
    let urlApi = 'https://opentdb.com/api.php?';
    if (options.amount) {
      urlApi += `amount=${options.amount}`;
    } else {
      urlApi += 'amount=5';
    }
    if (options.category) urlApi += `&category=${options.category}`;
    if (options.difficulty) urlApi += `&difficulty=${options.difficulty}`;
    if (options.type) urlApi += `&type=${options.type}`;

    getUrl(urlApi);
  };

  return (
    <Container>
      <Title>Quizz</Title>
      {!isLoaded && <Load>Loading...</Load>}
      {isLoaded && (
      <form>
        <InputField htmlFor="inpt-num">
          Number of questions:
          <InputNumber type="number" name="amount" id="inpt-num" min="5" max="50" placeholder="Min: 5 and Max: 50" required onChange={handleChange} />
        </InputField>

        <InputField htmlFor="category">
          Select Category:
          <List id="category" name="category" onChange={handleChange}>
            <option value="any">Any Category</option>
            {categories}
          </List>
        </InputField>

        <InputField htmlFor="difficulty">
          Select difficulty:
          <List id="difficulty" name="difficulty" onChange={handleChange}>
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </List>
        </InputField>

        <InputField htmlFor="mult-choice" disp="block">
          Multiple choice
          <InputRadio type="radio" id="mult-choice" name="type" value="multiple" onClick={handleChange} required />
        </InputField>
        <InputField htmlFor="true-false" disp="block">
          True or False
          <InputRadio type="radio" id="true-false" name="type" value="boolean" onClick={handleChange} required />
        </InputField>

        <Link onClick={startQuizz} to="/quizz" style={LinkStyle}>
          <ContainerButton>
            <Button>Start Quizz</Button>
          </ContainerButton>
        </Link>
      </form>
      )}
    </Container>
  );
}

SetupQuizz.propTypes = {
  getUrl: PropTypes.func.isRequired,
};
