import React from 'react';
import  {ButtonWraper, Wraper} from './QuestionCart.styles';
import { AnswerObject } from '../App';
import {Progress} from "antd";

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNb: number;
    totalQuestions: number
}

const QuestionCart: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNb,
    totalQuestions
}) => {
    return (
        <Wraper>
            <p className="number">
                Question: {questionNb} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div className="progress">
                <Progress percent={questionNb / totalQuestions * 100} size="small" status="active" />
            </div>
            <div>
            
                {
                    answers.map((answer, index) => (
                        <ButtonWraper 
                            correct={userAnswer?.correctAnswer === answer}
                            userClicked={userAnswer?.answer === answer} key={answer+index}
                        >
                            <button 
                                value={answer}
                                className="btnCart" 
                                disabled={userAnswer ? true : false}
                                onClick={callback}
                            >
                                <span dangerouslySetInnerHTML={{ __html: answer }}/>
                            </button>
                        </ButtonWraper>
                    ))
                }
            </div>
        </Wraper>
    );
}

export default QuestionCart;