const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const gravatar = require("gravatar");
const _ = require("lodash");
const { User, validate } = require("../../models/User");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("This user is already registered.");

  const avatar = gravatar.url(email, {
    s: "190",
    r: "pg",
    d: "mm",
  });

  user = new User({ name, email, password, avatar });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  const token = jwt.sign(
    { _id: user._id, name: user.name },
    config.get("jwtPrivateKey"),
    { expiresIn: 3600 }
  );

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

//Delete user - moved to profile.js
/*
router.delete("/", auth, async (req, res) => {
  await User.findOneAndRemove({ _id: req.user._id });
  res.send("User Deleted.");
});
*/

module.exports = router;
