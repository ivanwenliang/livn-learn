import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { addLesson, resetLessonError } from "../actions";
import "./Lesson.css";

const Lesson = ({
  resetError,
  saving,
  error,
  onSubmit,
  className,
  lesson,
  children
}) => {
  const initialValue = lesson ? lesson.name : "";
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(initialValue);
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
    setTitle(initialValue);
    setEditing(false);
    resetError();
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  return editing ? (
    <>
      <form
        className={`${className || ""} editing ${error ? "error" : ""}`}
        onSubmit={commitEdit}
      >
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={cancelEdit}
          placeholder="Name the lesson"
        />
      </form>
      {error && <div>{error.message}</div>}
    </>
  ) : (
    children(beginEditing)
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
  mapState,
  mapDispatch
)(Lesson);
