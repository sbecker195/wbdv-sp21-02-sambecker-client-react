// const QUIZZES_URL = 'http://localhost:4000/api/quizzes';
//const QUIZZES_URL = 'https://wbdv-sp21-serv-node-becker-sam.herokuapp.com';
const QUIZZES_URL = process.env.REACT_APP_QUIZZES_URL

export const findQuizById = (qid) =>
  fetch(`${QUIZZES_URL}/${qid}`)
    .then(response => response.json())

export const findAllQuizzes = () =>
  fetch(QUIZZES_URL)
    .then(response => response.json())

export const submitQuiz = (qid, questions) =>
    fetch(`${QUIZZES_URL}/${qid}/attempts`, {
      method: 'POST',
      body: JSON.stringify(questions),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())

export const findQuizAttempts = (qid) =>
    fetch(`${QUIZZES_URL}/${qid}/attempts`)
        .then(response => response.json())

const api = {
  findQuizById, findAllQuizzes, submitQuiz, findQuizAttempts
}

export default api