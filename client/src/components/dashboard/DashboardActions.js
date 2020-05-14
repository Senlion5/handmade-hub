import React from "react";
import { Link } from "react-router-dom";

export const DashboardActions = () => {
  return (
    <div>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn">
          <i className="fas fa-user-edit text-primary"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn">
          <i className="fas fa-paint-brush text-primary"></i> Add Experience
        </Link>
        <Link to="/add-education" className="btn">
          <i className="fas fa-user-graduate text-primary"></i> Add Education
        </Link>
      </div>
    </div>
  );
};

export default DashboardActions;
