import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, auth: { user }, history }) => {
  const [formData, setFormData] = useState({
    typeofart: "",
    website: "",
    location: "",
    skills: "",
    bio: "",
    youtube: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: "",
  });

  const [socialInputs, setSocialInputs] = useState(false);

  const {
    typeofart,
    website,
    location,
    skills,
    bio,
    youtube,
    facebook,
    linkedin,
    instagram,
    twitter,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user-edit"></i> {user && user.name}, share your
        genius with the community
      </p>
      <small className="container-alert">* required fields</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select
            name="typeofart"
            value={typeofart}
            onChange={(e) => onChange(e)}
          >
            <option value="0">Select Type of Art</option>
            <option value="Clothing">Clothing</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Paintings">Paintings</option>
            <option value="Sculptures">Sculptures</option>
            <option value="Dolls">Dolls</option>
            <option value="Furniture">Furniture</option>
            <option value="Wooden Toys">Wooden Toys</option>
            <option value="Scarves">Scarves</option>
            <option value="Hats">Hats</option>
            <option value="Hair Accessories">Hair Accessories</option>
            <option value="Pillows">Pillows</option>
            <option value="Curtains">Curtains</option>
            <option value="Rugs">Rugs</option>
            <option value="Blankets">Blankets</option>
            <option value="Pins">Pins</option>
            <option value="Soap">Soap</option>
            <option value="Candles">Candles</option>
            <option value="Bags">Bags</option>
            <option value="Pet Toys">Pet Toys</option>
            <option value="Books">Books</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">* What is your specialty?</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Show your making on the internet (start your link with http:// or
            https:// ...)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Where your new friends can find you
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            * What can you do? (use comma to separate your skills: ex. drawing,
            sewing, knitting, carving, molding, etc.)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Tell us a little about yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">What is your story?</small>
        </div>
        <div className="my-2">
          <button
            onClick={() => setSocialInputs(!socialInputs)}
            type="button"
            className="btn"
          >
            Add Your Social Network Profiles
          </button>
        </div>

        {socialInputs && (
          <Fragment>
            <small>The links should begin with http:// or https://</small>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
