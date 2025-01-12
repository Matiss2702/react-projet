const Mongoose = require("mongoose");

const MatchSchema = new Mongoose.Schema({
  user1: {
    type: Object,
  },
  user2: {
    type: Object,
  },
  turns: {
    type: Array,
    required: true,
  },
  winner: {
    type: Object,
  },
});

const Match = Mongoose.model("Match", MatchSchema);

module.exports = Match;
