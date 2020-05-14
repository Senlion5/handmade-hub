//Joi Packages Application
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

function validatePost(post) {
  const schema = {
    _id: Joi.objectId(),
    user: Joi.objectId(),
    text: Joi.string()
      .required()
      .min(3)
      .max(1024),
    name: Joi.string()
      .min(3)
      .max(255),
    avatar: Joi.string().max(1024),
    likes: Joi.array().items({
      user: Joi.objectId()
    }),
    comments: Joi.array().items({
      user: Joi.objectId(),
      text: Joi.string()
        .required()
        .min(3)
        .max(1024),
      name: Joi.string()
        .min(3)
        .max(255),
      avatar: Joi.string().max(255),
      date: Joi.date().iso()
    }),
    date: Joi.date().iso()
  };

  return Joi.validate(post, schema);
}

exports.validate = validatePost;
