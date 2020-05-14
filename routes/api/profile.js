const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const { User } = require("../../models/User");
const Post = require("../../models/Post");
const { validate } = require("../../models/validateProfile");

// Get User Profile
router.get("/me", auth, async (req, res) => {
  const { _id } = req.user;
  //console.log(_id);

  const profile = await Profile.findOne({ user: _id }).populate({
    path: "user",
    model: User,
  });
  //console.log(profile);
  if (!profile)
    return res.status(400).send("There is no profile for this user.");

  res.send(profile);
});

// Create or Update User Profile
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { typeofart, website, location, skills, bio } = req.body;

  const { youtube, facebook, linkedin, instagram, twitter } = req.body;

  const profileFields = {};
  profileFields.user = req.user._id;
  if (typeofart) profileFields.typeofart = typeofart;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (skills) {
    profileFields.skills = skills.split(",").map((skill) => skill.trim());
  }

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
  if (twitter) profileFields.social.twitter = twitter;

  let profile = await Profile.findOne({ user: profileFields.user });

  // update profile
  if (profile) {
    profile = await Profile.findOneAndUpdate(
      { user: profileFields.user },
      { $set: profileFields },
      { new: true }
    );

    return res.send(profile);
  }

  // create profile
  profile = new Profile(profileFields);

  await profile.save();
  res.send(profile);
});

//get all profiles
router.get("/", async (req, res) => {
  const profiles = await Profile.find({}).populate({
    path: "user",
    model: User,
  });
  res.send(profiles);
});

//get user profile by id
router.get("/user/:user_id", async (req, res) => {
  const profile = await Profile.findOne({
    user: req.params.user_id,
  }).populate({ path: "user", model: User });

  if (!profile) return res.status(400).send("Profile not found.");
  res.send(profile);
});

//Delete user, profile and posts
router.delete("/", auth, async (req, res) => {
  await Post.deleteMany({ user: req.user._id });
  await Profile.findOneAndRemove({ user: req.user._id });
  await User.findOneAndRemove({ _id: req.user._id });
  res.send("User Deleted.");
});

// Add Profile Experience
router.put("/experience", auth, async (req, res) => {
  const { error } = validate(req.body.experience);
  if (error) return res.status(400).send(error.details[0].message);

  const { title, typeofart, from, to, current, description } = req.body;
  const newExperience = { title, typeofart, from, to, current, description };

  const profile = await Profile.findOne({ user: req.user._id });
  profile.experience.unshift(newExperience);

  await profile.save();
  res.send(profile);
});

// Delete Experience from Profile
router.delete("/experience/:exp_id", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });

  const removeIndex = profile.experience
    .map((item) => item._id)
    .indexOf(req.params.exp_id);
  profile.experience.splice(removeIndex, 1);

  await profile.save();
  res.send(profile);
});

// Add Profile Education
router.put("/education", auth, async (req, res) => {
  const { error } = validate(req.body.education);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = req.body;

  const newEducation = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user._id });
  profile.education.unshift(newEducation);

  await profile.save();
  res.send(profile);
});

// Delete Education from Profile
router.delete("/education/:edu_id", auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });

  const removeIndex = profile.education
    .map((item) => item._id)
    .indexOf(req.params.edu_id);
  profile.education.splice(removeIndex, 1);

  await profile.save();
  res.send(profile);
});

module.exports = router;
