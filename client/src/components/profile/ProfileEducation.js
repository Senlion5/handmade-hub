import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, current, description },
}) => (
  <div>
    <h3 className="text-dark">{school}</h3>
    <p>
      <Moment format="DD.MM.YYYY">{from}</Moment> -{" "}
      {!to ? " Now" : <Moment format="DD.MM.YYYY">{to}</Moment>}
    </p>
    <p>
      <b>Degree: </b>
      {degree}
    </p>
    <p>
      <b>Field of Study: </b>
      {fieldofstudy}
    </p>
    <p>
      <b>Description: </b>
      {description}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
