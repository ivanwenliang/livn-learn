import React from "react";
import { connect } from "react-redux";

const CourseListPage = ({ courses }) => {
  return courses.length === 0 ? (
    <div>
      <h1>Create Your First Course</h1>
      <form>
        <label>
          Course Name:
          <input></input>
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
  courses: state.courses
});
export default connect(mapState)(CourseListPage);
