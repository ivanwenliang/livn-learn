import React from "react";
import { connect } from "react-redux";
import NotFoundPage from "./NotFoundPage";
import NewLesson from "../components/NewLesson";
import Loading from "../components/Loading";
import "./CourseDetailPage.css";

const CourseDetailPage = ({ course, loading, lessons }) => {
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
                <li>{lesson.name}</li>
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
  const courseId = parseInt(ownProps.courseId);
  return {
    loading: state.coursesLoading,
    lessons: state.lessons.filter(lesson => lesson.courseId === courseId),
    course: state.courses.find(course => course.id === courseId)
  };
};
export default connect(mapState)(CourseDetailPage);
