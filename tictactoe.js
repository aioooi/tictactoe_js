// constants

// field values
const EMPTY = 0;
const HUMAN = 1;
const COMPUTER = -1;

const MAX_HANDICAP = 100;

class Game {
  constructor(handicap, humanBegins = true) {
    this.handicap = (0 <= handicap < MAX_HANDICAP) ? handicap : 10;

    this.turn = humanBegins ? HUMAN : COMPUTER;

    this.state = [
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY]
    ]
  }


  playerMove(i, j) {
    if (this.turn !== HUMAN) {
      throw Error("it's not your turn!")
    }

    if (this.state[i][j] !== EMPTY) {
      throw Error("field not empty!");
    }

    this.state[i][j] = HUMAN;
    this.turn = COMPUTER;
    console.log("human move done");
    return this.gameFinished;
  }

  makeMove() {
    if (this.turn !== COMPUTER) {
      throw Error("it's not my turn!")
    }
    this.turn = HUMAN;

    console.log("computer moves");

    // make move
    let action = [
      () => this._randomField(),
    ]

    while (action.length) {
      if (action.pop()()) {
        break;
      }
    }

    console.log(this.state)

    return this.gameFinished;
  }

  get getWinner() {

  }

  get getWinningLine() {

  }

  get gameFinished() {
    return false;
    // check board whether board complete
    // determine winner
  }

  // field status, TODO do I need those methods?
  isEmpty(i, j) {
    return this.state[i][j] === EMPTY ? true : false;
  }

  isHuman(i, j) {
    return this.state[i][j] === HUMAN ? true : false;
  }

  isComputer(i, j) {
    return this.state[i][j] === COMPUTER ? true : false;
  }


  // strategies
  _emptyCorner() {
    // corner = [0, 2, 6, 8];
    let corner = [[0, 0], [0, 2], [2, 0], [2, 2]];
    let empty = 0;
  }

  _randomField() {
    const e = this._where(this.state.flat(), EMPTY);
    if (e.length) {
      let x = e[this._randInt(e.length)];
      this.state[Math.floor(x / 3)][x % 3] = COMPUTER;
      return true;
    }
    else {
      return false;
    }
  }


  // helpers
  _randInt(max) {
    return Math.floor(0.99999 * Math.random() * max);
  }

  _where(array, value) {
    let e = [];
    array.forEach((v, i) => {
      if (v === value) {
        e.push(i);
      }
    });
    return e;
  }
}

export { EMPTY, HUMAN, COMPUTER, Game };