import React from "react";
import { connect } from "react-redux";
import NotFoundPage from "./NotFoundPage";

const CourseDetailPage = ({ courseId, course, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <NotFoundPage />;
  }

  return (
    <div>
      Viewing {courseId} -- {course.name}
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
