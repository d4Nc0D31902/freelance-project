const User = require("../routes/v1/users/model");

const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
};

exports.authorizeRoles = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403,
        ),
      );
    }
    next();
  };
};
