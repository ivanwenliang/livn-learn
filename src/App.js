import React from "react";
import { Router, Redirect } from "@reach/router";
import CourseListPage from "./pages/CourseListPage";

const App = () => {
  return (
    <Router>
      <Redirect noThrow from="/" to="/courses" />
      <CourseListPage path="/courses" />
    </Router>
  );
};

export default App;
