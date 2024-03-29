//edit text
var content = document.querySelector(".content");
var counter = document.querySelector(".counter");
var selectedText = "";
var boldBtn = document.querySelector(".bold-btn");
var underlineBtn = document.querySelector(".underline-btn");
var italicBtn = document.querySelector(".italic-btn");
var colorBtn = document.querySelector(".color-btn");

document.addEventListener("mouseup", function () {
  selectedText = document.getSelection();
});
boldBtn.addEventListener("click", function () {
  document.execCommand("bold", false, selectedText);
});
underlineBtn.addEventListener("click", function () {
  document.execCommand("underline", false, selectedText);
});
italicBtn.addEventListener("click", function () {
  document.execCommand("italic", false, selectedText);
});
colorBtn.addEventListener("input", function () {
  document.execCommand("foreColor", false, colorBtn.value);
});

//Word, letter count
document.addEventListener("keyup", function () {
  var wordCounter = content.innerText;
  for (let i = 0; i < wordCounter.length; i++) {
    wordCounter = wordCounter.trim().replaceAll("  ", " ");
  }
  console.log(wordCounter);
});
