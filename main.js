const app = document.getElementById("app");
const input = document.getElementById("hex-input");
const answer = document.getElementById("answer");
const submitBtn = document.getElementById("submit");

let theHex = "#000000";
let answerState = false;
let difficulty = 0;

const randomHex = () => {
  // let hex = "0123456789ABCDEF";
  // let hex = "13579BDF";
  let hex = ["37BF", "13579BDF", "0123456789ABCDEF"];
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const pColor = hex[difficulty][Math.floor(Math.random() * hex[difficulty].length)];
    color += pColor.repeat(2);
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

function submit() {
  if (answerState) {
    answerState = false;
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
    app.style.backgroundColor = "#22ee22";
    return;
  }
  app.style.backgroundColor = "#ee2222";
}

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    submit();
  }
});
changeHex();
