import React from 'react';
import CourseTable from './course-table/course-table';
import CourseGrid from './course-grid/course-grid';
import CourseEditor from "./course-editor/course-editor";
import {Route, Link} from 'react-router-dom';
import courseService from "../services/course-service";

class CourseManager extends React.Component {
  state = {
    courses: [],
    courseTitle: '',
    qwe: 123,
    sdf: 456
  }

  updateCourse = (course) => {
    console.log(course)
    courseService.updateCourse(course._id, course)
      .then(status => {
        this.setState((prevState) => {
          let newState = {...prevState}
          newState.courses = prevState.courses.map(c => {
            if (c._id === course._id) {
              return course
            } else {
              return c
            }
          })
          return newState;
        })
      })
    }

  componentDidMount() {
    courseService.findAllCourses()
      .then(courses => this.setState({courses}));
  }

  addCourse = () => {
    const newCourse = {
      title: 'New Course' || this.state.courseTitle,
      owner: 'me',
      modified: 'Never'
    }
    courseService.createCourse(newCourse)
      .then(updatedCourse => {
        this.setState((prevState) => ({
          ...prevState,
          courses: [...prevState.courses, updatedCourse],
          courseTitle: '',
        }))
      })
  }

  deleteCourse = (course) => {
    courseService.deleteCourse(course._id)
      .then(status => {
        this.setState((prevState) => ({
          courses: prevState.courses.filter(c => c._id !== course._id)
        }))
      })
  }

  render() {
    return(
      <div>
        <div className="wbdv-navbar">
          <div className="row">
            <div className="col-1">
              <Link to="/">
                <i className="fas fa-bars fa-2x"/>
              </Link>
            </div>
            <div className="col-2 d-none d-lg-block wbdv-navbar-title">
              Course Manager
            </div>
            <div className="col-8">
              <input className="form-control"
                     onChange={(event) => this.setState({courseTitle: event.target.value})}
                     value={this.state.courseTitle}/>
            </div>
            <div className="col-1 float">
              <i className="wbdv-clickable fas fa-plus-circle fa-2x wbdv-create-btn"
              onClick={this.addCourse}/>
            </div>
          </div>
        </div>
        <i className="wbdv-clickable fas fa-plus-circle fa-3x wbdv-create-float wbdv-create-btn"
           onClick={this.addCourse}/>
        <Route path='/courses/grid'>
          <CourseGrid
            updateCourse={this.updateCourse}
            deleteCourse={this.deleteCourse}
            courses={this.state.courses}
          />
        </Route>
        <Route path='/courses/table'>
          <CourseTable
            updateCourse={this.updateCourse}
            deleteCourse={this.deleteCourse}
            courses={this.state.courses}
          />
        </Route>
        <Route path="/courses/editor"
               render={(props) => <CourseEditor {...props}/>}>
        </Route>
      </div>
    );
  }
}

export default CourseManager