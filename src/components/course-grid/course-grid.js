import React from 'react';
import CourseCard from './course-card';
import { Link } from 'react-router-dom';

const CourseGrid = ({updateCourse, deleteCourse, courses}) => {
  return (
    <div className='container-fluid'>
      <h2>Course Grid</h2>
      <div className='row justify-content-end'>
        <div className='col-4 d-none d-md-block text-left'>
          Recent Documents
        </div>
        <div className='col-4 d-none d-md-block text-center'>
          Owned by me
          <i className='fas fa-chevron-down'/>
        </div>
        <div className='col-4 d-block text-right float-right'>
          <i className='fas fa-folder mr-2 fa-2x'/>
          <i className='fas fa-sort-alpha-up-alt mr-2 fa-2x'/>
          <Link to='/courses/table'>
            <i className='fas fa-2x fa-table'/>
          </Link>
        </div>
      </div>
      <br/>
      <div className='row'>
        {courses.map(course =>
            < CourseCard
              key={course._id}
              updateCourse={updateCourse}
              deleteCourse={deleteCourse}
              course={course}
            />)
        }
      </div>
    </div>
  )
}

export default CourseGrid