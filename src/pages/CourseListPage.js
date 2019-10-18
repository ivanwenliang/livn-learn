import React from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import NewCourse from "../components/NewCourse";
import { openNewCourseModal, closeNewCourseModal } from "../actions";
import "./CourseListPage.css";

const CourseListPage = ({
  coursesLoading,
  coursesError,
  courses,
  isModalOpen,
  openNewCourseModal,
  closeNewCourseModal
}) => {
  if (coursesLoading) {
    return <div>Loading...</div>;
  }

  if (coursesError) {
    return <div>{coursesError.message}</div>;
  }

  return courses.length === 0 ? (
    <div className="CreateCourse">
      <NewCourse />
    </div>
  ) : (
    <div className="CourseList">
      <h1>Your Courses</h1>
      <button onClick={openNewCourseModal} className="new-course-btn">
        New Course
      </button>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <a href={`/courses/${course.id}`}>
              <div className="title">{course.name}</div>
              <div className="price">${course.price.toFixed(2)}</div>
            </a>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onRequestClose={closeNewCourseModal}>
        <NewCourse />
      </Modal>
    </div>
  );
};

const mapState = state => ({
  coursesLoading: state.coursesLoading,
  coursesError: state.coursesError,
  isModalOpen: state.newCourseModalOpen,
  courses: state.courses
});
const mapDispatch = {
  openNewCourseModal,
  closeNewCourseModal
};
export default connect(
  mapState,
  mapDispatch
)(CourseListPage);
