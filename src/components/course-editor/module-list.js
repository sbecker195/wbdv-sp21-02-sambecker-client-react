import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import EditableItem from './editable-item';
import moduleService from '../../services/module-service'
import styles from './course-editor.css';

const ModuleList = ({
                     myModules = [],
                     createModule,
                     deleteModule,
                     updateModule,
                     findModulesForCourse
                    }) => {

    const {layout, courseId, moduleId} = useParams();

    useEffect(() => {
      if (courseId !== 'undefined' && typeof courseId !== undefined) {
        findModulesForCourse(courseId);
      }
    }, [moduleId, courseId, findModulesForCourse])

    return (
      <div>
        <ul className='list-group'>
          {
            myModules.map(module =>
              <li className={`list-group-item ${module._id === moduleId ? 'active':''}`}
                    key={module._id}>
                <EditableItem
                      to={`/courses/${layout}/edit/${courseId}/modules/${module._id}`}
                      updateItem={updateModule}
                      deleteItem={deleteModule}
                      item={module}
                      highlight={`${module._id === moduleId ? 'wbdv-highlighted-link':''}`}
                      active={module._id === moduleId}
                />
              </li>
            )
          }
          <li className='list-group-item fas fa-plus fa-2x wbdv-add wbdv-clickable'
              onClick={() => createModule(courseId)}/>
        </ul>
      </div>
    )
  }

const stpm = (state) => {
  return {
    myModules: state.moduleReducer.modules
  }
}

const dtpm = (dispatch) => {
  return {
    createModule: (courseId) => {
      moduleService.createModule(courseId, {title: 'New Module'})
        .then(theActualModule => dispatch({
          type: 'CREATE_MODULE',
          module: theActualModule
        }))
    },
    findModulesForCourse: (courseId) => {
      moduleService.findModulesForCourse(courseId)
        .then(theModules => dispatch({
          type: 'FIND_MODULES_FOR_COURSE',
          modules: theModules
        }))
    },
    updateModule: (module) => {
      moduleService.updateModule(module._id, module)
        .then(status => dispatch({
          type: 'UPDATE_MODULE',
          module
        }))
    },
    deleteModule: (module) => {
      moduleService.deleteModule(module._id)
        .then(status => dispatch({
          type: 'DELETE_MODULE',
          moduleToDelete: module
        }))
    }
  }
}

export default connect(stpm, dtpm)(ModuleList);