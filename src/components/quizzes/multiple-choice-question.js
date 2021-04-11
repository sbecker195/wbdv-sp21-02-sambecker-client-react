import React, {useState} from 'react';

const MultipleChoiceQuestion = ({question}) => {
  const [answer, setAnswer] = useState('');
  const [graded, setGraded] = useState(false);

  const choices = question.choices;

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
                        {choice}
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
          <div>
            <div>
              <button className='btn btn-success'
                      onClick={() =>
                            setGraded(true)}
                      disabled={graded}>
                      Grade
              </button>
            </div>
          </div>
    </div>
  )
}

export default MultipleChoiceQuestion;