const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  typeofart: { type: String, required: true },
  website: { type: String },
  location: { type: String },
  skills: { type: [String], required: true },
  bio: { type: String },
  experience: [
    {
      title: { type: String },
      typeofart: { type: String },
      from: { type: Date },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String }
    }
  ],
  education: [
    {
      school: { type: String },
      degree: { type: String },
      fieldofstudy: { type: String },
      from: { type: Date },
      to: { type: Date },
      current: { type: Boolean, default: false },
      description: { type: String }
    }
  ],
  social: {
    youtube: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
    twitter: { type: String }
  },
  date: { type: Date, default: Date.now }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
