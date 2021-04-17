import React from 'react';
import TrueFalseQuestion from './true-false-question';
import MultipleChoiceQuestion from './multiple-choice-question';

const Question = ({question, questions, setQuestions, graded}) => {
    return(
        <div>
            {
                question.type === "TRUE_FALSE" &&
                <TrueFalseQuestion
                    question={question}
                    setQuestions={setQuestions}
                    questions={questions}
                    graded={graded}/>
            }
            {
                question.type === "MULTIPLE_CHOICE" &&
                <MultipleChoiceQuestion
                    question={question}
                    setQuestions={setQuestions}
                    questions={questions}
                    graded={graded}/>
            }
        </div>
    )
}

export default Question