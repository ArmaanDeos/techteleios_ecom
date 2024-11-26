import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import { generateAccessToken } from "../middlewares/jwt/jwt.js";

//? Register User Controller :)
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // # All fields validation
  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required.");
  }

  // # Hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // # User existence validation
  const userExistence = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
  });
  if (userExistence) {
    throw new ApiError(400, "User already exists.");
  }

  // # Create user
  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: hashPassword,
  });

  // # Select and remove password field
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong.");
  }

  // # Send response
  res
    .status(201) // 201 for resource creation
    .json(new ApiResponse(201, createdUser, "User registered successfully."));
});

//? Login User Controller :)
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // # all fields validation
  if (!email || !password) throw new ApiError(400, "All fields are required.");

  // # User existence validation
  const userExitence = await User.findOne({ email: email.toLowerCase() });
  if (!userExitence)
    throw new ApiError(400, "User does not exist.Please register first.");

  // # Password validation
  const isPasswordCorrect = bcrypt.compareSync(password, userExitence.password);
  if (!isPasswordCorrect) throw new ApiError(400, "Invalid email or password.");

  // # Select and remove password field
  const loggedInUser = await User.findById(userExitence._id).select(
    "-password"
  );

  // # Send response
  generateAccessToken(200, loggedInUser, res);
});
export { registerUser, loginUser };
