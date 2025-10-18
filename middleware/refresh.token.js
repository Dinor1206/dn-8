const CustomErrorHandler = require("../error/custom-error-handler");
const jwt = require("jsonwebtoken");

module.exports = (res, req, next) => {
  try {
    const token = req.cookies.RefreshToken;

    if (!token) {
      throw CustomErrorHandler.UnAuthorized("Token not found");
    }

    const decode = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decode;
    const payload = {
      email: req.user.email,
      id: req.user._id,
      role: req.user.role,
    };
    const access = accessToken(payload);


    res.cookie("AccessToken", access, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    

    next();
  } catch (error) {
    next(error);
  }
};
