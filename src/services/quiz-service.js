const QUIZZES_URL = 'http://localhost:4000/api/quizzes';

export const findQuizById = (qid) =>
  fetch(`${QUIZZES_URL}/${qid}`)
    .then(response => response.json())

export const findAllQuizzes = () =>
  fetch(QUIZZES_URL)
    .then(response => response.json())


const api = {
  findQuizById, findAllQuizzes
}

export default api