import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import EditableItem from './editable-item';
import {useParams} from 'react-router-dom';
import topicService from '../../services/topic-service'
import styles from './course-editor.css';

const TopicPills = ({
                      myTopics = [],
                      findTopicsForLesson,
                      createTopic,
                      deleteTopic,
                      updateTopic
                    }) => {
  const {layout, courseId, moduleId, lessonId, topicId} = useParams();

  useEffect(() => {
    if (lessonId !== 'undefined' && typeof lessonId !== 'undefined') {
      findTopicsForLesson(lessonId);
    }
  }, [moduleId, lessonId, topicId, findTopicsForLesson])

  return (
    <div>
      <ul className='nav nav-pills'>
        {
          myTopics.map(topic =>
            <li className='nav-item' key={topic._id}>
              <EditableItem
                active={topic._id === topicId}
                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                item={topic}
                deleteItem={deleteTopic}
                updateItem={updateTopic}
                highlight={`${topic._id === topicId ? 'wbdv-highlighted-link' : ''}`}/>
            </li>
          )
        }
        <li className='nav-item fas fa-plus fa-2x wbdv-clickable wbdv-add'
            onClick={() => createTopic(lessonId)}>
        </li>
      </ul>
    </div>
  )
}

const stpm = (state) => ({
  myTopics: state.topicReducer.topics
})

const dtpm = (dispatch) => ({
  createTopic: (lessonId) => {
    topicService.createTopic(lessonId, {title: 'New Topic'})
      .then(theActualTopic => dispatch({
        type: 'CREATE_TOPIC',
        topic: theActualTopic
      }))
  },
  findTopicsForLesson: (lessonId) => {
    topicService.findTopicsForLesson(lessonId)
      .then(theActualTopics => dispatch({
        type: 'FIND_TOPICS_FOR_LESSON',
        topics: theActualTopics
      }))
  },
  updateTopic: (topic) => {
    topicService.updateTopic(topic._id, topic)
      .then(status => dispatch({
        type: 'UPDATE_TOPIC',
        topicToUpdate: topic
      }))
  },
  deleteTopic: (topic) => {
    topicService.deleteTopic(topic._id)
      .then(status => dispatch({
        type: 'DELETE_TOPIC',
        topicToDelete: topic
      }))
  }
})

export default connect(stpm, dtpm)(TopicPills);