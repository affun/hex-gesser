const app = document.getElementById("app");
const input = document.getElementById("hex-input");
const answer = document.getElementById("answer");
const submitBtn = document.getElementById("submit");
const half = document.getElementById("half");

let theHex = "#000000";
let answerState = false;
let difficulty = 0;

const difficultyBtns = [];

for (let i = 1; i <= 4; i++) {
  const element = document.querySelector(`#d${i}`);
  difficultyBtns.push(element);
}

const randomHex = () => {
  // let hex = "0123456789ABCDEF";
  // let hex = "13579BDF";
  let hex = ["37BF", "13579BDF", "0123456789ABCDEF"];
  let color = "#";
  if (difficulty < 3) {
    for (let i = 0; i < 3; i++) {
      let pColor = hex[difficulty][Math.floor(Math.random() * hex[difficulty].length)];
      color += pColor.repeat(2);
    }
    return color;
  }
  for (let i = 0; i < 6; i++) {
    let pColor = hex[2][Math.floor(Math.random() * hex[2].length)];
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
  changeHex();
  difficulty = dif;
  difficultyBtns.forEach((btn) => {
    btn.classList.remove("s-dif");
  });
  difficultyBtns[dif].classList.add("s-dif");
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
difficultyBtns[difficulty].classList.add("s-dif");
