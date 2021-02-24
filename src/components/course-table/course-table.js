import React from 'react';
import CourseRow from './course-row';
import {Link} from 'react-router-dom';

class CourseTable
    extends React.Component {

  render() {
    return (
      <div className='container-fluid'>
        <h2>Course Table</h2>
        <table className='table'>
          <thead>
          <tr>
            <th>Title</th>
            <th className='d-none d-md-table-cell'>Owned By</th>
            <th className='d-none d-lg-table-cell'>Last Modified</th>
            <th>
              <div className='float-right'>
                <i className='fas fa-folder mr-2 fa-2x'/>
                <i className='fas fa-sort-alpha-up-alt mr-2 fa-2x'/>
                <Link to='/courses/grid'>
                  <i className='fas fa-2x fa-th'/>
                </Link>
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.courses.map(course =>
              <CourseRow
                key={course._id}
                updateCourse={this.props.updateCourse}
                deleteCourse={this.props.deleteCourse}
                course={course}
              />)
          }
          </tbody>
        </table>
      </div>
    )
  }
}

export default CourseTable;