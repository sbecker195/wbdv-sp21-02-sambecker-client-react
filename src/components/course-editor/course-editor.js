import React from 'react';
import styles from './course-editor.css';

const CourseEditor = ({history}) => {
  return (
      <div class="container-fluid">
          <div class="row">
              <div class="col-4 bg-dark editor-modules">
                      <span>
                        <i className='fas fa-arrow-left fa-2x wbdv-close-editor-button wbdv-clickable'
                           onClick={() => history.goBack()}/>

                           <span className='wbdv-course-title'>CS5610 - WebDev</span>
                      </span>
                  <ul class="list-group">
                      <li class="list-group-item editor-list" >Module 1 - JQuery <i
                              class="float-right fas fa-times"></i></li>
                      <li class="list-group-item editor-list active">Module 2 - React <i
                              class="float-right fas fa-times"></i></li>
                      <li class="list-group-item editor-list">Module 3 - Redux <i
                              class="float-right fas fa-times"></i></li>
                      <li class="list-group-item editor-list">Module 4 - Native <i
                              class="float-right fas fa-times"></i></li>
                      <li class="list-group-item editor-list">Module 5 - Angular <i
                              class="float-right fas fa-times"></i></li>
                      <li class="list-group-item editor-list">Module 6 - Node <i
                              class="float-right fas fa-times"></i></li>
                      <li class="list-group-item editor-list">Module 7 - Mongo <i
                              class="float-right fas fa-times"></i></li>
                  </ul>
                  <i className='fas fa-plus-circle fa-2x float-right wbdv-add-module-button'/>
              </div>
        <div className='col-8'>
          <div className='wbdv-tabs-bar'>
            <ul className='nav nav-tabs'>
              <li className='nav-item'>
                <button className='btn nav-link'>Build</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link active'>Pages</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>Theme</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>Store</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>Apps</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>Settings</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>+</button>
              </li>
            </ul>
          </div>

        <div class="col-8 px-4 py-4">
            <ul class="nav nav-pills nav-fill">
                <li class="nav-item editor-topics">
                    <a class="nav-link active bg-dark" href="#">Topic 1</a>
                </li>
                <li class="nav-item editor-topics">
                    <a class="nav-link" href="#">Topic 2</a>
                </li>
                <li class="nav-item editor-topics">
                    <a class="nav-link" href="#">Topic 3</a>
                </li>
                <a href="#" class="btn btn-dark editor-topics"><i class="fas fa-plus"></i></a>
            </ul>
        </div>
        </div>
      </div>
    </div>
  );
}

export default CourseEditor;