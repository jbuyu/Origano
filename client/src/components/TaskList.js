import React from "react";
import { connect } from "react-redux";
const TaskList = ({ tasks, name, id, createNewTask }) => {
  return (
    <div className="tasks">
      {tasks.map((task) => {
        return (
          <div key={task.id}>
            <h3>
              <strong>{name}</strong>
            </h3>
            <span>{task.name}</span>
            <button onClick={() => createNewTask(id)}>Create</button>
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
function mapDispatchToProps(dispatch, ownProps) {
  return {
    createNewTask(id) {
      console.log(id);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
