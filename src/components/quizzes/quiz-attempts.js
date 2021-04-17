import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import QuizService from '../../services/quiz-service';
import './quizzes.css'

const QuizAttempts = () => {
    const {courseId, quizId} = useParams();
    const [attempts, setAttempts] = useState([]);

    useEffect(() => {
        QuizService.findQuizAttempts(quizId)
            .then(res => setAttempts(res))
    }, [quizId])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Link to={`/courses/${courseId}/quizzes`}
                      className='fas fa-arrow-circle-left fa-2x'/>
                <h2>Quiz Attempts</h2>
            </div>
            <table className='table'>
                <thead>
                <tr>
                    <th>Attempt</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {
                    attempts.map((attempt, index ) =>
                        <tr key={attempt._id}>
                            <td>{index + 1}</td>
                            <td>{attempt.score}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default QuizAttempts