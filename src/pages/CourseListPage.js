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
  const [coursePrice, setCoursePrice] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addCourse(courseName, coursePrice));
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
        </label>
        <label>
          Course Price:
          <input
            value={coursePrice}
            onChange={e => setCoursePrice(e.target.value)}
            disabled={saveInProgress}
          />
        </label>
        {saveError && (
          <div className="error-message">Error: {saveError.message}</div>
        )}
        <button type="submit" disabled={saveInProgress}>
          Create Course
        </button>
      </form>
    </div>
  ) : (
    <div className="CourseList">
      <h1>Your Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <div className="title">{course.name}</div>
            <div className="price">${course.price.toFixed(2)}</div>
          </li>
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
