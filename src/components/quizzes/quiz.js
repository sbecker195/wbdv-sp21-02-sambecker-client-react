import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Question from './question';
import QuizService from '../../services/quiz-service';
import QuestionService from '../../services/question-service';

const Quiz = () => {
  const {courseId, quizId} = useParams();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    QuestionService.findQuestionsForQuiz(quizId)
      .then(res => setQuestions(res));
    QuizService.findQuizById(quizId)
      .then(res => setQuiz(res));
  }, [quizId])

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
            <Question question={question}/>
          </div>
          )
        }
    </div>

  )
}

export default Quiz