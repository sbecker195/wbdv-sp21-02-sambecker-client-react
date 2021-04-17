import React, {useState, useEffect} from 'react';

const TrueFalseQuestion = ({question, setQuestions, questions, graded}) => {
   const [answer, setAnswer] = useState('');

   const choices = ['true', 'false'];

    useEffect(() => {
        if (graded) {
            const currentQuestion = questions.find(q =>
                q._id === question._id);
            currentQuestion.answer = answer;
            const otherQuestions = questions.filter(q =>
                q._id !== question._id);
            const newQuestion = [...otherQuestions, currentQuestion];
            setQuestions(newQuestion);
        }
    }, [graded])

   return (
     <div className='p-3 border'>
           <h4>
                {question.question}
                {
                    graded && answer === question.correct &&
                    <i className='fas fa-check float-right text-success'/>
                }
                {
                    graded && answer !== question.correct &&
                    <i className='fas fa-times float-right text-danger'/>
                }
           </h4>
           <ul className='list-group'>
             {
               choices.map(choice => {
                 return (
                    <li className={`list-group-item
                        ${graded && question.correct === choice ? 'list-group-item-success' : ''}
                        ${graded && answer === choice && question.correct !== answer ? 'list-group-item-danger' : ''}`}
                        key={`${Math.random() * 10000}`}>
                       <label><input
                                type='radio'
                                value={choice}
                                checked={answer === choice}
                                disabled={graded}
                                onChange={e =>
                                    setAnswer(e.target.value)}
                                name={question._id}
                                />
                        <span className = "bullet-left-padding">
                            {choice.toUpperCase()}
                        </span>
                       </label>
                       {
                         graded && question.correct === choice &&
                            <i className='fas fa-check float-right text-success'/>
                       }
                       {
                         graded && answer === choice && question.correct !== answer &&
                            <i className='fas fa-times float-right text-danger'/>
                       }
                     </li>
                 )
               })
             }
           </ul>
           <br>
           </br>
           <div>
             Your Answer: {answer}
           </div>
           <br>
           </br>
     </div>
  )
}

export default TrueFalseQuestion
