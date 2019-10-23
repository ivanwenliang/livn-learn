import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { addLesson, resetLessonError } from "../actions";
import "./NewLesson.css";

const NewLesson = ({
  addLesson,
  courseId,
  resetError,
  saving,
  error,
  onSubmit,
  className
}) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef();

  const commitEdit = e => {
    e.preventDefault();
    onSubmit(title)
      .then(reset)
      .catch(error => {
        setEditing(false);
        setEditing(true);
      });
    reset();
  };

  const cancelEdit = () => {
    if (!saving) {
      reset();
    }
  };

  const beginEditing = () => {
    setEditing(true);
  };

  const reset = () => {
    setTitle("");
    setEditing(false);
    resetError();
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  return editing ? (
    <form className="add-lesson-button editing" onSubmit={commitEdit}>
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onBlur={reset}
        placeholder="Name the lesson"
      />
    </form>
  ) : (
    <button
      className="add-lesson-button"
      onClick={() => setEditing(true)}
      type="submit"
    >
      New Lesson
    </button>
  );
};

const mapState = state => ({
  saving: state.lessons.saving,
  error: state.lessons.error
});
const mapDispatch = {
  addLesson,
  resetError: resetLessonError
};
export default connect(
  null,
  mapDispatch
)(NewLesson);
