import React, { useEffect } from "react";
import { connect } from "react-redux";
import NotFoundPage from "./NotFoundPage";
import NewLesson from "../components/NewLesson";
import Loading from "../components/Loading";
import { getLessonsByCourse, getCourseById } from "../selectors";
import { loadLessons } from "../actions";
import "./CourseDetailPage.css";

const CourseDetailPage = ({ course, loading, lessons, loadLessons }) => {
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
            <ul>
              {lessons.map(lesson => (
                <li key={lesson.id}>{lesson.name}</li>
              ))}
            </ul>
          )}
          <NewLesson courseId={course.id} />
        </div>
        <div className="lesson"></div>
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
  loadLessons
};
export default connect(
  mapState,
  mapDispatch
)(CourseDetailPage);
