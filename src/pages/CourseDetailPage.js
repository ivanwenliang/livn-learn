import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, Match } from "@reach/router";
import NotFoundPage from "./NotFoundPage";
import Lesson from "../components/Lesson";
import Loading from "../components/Loading";
import { getLessonsByCourse, getCourseById } from "../selectors";
import { loadLessons, addLesson, saveLesson } from "../actions";
import "./CourseDetailPage.css";

const CourseDetailPage = ({
  course,
  loading,
  lessons,
  loadLessons,
  addLesson,
  saveLesson,
  children
}) => {
  // Must call useEffect before other conditional renders, to follow rule of hooks
  useEffect(() => {
    // Prevents error from trying to load undefined if no course found
    if (course) {
      loadLessons(course.id);
    }
  }, [course, loadLessons]);

  if (loading) {
    return <Loading />;
  }

  if (!course) {
    return <NotFoundPage />;
  }

  return (
    <div className="CourseDetail">
      <header>
        <h1>{course.name}</h1>
      </header>
      <div className="content">
        <div className="sidebar">
          {lessons.length > 0 && (
            <ul className="lessons">
              {lessons.map(lesson => (
                <Match key={lesson.id} path={`lessons/${lesson.id}`}>
                  {({ match }) => {
                    const className = `lesson-item ${match ? "selected" : ""}`;
                    return (
                      <li>
                        <Lesson
                          className={className}
                          lesson={lesson}
                          onSubmit={name => saveLesson({ ...lesson, name })}
                        >
                          {(edit, remove) => (
                            <div className={className}>
                              <Link to={`lessons/${lesson.id}`}>
                                {lesson.name}
                              </Link>
                              <button
                                onClick={() => edit(lesson.name)}
                                className="edit-lesson-btn"
                              >
                                Edit
                              </button>
                              <button
                                onClick={remove}
                                className="delete-lesson-btn"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </Lesson>
                      </li>
                    );
                  }}
                </Match>
              ))}
            </ul>
          )}
          <Lesson
            className="add-lesson-button"
            onSubmit={title => addLesson(title, course.id)}
          >
            {edit => (
              <button
                className="add-lesson-button"
                onClick={edit}
                type="submit"
              >
                New Lesson
              </button>
            )}
          </Lesson>
        </div>
        <div className="lesson">{children}</div>
      </div>
    </div>
  );
};

const mapState = (state, ownProps) => {
  return {
    loading: state.courses.coursesLoading,
    lessons: getLessonsByCourse(state, ownProps),
    course: getCourseById(state, ownProps)
  };
};
const mapDispatch = {
  loadLessons,
  addLesson,
  saveLesson
};
export default connect(
  mapState,
  mapDispatch
)(CourseDetailPage);
