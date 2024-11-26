const generateAccessToken = (statusCode, user, res) => {
  const accessToken = user.getAccessToken();
  // Set access token in cookie
  const options = {
    httpOnly: true,
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  };

  res.status(statusCode).cookie("token", accessToken, options).json({
    success: true,
    user,
    accessToken,
    message: "User logged in successfully.",
  });
};

export { generateAccessToken };
