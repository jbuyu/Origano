import React from "react";
import { connect } from "react-redux";
import TaskList from "./TaskList";

const Dashboard = ({ groups }) => {
  return (
    <div className="App">
      {groups.map(({ name, id }) => {
        return <TaskList key={id} name={name} id={id} />;
      })}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    groups: state.groups,
  };
}

export default connect(mapStateToProps)(Dashboard);
