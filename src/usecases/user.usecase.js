const createError = require("http-errors");
const User = require("../models/user.model");
const encryption = require("../lib/encryption");
const jwt = require("../lib/jwt");

async function signUp(data) {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw createError(409, "User already exists");
  }

  const passwordEncrypted = encryption.hash(data.password);

  data.password = passwordEncrypted;

  return User.create(data);
}

async function signIn(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "Invalid credentials");
  }

  const isPasswordVerified = encryption.compare(password, user.password);

  if (!isPasswordVerified) {
    throw createError(401, "Invalid credentials");
  }

  // TODO: Generate JWT token
  return jwt.sign({
    user: user._id,
    role: user.role,
  });
}

async function getById(id) {
  const { password, ...user } = await User.findById(id).lean();
  return user;
}

module.exports = {
  signUp,
  signIn,
  getById,
};
