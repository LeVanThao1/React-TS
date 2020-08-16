import React, { useState } from 'react';
import QuestionCart from './components/QuestionCart';
import { Difficutly, fetchQuizQuestions, QuestionState } from './api';
import { GlobalStyle, Wraper } from './App.styles'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficutly.EASY);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    // user answer
    const answer = e.currentTarget.value;
    // check answer against correct answer
    const correct = questions[number].correct_answer === answer;
    // add score if answer is correct
    if(correct) setScore((prev) => prev + 1);
    // save answer in the array for userAnswers
    const answerObject: AnswerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer
    }
    setUserAnswer(prev => [...prev, answerObject])
  }

  const nextQuiz = () => {
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    else {
      setNumber(nextQuestion)
    }
  }

  return (
    <>
      <GlobalStyle/>
      <Wraper>
        <h1>React TS Quiz App</h1>
        { gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
          <button 
            className="start" 
            onClick={startQuiz}
          >
            Start
          </button> 
        ) : null}
        { !gameOver ? <p className="score">Score : {score}</p> : null}
        {loading && <p>Loading Question ...</p>}
        {
          !loading && !gameOver && (
            <QuestionCart
              questionNb={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              callback={checkAnswer}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswer.length > number ? userAnswer[number] : undefined}
            />
          )
        }
        {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTIONS -1 &&
          <button className="next" onClick={nextQuiz}>Next Quiz</button> 
        }
      </Wraper>
    </>
  );
}

export default App;
