const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { User } = require("../../models/User");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  //console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"), {
    expiresIn: 360000,
  });

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
  //res.send(token);

  function validate(req) {
    const schema = {
      email: Joi.string().required().min(5).max(255).email(),
      password: Joi.string().required().min(5).max(255),
    };

    return Joi.validate(req, schema);
  }
});

module.exports = router;
