import React from "react";
import { connect } from "react-redux";
const TaskList = ({ tasks, name, groupID }) => {
  return (
    <div className="tasks">
      {tasks.map((task) => {
        return (
          <div key={task.id}>
            <h3>
              <strong>{name}</strong>
            </h3>
            <span>{task.name}</span>
          </div>
        );
      })}
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  let groupID = ownProps.id;
  let name = ownProps.name;
  return {
    name,
    id: groupID,
    tasks: state.tasks.filter((task) => {
      return task.group === groupID;
    }),
  };
}

export default connect(mapStateToProps)(TaskList);
