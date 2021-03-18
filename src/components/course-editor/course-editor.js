import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import moduleReducer from '../../reducers/module-reducer';
import lessonReducer from '../../reducers/lesson-reducer';
import topicReducer from '../../reducers/topic-reducer';
import widgetReducer from '../../reducers/widget-reducer'
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import ModuleList from './module-list';
import LessonTabs from './lesson-tabs';
import TopicPills from './topic-pills';
import courseService from '../../services/course-service';
import styles from './course-editor.css';
import WidgetList from '../widgets/widget-list';

const reducer = combineReducers({
  moduleReducer: moduleReducer,
  lessonReducer: lessonReducer,
  topicReducer: topicReducer,
  widgetReducer: widgetReducer
})

const store = createStore(reducer);

const CourseEditor = () => {
  const { layout, courseId, moduleId, lessonId, topicId} = useParams();
  const [courseTitle, setCourseTitle] = useState('')

  useEffect(() => {
    courseService.findCourseById(courseId)
        .then((course) => {setCourseTitle(course.title);
    })
  }, [courseId])

  return (
    <Provider store={store}>
      <div>
        <h1>
          <Link to={`/courses/${layout}`}>
            <i className='fas fa-times wbdv-return-from-editor'/>
          </Link>
        {courseTitle}
        </h1>
        <div className='row'>
          <div className='col-4'>
            <ModuleList/>
          </div>
          <div className='col-8'>
            <LessonTabs/>
            <br/>
            <TopicPills/>
            <br/>
            <WidgetList/>
          </div>
        </div>
      </div>
    </Provider>)}

export default CourseEditor