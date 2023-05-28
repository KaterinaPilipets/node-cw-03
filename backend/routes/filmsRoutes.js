// Cannot GET /api/v1/films
const filmsController = require("../controllers/FilmsController");
const filmsRouter = require("express").Router();

// Get all films
filmsRouter.get("/films", filmsController.getAll);
// Add film
filmsRouter.post(
  "/films",
  (req, res, next) => {
    console.log("Joi");
    next();
  },
  filmsController.addFilm
);
// Get one film by id
filmsRouter.get("/films/:id", filmsController.getOne);
// Update film
filmsRouter.put("/films/:id", filmsController.update);
// Remove film
filmsRouter.delete("/films/:id", filmsController.remove);

module.exports = filmsRouter;
