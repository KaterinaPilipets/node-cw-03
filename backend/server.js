const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const dataBaseConnect = require("../config/dataBaseConnect");
require("colors");
const errorHandler = require("./midlewares/errorHandler");
const asyncHandler = require("express-async-handler");
const configPath = path.join(__dirname, "..", "config", ".env");
dotenv.config({ path: configPath });
const app = express();
const userModel = require("./models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMidleware = require("./midlewares/authMidleware");
const rolesModel = require("./models/rolesModel");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1", require("./routes/filmsRoutes"));

// реєстрація- збереження користувача в базі данних
// аутентифікація - перевірка данних користувача з базою данних
// авторизація-перевірка прав доступу

app.post(
  "/register",
  asyncHandler(async (req, res) => {
    // валидуємо данні від користувача
    // шукаємо користувача в базі
    //  якщо знайшли-якось повідомляємо, що такий є
    // якщо не знайшли-хешируємо пароль
    // зберігаємо з хешированим паролем

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401);
      throw new Error("Provide all required fields");
    }
    const candidat = await userModel.findOne({ email });
    if (candidat) {
      res.status(400);
      throw new Error("User allredy exits");
    }
    const sekretPassword = bcrypt.hashSync(password, 10);
    const roles = await rolesModel.findOne({ value: "ADMIN" });
    const user = await userModel.create({
      ...req.body,
      password: sekretPassword,
      roles: [roles.value],
    });
    return res.status(201).json({
      code: 201,
      message: "Success",
      data: { email: user.email, name: user.name },
    });
  })
);

app.post(
  "/login",
  asyncHandler(async (req, res) => {
    // валидуємо данні від користувача
    // шукаємо користувача в базі
    //  якщо знайшли-розшифровуємо пароль
    // якщо не знайшли-не вірний логін обо пароль
    // видаємо токен і зберігаємо

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Provide all required fields");
    }
    const user = await userModel.findOne({ email });
    const isValidPasword = bcrypt.compareSync(password, user.password);
    if (!user || !isValidPasword) {
      res.status(400);
      throw new Error("invalid login or password");
    }

    const token = generateToken({
      friends: ["ket", "andrii", "andrii"],
      id: user._id,
      roles: user.roles,
    });
    // console.log(token);
    user.token = token;
    await user.save();
    return res.status(200).json({
      code: 200,
      message: "Success",
      data: { email: user.email, token: user.token },
    });
  })
);

app.get(
  "/logout",
  authMidleware,
  asyncHandler(async (req, res) => {
    const id = req.user;
    res.send(id);
  })
);

function generateToken(data) {
  const payload = { ...data };
  return jwt.sign(payload, "pizza", { expiresIn: "8h" });
}

app.use("*", (req, res, next) => {
  res.status(404);
  res.json({
    code: 404,
    message: "url route or page not found",
  });
});
app.use(errorHandler);
const { PORT } = process.env;

dataBaseConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.bold.italic);
});
