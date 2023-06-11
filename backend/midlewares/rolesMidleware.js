const jwt = require("jsonwebtoken");
module.exports = (rolesArr) => {
  return (req, res, next) => {
    try {
      const [tokenType, token] = req.headers.authorization.split(" ");
      if (tokenType !== "Bearer") {
        res.status(401);
        throw new Error("Not Bearer-token");
      }
      if (!token) {
        res.status(401);
        throw new Error("Not token provided");
      }
      const decodet = jwt.verify(token, "pizza");
      const userRoles = decodet.roles;

      let hasRole = false;
      userRoles.forEach((role) => {
        if (rolesArr.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        res.status(403);
        throw new Error("Немає доступу");
      }
      next();
      // отримаємо токен
      //   розшифрвуємо токен
      //
    } catch (error) {
      res.status(403).json({
        code: 403,
        message: error.message,
      });
    }
  };
};
