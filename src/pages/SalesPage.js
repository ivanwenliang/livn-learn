import React from "react";
import { connect } from "react-redux";
import { Redirect } from "@reach/router";
import { getCourseById, userOwnsCourse } from "../selectors";
import { buyCourse } from "../actions";
import "./SalesPage.css";

// Use navigate instead of redirect, because SalesPage is a top-level route
const SalesPage = ({
  course,
  currentUser,
  courseId,
  navigate,
  buyCourse,
  userOwnsCourse
}) => {
  if (userOwnsCourse) {
    return <Redirect to={`/courses/${courseId}`} noThrow />;
  }

  const buyOrLogin = () => {
    if (currentUser) {
      buyCourse(courseId);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="SalesPage">
      <h1>Buy {course && course.name}</h1>
      <p>You're gonna love this course.</p>
      <button onClick={buyOrLogin}>BUY NOW</button>
    </div>
  );
};

const mapState = (state, ownProps) => ({
  currentUser: state.user.user,
  course: getCourseById(state, ownProps),
  userOwnsCourse: userOwnsCourse(state, ownProps)
});
const mapDispatch = {
  buyCourse
};
export default connect(
  mapState,
  mapDispatch
)(SalesPage);
