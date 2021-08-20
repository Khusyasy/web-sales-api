const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.get_users = async function(req, res) {
  let users = await User.find({}).limit(50);
  res.status(200).json(users);
}

exports.login = async function(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user === null) return res.status(401).json({ status: 'failed', error: 'Not Found' });

  const valid = await user.checkPassword(req.body.password);
  if (!valid) return res.status(401).json({ status: 'failed', error: 'Wrong Password' });

  const token = jwt.sign({ user }, process.env.JWT_SECRET);
  res.cookie('token', token);
  res.status(200).json({ status: 'success', token });
}

exports.logout = async function(req, res) {
  res.clearCookie('token');
  res.status(200).json({ status: 'success' });
}

exports.authenticate_token = async function(req, res, next) {
  const token = req.cookies.token;
  if(!token) return res.status(403);

  const { user } = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
}

exports.count = async function(req, res) {
  const count = await User.count({});
  res.status(200).json({ status: 'success', count });
}