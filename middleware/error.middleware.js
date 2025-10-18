const CustomErrorHandler = require("../error/custom-error-handler")
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.AccessToken;

    if (!token) {
      throw CustomErrorHandler.UnAuthorized("Token not found");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded; // foydalanuvchi ma’lumotlarini saqlaymiz

    next();
  } catch (error) {
    next(error);
  }
};
