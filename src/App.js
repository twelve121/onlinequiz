import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Exam from './components/Exam/Exam';
import ResultExam from './components/ResultExam/ResultExam';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route exact path='/exams/:examId/' element={<Exam />}/>
          <Route exact path='/result/:resultId/' element={<ResultExam />}/>
          <Route exact path='/contact' element={<Contact />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
