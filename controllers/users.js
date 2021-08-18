const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require("jsonwebtoken");

exports.get_users = async function(req, res) {
  let users = await User.find({}).limit(50);
  res.status(200).json(users);
}

exports.login = async function(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user === null) return res.status(401).json({ status: "failed", error: "Not Found" });
  
  const valid = await user.checkPassword(req.body.password);
  if (!valid) return res.status(401).json({ status: "failed", error: "Wrong Password" });

  const token = jwt.sign({ user: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ status: "success", token });
}