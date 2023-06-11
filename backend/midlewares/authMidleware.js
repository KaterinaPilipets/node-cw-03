const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
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
    req.user = decodet.id;
    next();

    // отримаємо токен
    //   розшифрвуємо токен
    //
  } catch (error) {
    res.status(401).json({
      code: 401,
      message: error.message,
    });
  }
};
