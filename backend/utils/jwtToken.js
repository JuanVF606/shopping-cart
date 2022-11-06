// Create and sen token and save in the Cookie

const sendToken = (user, statusCode, res) => {
  // Create jwt token
  const token = user.getJWtToken();
  // Option for Cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.Cookie_EXPIRES_TIME * 24 * 60 * 1000
    ),
    httpOnly: true
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
   
  });
};

module.exports = sendToken;
