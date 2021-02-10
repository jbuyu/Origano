import React, { Component } from "react";
import { connect } from "react-redux";
const Dashboard = ({ groups }) => {
  return <div className="dash">Dashboard</div>;
};

function mapStateToProps(state) {
  return {
    groups: state.groups,
  };
}

export default connect(mapStateToProps)(Dashboard);
