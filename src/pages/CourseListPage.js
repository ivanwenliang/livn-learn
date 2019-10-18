import React, { useState } from "react";
import { connect } from "react-redux";
import { addCourse } from "../actions";
import "./CourseListPage.css";

const CourseListPage = ({
  saveInProgress,
  saveError,
  coursesLoading,
  coursesError,
  courses,
  dispatch
}) => {
  const [courseName, setCourseName] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addCourse(courseName));
  };

  if (coursesLoading) {
    return <div>Loading...</div>;
  }

  if (coursesError) {
    return <div>{coursesError.message}</div>;
  }

  return courses.length === 0 ? (
    <div className="CreateCourse">
      <h1>Create Your First Course</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
            disabled={saveInProgress}
          />
          {saveError && (
            <div className="error-message">Error: {saveError.message}</div>
          )}
          <button type="submit" disabled={saveInProgress}>
            Create Course
          </button>
        </label>
      </form>
    </div>
  ) : (
    <div>
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
};

const mapState = state => ({
  coursesLoading: state.coursesLoading,
  coursesError: state.coursesError,
  saveInProgress: state.saveInProgress,
  saveError: state.saveError,
  courses: state.courses
});
export default connect(mapState)(CourseListPage);
