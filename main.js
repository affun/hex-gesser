const app = document.getElementById("app");
const input = document.getElementById("hex-input");
const answer = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const half = document.getElementById("half");
const keyboard = document.getElementById("keyboard");

const hex = ["3F", "28F", "37BF", "13579BDF", "0123456789ABCDEF"];
let theHex = "#000000";
let answerState = false;
let difficulty = parseInt(localStorage.getItem("difficulty")) || 0;
const maxDif = 6;

const difficultyBtns = [];

for (let i = 1; i <= maxDif; i++) {
  const element = document.querySelector(`#d${i}`);
  difficultyBtns.push(element);
}

const randomHex = () => {
  // let hex = "0123456789ABCDEF";
  // let hex = "13579BDF";
  // let hex = ["3F", "28F", "37BF", "13579BDF", "0123456789ABCDEF"];
  let color = "#";
  if (difficulty < hex.length) {
    for (let i = 0; i < 3; i++) {
      let pColor =
        hex[difficulty][Math.floor(Math.random() * hex[difficulty].length)];
      color += pColor.repeat(2);
    }
    return color;
  }
  for (let i = 0; i < 6; i++) {
    let pColor =
      hex[hex.length - 1][
        Math.floor(Math.random() * hex[hex.length - 1].length)
      ];
    color += pColor;
  }

  return color;
};

const changeHex = () => {
  answerState = false;
  answer.classList.add("hidden");
  submitBtn.innerHTML = "That's it";
  theHex = randomHex();
  console.log(theHex);
  app.style.backgroundColor = theHex;
  answer.innerHTML = "answer: " + theHex;
};

const changeDif = (dif) => {
  answerState = false;
  difficulty = dif;
  changeHex();
  setKeyboard();
  localStorage.setItem("difficulty", difficulty);
  difficultyBtns.forEach((btn) => {
    btn.classList.remove("s-dif");
  });
  console.log(dif);
  console.log(difficultyBtns);
  difficultyBtns[dif].classList.add("s-dif");
};

const setKeyboard = () => {
  keyboard.innerHTML = "";
  // change grid-template-columns of keyboard based on difficulty
  keyboard.style.gridTemplateColumns = `repeat(${
    difficulty < 2 ? difficulty + 2 : 4
  }, 1fr)`;

  const keys = hex[difficulty === 5 ? 4 : difficulty]
    .split("")
    .map((n) => `<div class="key" onclick="input.value += '${n}'">${n}</div>`)
    .join("");
  keyboard.innerHTML = keys;
};

function submit() {
  if (answerState) {
    answerState = false;
    input.value = "";
    half.style.backgroundColor = "";
    changeHex();
    return;
  }
  const hex = "#" + input.value.toUpperCase();
  let finalHex = hex;
  if (hex.length === 4) {
    console.log(finalHex);

    finalHex =
      "#" +
      hex
        .slice(1)
        .split("")
        .map((char) => char + char)
        .join("");
    console.log(finalHex);
  }

  if (finalHex.length !== 7) {
    alert("Invalid Hex");
    return;
  }

  answerState = true;

  answer.classList.remove("hidden");
  submitBtn.innerHTML = "Next";

  if (finalHex === theHex) {
    app.style.backgroundColor = "#0CC078";
    return;
  }
  app.style.backgroundColor = "#E03C32";
  setTimeout(() => {
    if (!answerState) {
      return;
    }
    app.style.backgroundColor = theHex;
    half.style.backgroundColor = finalHex;
    return;
  }, 1500);
}

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    submit();
  }
});
changeHex();
setKeyboard();
difficultyBtns[difficulty].classList.add("s-dif");
