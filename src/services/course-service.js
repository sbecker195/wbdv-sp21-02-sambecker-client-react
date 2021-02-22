const COURSES_URL = 'https://wbdv-generic-server.herokuapp.com/api/001063084/courses';

export const findAllCourses = () => {
  return fetch(COURSES_URL).then((response) => response.json());
}

export const deleteCourse = (id) => {
  return fetch(`${COURSES_URL}/${id}`, {
    method: 'DELETE'
  }).then(response => response.json());
}

export const createCourse = (course) => {
  return fetch(COURSES_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(course)
  })
    .then(response => response.json());
}

export const updateCourse = (id, course) => {
  return fetch(`${COURSES_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(course)
  }).then(response => response.json());
}

export const findCourseById = (id) => {
  return fetch(`${COURSES_URL}/${id}`).then(response => response.json());
}

export default {
  findAllCourses,
  deleteCourse,
  createCourse,
  updateCourse,
  findCourseById
}