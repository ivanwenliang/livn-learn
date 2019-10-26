import React from "react";
import { connect } from "react-redux";
import "./SalesPage.css";
import { getCourseById } from "../selectors";

const SalesPage = ({ course }) => {
  return (
    <div className="SalesPage">
      <h1>Buy {course && course.name}</h1>
      <p>You're gonna love this course.</p>
      <button>Buy Now</button>
    </div>
  );
};

const mapState = (state, ownProps) => ({
  course: getCourseById(state, ownProps)
});
export default connect(mapState)(SalesPage);
