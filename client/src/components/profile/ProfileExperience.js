import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { title, typeofart, from, to, current, description },
}) => (
  <div>
    <h3 className="text-dark">{title}</h3>
    <p>
      <Moment format="DD.MM.YYYY">{from}</Moment> -{" "}
      {!to ? " Now" : <Moment format="DD.MM.YYYY">{to}</Moment>}
    </p>
    <p>
      <b>Role Title: </b>
      {title}
    </p>
    <p>
      <b>Description: </b>
      {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
