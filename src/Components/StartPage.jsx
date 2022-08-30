import { Link } from 'react-router-dom';
import React from 'react';

import {
  Container, Title, SubTitle, Button,
} from './StyledComponents/StyleStart';

export default function StartPage() {
  return (
    <Container>
      <Title>Quizz</Title>
      <SubTitle>Quizz by Samuel Monteiro with Open Trivia API</SubTitle>
      <Link to="/setup-quizz">
        <Button>
          Setup Quizz
        </Button>
      </Link>
    </Container>
  );
}
