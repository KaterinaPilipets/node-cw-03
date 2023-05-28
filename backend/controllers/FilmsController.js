const filmsModel = require("../models/filmsModel");
const asyncHandler = require("express-async-handler");
const filmsService = require("../services/FilmsService");
class FilmsController {
  //   getAll = asyncHandler(async (req, res) => {
  //     const films = await filmsModel.find({});
  //     res.status(201).json({
  //       code: 201,
  //       message: "Success",
  //       data: films,
  //       qty: films.length,
  //     });
  //   });
  getAll = asyncHandler(async (req, res) => {
    const films = await filmsService.show();
    if (!films) {
      return res.status(400).json({
        code: 400,
        message: "Error. Unable to fetch films.",
      });
    }
    return res.status(201).json({
      code: 201,
      message: "Success",
      data: films,
      qty: films.length,
    });
  });
  //   addFilm = asyncHandler(async (req, res) => {
  //     const { title, rating } = req.body;
  //     if (!title || !rating) {
  //       //   res.status(400).json({
  //       //     code: 400,
  //       //     message: "Provide all required fields",
  //       //   });
  //       res.status(401);
  //       throw new Error("Provide all required fields");
  //     }
  //     const film = await filmsModel.create({ ...req.body });
  //     res.status(201).json({
  //       code: 201,
  //       message: "Success",
  //       data: film,
  //     });
  //   });
  addFilm = asyncHandler(async (req, res) => {
    const { title, rating } = req.body;
    if (!title || !rating) {
      res.status(401);
      throw new Error("Provide all required fields");
    }
    const film = await filmsService.add(req.body);
    if (!film) {
      return res.status(400).json({
        code: 400,
        message: "Error. Unable to add film.",
      });
    }
    return res.status(201).json({
      code: 201,
      message: "Success",
      data: film,
    });
  });

  getOne = async (req, res) => {
    res.send("getOne");
  };

  update = async (req, res) => {
    res.send("update");
  };

  remove = async (req, res) => {
    res.send("remove");
  };
}

module.exports = new FilmsController();
