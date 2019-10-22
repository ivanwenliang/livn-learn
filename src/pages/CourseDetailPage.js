import React from "react";
import { connect } from "react-redux";
import NotFoundPage from "./NotFoundPage";
import NewLesson from "../components/NewLesson";
import Loading from "../components/Loading";
import "./CourseDetailPage.css";

const CourseDetailPage = ({ course, loading }) => {
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
          <NewLesson courseId={course.id} />
        </div>
        <div className="lesson"></div>
      </div>
    </div>
  );
};

const mapState = (state, ownProps) => ({
  loading: state.coursesLoading,
  course: state.courses.find(
    course => course.id === parseInt(ownProps.courseId)
  )
});
export default connect(mapState)(CourseDetailPage);
