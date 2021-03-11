import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import EditableItem from './editable-item';
import lessonService from '../../services/lesson-service'
import styles from './course-editor.css';

const LessonTabs = ({
                      lessons = [],
                      findLessonsForModule,
                      createLesson,
                      deleteLesson,
                      updateLesson
                    }) => {

  const {layout, courseId, moduleId, lessonId} = useParams();

  useEffect(() => {
    if (moduleId !== 'undefined' && typeof moduleId !== 'undefined') {
      findLessonsForModule(moduleId)
    }
  }, [moduleId, lessonId, findLessonsForModule])

  return (
    <div>
      <ul className='nav nav-tabs'>
        {
          lessons.map(lesson =>
            <li className='nav-item'
                key={lesson._id}>
              <EditableItem
                active={lesson._id === lessonId}
                highlight={''}
                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                item={lesson}
                deleteItem={deleteLesson}
                updateItem={updateLesson}
                />
            </li>
          )
        }
        <li className='nav-item fas fa-plus fa-2x wbdv-add wbdv-clickable'
            key='add'
            onClick={() => createLesson(moduleId)}/>
      </ul>
    </div>
  )
}

const stpm = (state) => ({
  lessons: state.lessonReducer.lessons
})

const dtpm = (dispatch) => ({
  createLesson: (moduleId) => {
    lessonService.createLesson(moduleId, {title: 'New Lesson'})
      .then(theActualLesson => dispatch({
        type: 'CREATE_LESSON',
        lesson: theActualLesson
      }))
  },
  findLessonsForModule: (moduleId) => {
    lessonService.findLessonsForModule(moduleId)
      .then(lessons => dispatch({
        type: 'FIND_LESSONS_FOR_MODULE',
        lessons
      }))
  },
  updateLesson: (lesson) => {
    lessonService.updateLesson(lesson._id, lesson)
      .then(status => dispatch({
        type: 'UPDATE_LESSON',
        lessonToUpdate: lesson
      }))
  },
  deleteLesson: (lesson) => {
    lessonService.deleteLesson(lesson._id)
      .then(status => dispatch({
        type: 'DELETE_LESSON',
        lessonToDelete: lesson
      }))
  }
})

export default connect(stpm, dtpm)(LessonTabs)