import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({updateCourse, deleteCourse, course}) => {

  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const saveTitle = () => {
    setEditing(false);
    const newCourse = {
      ...course,
      title: newTitle,
    }
    updateCourse(newCourse)
  }

  React.useEffect(() => {
    setNewTitle(course.title);
  }, [course])
  const event = (event) => setNewTitle(event.target.value);

  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div className="card">
        <img src="https://lh3.googleusercontent.com/proxy/Ph3cExBPGDgE_BbmmFZ_gcc84td2o6iRYvzcF0j0XhbRy8iJZhVd7YpbKjtK8uqYlG6wrUG_XPfIb-HDJm-AxECZ-77xvg4QjQ5EkwE5QUX6" className="card-img-top" alt="..."/>
        <div className="card-body">
          { !editing && <h4 className="card-title">{course.title}</h4>}
          { editing && <input onChange={event}
                             value={newTitle}
                             className='form-control'
          />}
          <p>
            <Link to={`/courses/${course._id}/quizzes`}>
                Quizzes
            </Link>
           </p>
          <Link to={`/courses/grid/edit/${course._id}`} className="btn btn-primary">
            {course.title}
          </Link>
          { !editing && <i className="wbdv-clickable fas fa-edit wbdv-edit-btn fa-2x float-right" onClick={() => setEditing(true)}/>}
          { editing && <i className="wbdv-clickable fas fa-check wbdv-save-btn float-right" onClick={() => saveTitle()}/>}
          { editing && <i className="wbdv-clickable fas fa-times wbdv-delete-btn float-right" onClick={() => deleteCourse(course)}/>}
        </div>
      </div>
    </div>
  )
}

export default CourseCard;