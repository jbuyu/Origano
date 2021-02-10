import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const Navigation = () => {
  return (
    <div className="navigation">
      <Link to="/dash">Dashboard</Link>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    state: state,
  };
}

export default connect(mapStateToProps)(Navigation);
