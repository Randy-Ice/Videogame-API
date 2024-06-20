const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    ratings: {
      type: String,
      required: true,
      enum: {
        values: ["E", "E10+", "T", "M", "AO", "RP"],
        message: "{VALUE} is not a valid rating",
      },
      default: "RP",
      validators: {
        validate: (fn) => {
          return fn && fn.length > 0;
        },
        message: "Please select at least one rating",
      },
    },
    platform: {
      type: [String],
      required: true,
      enum: {
        values: ["pc", "xbox", "playstation", "nintendo"],
        message: "{VALUE} is not a valid platform",
      },
      validators: {
        validate: (v) => {
          return v && v.length > 0;
        },
        message: "Please select at least one platform",
      },
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    developer: {
      type: String,
      required: true,
    },
    otherGames: {
      type: [String],
    },
    website: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
