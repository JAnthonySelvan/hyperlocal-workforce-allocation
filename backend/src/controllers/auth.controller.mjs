import { validationResult } from "express-validator";
import User from "../models/user.model.mjs";
import ApiError from "../utils/ApiError.mjs";
import asyncHandler from "../middleware/asyncHandler.mjs";
import generateToken from "../utils/generateToken.mjs";
import sendResponse from "../utils/sendResponse.mjs";

export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array()[0].msg);
  }

  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, 201, true, "User registered successfully", {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});
