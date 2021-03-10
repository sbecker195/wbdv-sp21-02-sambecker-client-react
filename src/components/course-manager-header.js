import React from 'react';
import {Link} from 'react-router-dom';

const CourseManagerBar = ({addCourse, nameOnChange, courseTitle}) => {
  return (
    <>
        <div className="wbdv-navbar">
          <div className="row">
            <div className="col-1">
              <Link to="/">
                <i className="fas fa-bars fa-2x"/>
              </Link>
            </div>
            <div className="col-2 d-none font-weight-bold d-lg-block wbdv-navbar-title">
              Course Manager
            </div>
          <div className="col-8">
            <input className="form-control"
                   onChange={nameOnChange}
                   value={courseTitle}/>
          </div>
            <div className="col-1 float">
              <i className="wbdv-clickable fas fa-plus-circle fa-2x wbdv-create-btn"
              onClick={addCourse}/>
            </div>
          </div>
        </div>
        <i className="wbdv-clickable fas fa-plus-circle fa-3x wbdv-create-float wbdv-create-btn"
           onClick={addCourse}/>
    </>
  );
}

export default CourseManagerBar;