const checkTurnWinner = (turn) => {
  if (turn.user1 === "rock" && turn.user2 === "paper") {
    return "user2";
  }
  if (turn.user1 === "paper" && turn.user2 === "rock") {
    return "user1";
  }
  if (turn.user1 === "rock" && turn.user2 === "scissors") {
    return "user1";
  }
  if (turn.user1 === "scissors" && turn.user2 === "rock") {
    return "user2";
  }
  if (turn.user1 === "paper" && turn.user2 === "scissors") {
    return "user2";
  }
  if (turn.user1 === "scissors" && turn.user2 === "paper") {
    return "user1";
  }
  return "draw";
};
const checkTurnPlayed = (turn) => {
  if (turn.user1 && turn.user2) {
    return true;
  }
  return false;
};

const checkMatchWinner = (match) => {
  const winner = match.turns.reduce(
      (acc, turn) => {
        acc[checkTurnWinner(turn)]++;
        return acc;
      },
      {user1: 0, user2: 0, draw: 0},
  );
  return winner.user1 === winner.user2 ?
    null :
    match[winner.user1 > winner.user2 ? "user1" : "user2"];
};

const getLastTurnPlayed = (match) => {
  return match.turns.reduce((acc, turn, index) => {
    if (checkTurnPlayed(turn)) return index;
    return acc;
  }, -1);
};

module.exports = {
  checkTurnWinner,
  checkTurnPlayed,
  checkMatchWinner,
  getLastTurnPlayed,
};
