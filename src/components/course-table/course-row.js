import React from 'react';
import {Link} from 'react-router-dom';

class CourseRow extends React.Component {

  state = {
    name: this.props.course.name || '',
    editing: false
  }

  saveName(course) {
    this.setState((prev) => ({...prev, editing: false}))
    const newCourse = {
      ...course,
      name: this.state.name
    }
    this.props.updateCourse(newCourse);
  }

  render() {
    return (
      <tr>
        <td>
          { !this.state.editing && <Link to='/editor'>{this.props.course.name}</Link>}
          { this.state.editing && <input onChange = {
              (event) => this.setState({name: event.target.value})
            }
                value={this.state.name}
                className='form-control'/>
          }
        </td>
        <td className='d-none d-md-table-cell'>{this.props.course.owner}</td>
        <td className='d-none d-lg-table-cell'>{this.props.course.modified}</td>
        <td className='text-right'>
          { this.state.editing &&
            <i className='wbdv-clickable fas fa-check wbdv-save-btn'
               onClick={() => this.saveName(this.props.course)}/> }
          { this.state.editing && <i className='wbdv-clickable fas fa-times wbdv-delete-btn'
               onClick={() => this.props.deleteCourse(this.props.course)}/> }
          { !this.state.editing && <i className='wbdv-clickable fas fa-edit'
               onClick={() => this.setState((prev) => ({...prev, editing: true}))}/> }
        </td>
      </tr>
    )
  }
}

export default CourseRow