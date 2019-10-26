import React from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { getCourseById } from "../selectors";
import "./SalesPage.css";

// Use navigate instead of redirect, because SalesPage is a top-level route
const SalesPage = ({ course, currentUser, courseId, navigate }) => {
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
  course: getCourseById(state, ownProps)
});
export default connect(mapState)(SalesPage);
