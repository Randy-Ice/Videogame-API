const mongoose = require("mongoose");
const Game = require("../Models/videoGameModel");

const createGame = async () => {
  try {
    const game = new Game({
      name: "Cyberpunk 2077",
      description: `
     Cyberpunk 2077 is a science fiction game loosely based on the role-playing game Cyberpunk 2020. Setting The game is set in the year 2077 in a fictional futuristic metropolis Night City in California. In the world of the game, there are developed cybernetic augmentations that enhance people's strength, agility, and memory. The city is governed by corporations. Many jobs are taken over by the robots, leaving a lot of people poor and homeless. Night City has a roaring underworld, with black markets, underground surgeons, drug dealers, and street gangs abound. Char…
      `,
      genre: ["Action", "shooter", "RPG"],
      tags: [
        "Single player",
        "Steam achievements",
        " Shooter",
        "cyberpunk",
        "open world",
        "first-person",
        "Sci-Fi",
        "futuristic",
      ],
      ratings: "M",
      platform: ["pc", "playstation", "xbox"],
      releaseDate: new Date("Dec-10-2020"),
      image:
        "https://media.rawg.io/media/resize/1920/-/screenshots/814/814c25d6fd1fd34a4e6dade645a3bda7.jpg",
      publisher: " CD PROJEKT RED",
      developer: "CD PROJEKT RED",
      otherGames: ["game1", "game2"],
      website: "https://www.cyberpunk.net/",
    });
    const data = await game.save();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};
//createGame();

const deleteGame = async () => {
  try {
    const id = "66735d69f8ea4442f5460ee9";
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return console.log(`no id found`);
    }
    const game = await Game.findOneAndDelete({ _id: id });
    if (!game) {
      return console.log(`no id found 2`);
    }
    console.log("deleted");
  } catch (err) {
    console.log(err.message);
  }
};
//deleteGame();

const getGames = async (req, res) => {
  try {
    const { name, publisher, developer, genre, tags } = req.query;
    const queryObject = {};
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;
    const skip = (page - 1) * limit;
    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }
    if (publisher) {
      queryObject.publisher = publisher;
    }
    if (genre) {
      queryObject.genre = genre;
    }
    if (tags) {
      queryObject.tags = { $in: tags };
    }
    const game = await Game.find(queryObject).limit(limit).skip(skip);
    if (game.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No games found",
      });
    }
    const count = game.length;
    res.status(200).json({ status: "success", count, game });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: "fail",
        message: "No game found with that ID",
      });
    }
    const game = await Game.findById({ _id: id });

    res.status(200).json({
      status: "success",
      game,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  getGames,
  getGameById,
};
