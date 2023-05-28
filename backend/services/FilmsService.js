const filmsModel = require("../models/filmsModel");
class FilmsServices {
  async show() {
    const films = await filmsModel.find({});
    if (!films) {
      return null;
    }
    return films;
  }

  async add(data) {
    const film = await filmsModel.create({ ...data });
    if (!film) {
      return null;
    }
    return film;
  }
}
module.exports = new FilmsServices();
