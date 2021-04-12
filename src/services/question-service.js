// const QUIZZES_URL = 'http://localhost:4000/api/quizzes';
const QUIZZES_URL = process.env.REACT_APP_QUIZZES_URL;

export const findQuestionsForQuiz = (qid) =>
  fetch(`${QUIZZES_URL}/${qid}/questions`)
    .then(response => response.json())

const api = {
  findQuestionsForQuiz
}

export default api
