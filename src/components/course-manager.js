import React from 'react';
import CourseTable from './course-table/course-table';
import CourseGrid from './course-grid/course-grid';
import CourseEditor from "./course-editor/course-editor";
import {Route, Link} from 'react-router-dom';
import courseService from "../services/course-service";
import CourseManagerBar from './course-manager-header.js';

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
        <Route path='/courses/table' exact={true}>
          <div>
            <CourseManagerBar addCourse={this.addCourse}
                    nameOnChange={(event) => this.setState({courseTitle: event.target.value})}
                    courseTitle={this.state.courseTitle}/>
            <CourseTable
              updateCourse={this.updateCourse}
              deleteCourse={this.deleteCourse}
              courses={this.state.courses}
            />
          </div>
        </Route>
        <Route path='/courses/grid' exact={true}>
          <div>
            <CourseManagerBar addCourse={this.addCourse}
                    nameOnChange={(event) => this.setState({courseTitle: event.target.value})}
                    courseTitle={this.state.courseTitle}/>
            <CourseGrid updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        courses={this.state.courses}
            />
          </div>
        </Route>
        <Route path={['/courses/:layout/edit/:courseId',
                      '/courses/:layout/edit/:courseId/modules/:moduleId',
                      '/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId',
                      '/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId']}
                       exact={true}
                       render={(props) => <CourseEditor {...props}/>}/>
      </div>
    )
  }
}

export default CourseManager