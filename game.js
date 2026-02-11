let boxes = document.querySelectorAll(".box");
let newGamebtn = document.querySelector(".new-btn");
let resetbtn = document.querySelector(".reset");
let msgContainer = document.querySelector(".msg-cont");
let msg = document.querySelector("#msg");
let turnOF0 = true;
let moveCount = 0;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetgame = () => {
  turnOF0 = false;
  enabledbtns();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnOF0) {
      box.innerText = "O";
      turnOF0 = false;
    } else {
      box.innerText = "X";
      turnOF0 = true;
    }
    moveCount++; // har click ke saath move count increase
    if (moveCount % 2 === 1) {
      box.style.color = "red"; // odd move → red
    } else {
      box.style.color = "green"; // even move → green
    }
    box.disabled = true;

    checkWinner();
  });
});
const showWinner = (winner) => {
  msg.innerText = `Congratulations,Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledbtns();
};
const disabledbtns = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enabledbtns = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.style.backgroundColor = "";
    box.innerText = "";
  }
  moveCount = 0;
};
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }

  // Draw check (sab boxes filled & no winner)
  let allFilled = true; // assume sab filled hain
  for (let box of boxes) {
    if (box.innerText === "") {
      allFilled = false; // koi empty box hai → draw nahi
      break;
    }
  }

  if (allFilled) {
    msg.innerText = "It's a Draw!";
    msg.style.backgroundColor = "yellow";
    msgContainer.classList.remove("hide");
    disabledbtns(); // game stop
  }
};

newGamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
