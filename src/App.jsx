import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import SetupQuizz from './Components/SetupQuizz';
import StartPage from './Components/StartPage';
import Quizz from './Components/Quizz';

export default function App() {
  const [urlApi, setUrlApi] = useState();

  const getUrl = (url) => {
    setUrlApi(url);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="setup-quizz" element={<SetupQuizz getUrl={getUrl} />} />
        <Route path="quizz" element={<Quizz urlApi={urlApi} />} />
      </Routes>
    </BrowserRouter>
  );
}
