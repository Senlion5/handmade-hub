import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const courses = education.map((course) => (
    <tr key={course._id}>
      <td>{course.school}</td>
      <td className="hide-sm">{course.degree}</td>
      <td className="hide-sm">{course.fieldofstudy}</td>
      <td>
        <Moment format="DD.MM.YYYY">{course.from}</Moment> -{" "}
        {course.to === null ? (
          " Now"
        ) : (
          <Moment format="DD.MM.YYYY">{course.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteEducation(course._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Course or School</th>
            <th className="hide-sm">Degree/Certificate</th>
            <th className="hide-sm">Field of Study</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{courses}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
