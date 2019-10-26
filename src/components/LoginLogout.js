import React from "react";
import { connect } from "react-redux";

const LoginLogout = ({ currentUser }) => {
  return (
    <button className="LoginLogout">{currentUser ? "Logout" : "Login"}</button>
  );
};

const mapState = state => ({
  currentUser: state.user.user
});
export default connect(mapState)(LoginLogout);
