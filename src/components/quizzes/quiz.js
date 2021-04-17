import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Question from './question';
import QuizService from '../../services/quiz-service';
import QuestionService from '../../services/question-service';

const Quiz = () => {
  const {courseId, quizId} = useParams();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});

  const [graded, setGraded] = useState(false)
  const [attempts, setAttempts] = useState({})

  useEffect(() => {
    QuestionService.findQuestionsForQuiz(quizId)
      .then(res => setQuestions(res));
    QuizService.findQuizById(quizId)
      .then(res => setQuiz(res));
    if (graded) {
      QuizService.submitQuiz(quiz._id, questions)
          .then(res => setAttempts(res));
    }
  }, [quizId, graded])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <Link to={`/courses/${courseId}/quizzes`}
            className='fas fa-arrow-circle-left fa-2x'/>
        <h2>{quiz.title}</h2>
      </div>
        {
          questions.map(question =>
          <div key={question._id}>
            <Question question={question}
                      setQuestions={setQuestions}
                      questions={questions}
                      graded={graded}/>
          </div>
          )
        }
        <br></br>
        <div>
          <button onClick={() => setGraded(true)}
                  disabled={graded}
                  className='btn btn-success'>
            Grade
          </button>
          {
            graded &&
            <Link className='btn btn-success float-right'
                  to={`/courses/${courseId}/quizzes/${quizId}/attempts`}>
              View Attempts
            </Link>

          }
        </div>
    </div>
  )
}

export default Quiz