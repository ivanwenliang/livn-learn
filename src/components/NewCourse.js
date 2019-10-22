import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { addCourse } from "../actions";
import "./NewCourse.css";

const NewCourse = ({ dispatch, saveInProgress, saveError }) => {
  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addCourse(courseName, coursePrice));
  };

  return (
    <div className="NewCourse">
      <h1>Create Your First Course</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input
            ref={inputRef}
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
  );
};

const mapState = state => ({
  saveInProgress: state.courses.saveInProgress,
  saveError: state.courses.saveError
});
export default connect(mapState)(NewCourse);
