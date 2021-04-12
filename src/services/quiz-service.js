// const QUIZZES_URL = 'http://localhost:4000/api/quizzes';
// const QUIZZES_URL = process.env.REACT_APP_QUIZZES_URL
const QUIZZES_URL = 'https://wbdv-sp21-serv-node-becker-sam.herokuapp.com';


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
