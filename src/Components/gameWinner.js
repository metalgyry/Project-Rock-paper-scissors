const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const LIZARD = 4;
const SPOCK = 5;

export function creatorWinner(creatorCard, playerCard) {
  if (creatorCard === playerCard) {
    return "draw";
  } else if (
    (creatorCard === ROCK && playerCard === SCISSORS) ||
    (creatorCard === SCISSORS && playerCard === PAPER) ||
    (creatorCard === PAPER && playerCard === ROCK) ||
    (creatorCard === ROCK && playerCard === LIZARD) ||
    (creatorCard === LIZARD && playerCard === SPOCK) ||
    (creatorCard === SPOCK && playerCard === SCISSORS) ||
    (creatorCard === SCISSORS && playerCard === LIZARD) ||
    (creatorCard === LIZARD && playerCard === PAPER) ||
    (creatorCard === PAPER && playerCard === SPOCK) ||
    (creatorCard === SPOCK && playerCard === ROCK)
  ) {
    return "win";
  } else {
    return "lose";
  }
}