const optionContainer = document.querySelector(".option-container");
const flipButton = document.querySelector("#flip-button");
const gamesBoardContainer = document.querySelector("#gamesboard-container");

//!Flipping the ships

let angle = 0;

function flip() {
  const optionShips = Array.from(optionContainer.children); //get all the children
  //   if (angle === 0) {
  //     angle = 90;
  //   } else {
  //     angle = 0;
  //   }
  angle = angle === 0 ? 90 : 0;

  optionShips.forEach(
    (optionShip) => (optionShip.style.transform = `rotate(${angle}deg)`)
  );
}
flipButton.addEventListener("click", flip);
//Creating Boards
//Inserting an element via JS

const width = 10;
function createBoard(color, user) {
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.classList.add("game-board");
  gameBoardContainer.style.backgroundColor = color;
  gamesBoardContainer.append(gameBoardContainer);
  gameBoardContainer.id = user;

  //Create 100 blocks
  for (let i = 0; i < width * width; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.id = i;
    gameBoardContainer.append(block);
  }
}

createBoard("beige", "player");
createBoard("pink", "computer");

//Creating ships
class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}

const destroyer = new Ship("destroyer", 2);
const submarine = new Ship("submarine", 3);
const cruiser = new Ship("cruiser", 3);
const battleship = new Ship("battleship", 4);
const carrier = new Ship("carrier", 5);

const ships = [destroyer, submarine, cruiser, battleship, carrier];

function addShipPiece(user, ship, startId) {
  const allBoardBlocks = document.querySelectorAll(`${user} div`);
  let randomBoolean = Math.random() < 0.5; //return true or false
  let isHorizontal = user === "player" ? angle === 0 : randomBoolean;
  let randomStartIndex = Math.floor(Math.random() * width * width);

  let StartIndex = startId ? startId : randomStartIndex;

  //double chaining
  let validStart = isHorizontal
    ? startIndex <= width * width - ship.length
      ? StartIndex
      : width * width - ship.length //handle vertical
    : StartIndex <= width * width - width * ship.length
    ? StartIndex
    : StartIndex - ship.length * width + width;

  let shipBlocks = [];

  for (let i = 0; i < ship.length; i++) {
    if (isHorizontal) {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i]);
      console.log(shipBlocks);
    } else {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i * width]);
      console.log(shipBlocks);
    }

    let valid;
    if (isHorizontal) {
      shipBlocks.every(
        (_shipBlock, index) =>
          (valid =
            shipBlocks[0].id % width !==
            width - (shipBlocks.length - (index + 1)))
      );
    } else {
      shipBlocks.every(
        (_shipBlock, index) =>
          (valid = shipBlocks[0].id < 90 + (width * index + 1))
      );
    }
  }

  const notTaken = shipBlocks.every(
    (shipBlock) => !shipBlock.classList.contains("taken")
  );

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name);
      shipBlock.classList.add("taken");
    });
  } else {
    addShipPiece(ship);
  }
}

ships.forEach((ship) => addShipPiece("computer", ship));

//Drag player ships
let draggedShip;
const optionShips = Array.from(optionContainer.children);
optionShips.forEach((optionShip) =>
  optionShip.addEventListener("dragstart", dragStart)
);

const allPlayersBlocks = document.querySelectorAll("#player div");

allPlayersBlocks.forEach((playerBlock) => {
  playerBlock.addEventListener("dragover", dragOver);
  playerBlock.addEventListener("drop", dropShip);
});

function dragStart(e) {
  console.log(e.target);
  draggedShip = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function dropShip() {
  const startId = e.target.id;
  const ship = ships[draggedShip.id];
  addShipPiece("player", ship, startId);
}
