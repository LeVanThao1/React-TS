import axios from 'axios';
import { shuffleArray } from '../untils'

export type Question = {
    category: string;
    correct_answer: string;
    difficutly: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[]};

export enum Difficutly {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export const fetchQuizQuestions = async (amount: number, difficutly: Difficutly) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficutly=${difficutly}&type=multiple`;
    const data = await (await axios.get(endpoint));
    return data.data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}