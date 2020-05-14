//Joi Packages Application
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function validateProfile(profile) {
  const schema = {
    _id: Joi.objectId(),
    user: Joi.objectId(),
    typeofart: Joi.string().required().min(3).max(255),
    website: Joi.string().allow("").min(6).max(1024),
    location: Joi.string().allow("").min(3).max(1024),
    skills: Joi.string().required(),
    bio: Joi.string().allow("").min(3).max(4096),
    experience: Joi.array().items({
      title: Joi.string().min(3).max(255),
      typeofart: Joi.string().min(3).max(255),
      from: Joi.date().iso(),
      to: Joi.date().iso().greater(Joi.ref("from")),
      current: Joi.boolean(),
      description: Joi.string().min(3).max(1024),
    }),
    education: Joi.array().items({
      school: Joi.string().min(3).max(255),
      degree: Joi.string().min(3).max(255),
      fieldofstudy: Joi.string().min(3).max(255),
      from: Joi.date().iso(),
      to: Joi.date().iso().greater(Joi.ref("from")),
      current: Joi.boolean(),
      description: Joi.string().min(3).max(1024),
    }),
    youtube: Joi.string().allow("").min(3).max(1024),
    facebook: Joi.string().allow("").min(3).max(1024),
    linkedin: Joi.string().allow("").min(3).max(1024),
    instagram: Joi.string().allow("").min(3).max(1024),
    twitter: Joi.string().allow("").min(3).max(1024),
  };
  return Joi.validate(profile, schema);
}

exports.validate = validateProfile;
