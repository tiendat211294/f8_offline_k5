//edit text
var content = document.querySelector(".content");
var counter = document.querySelector(".counter");
var selectedText = "";
var boldBtn = document.querySelector(".bold-btn");
var underlineBtn = document.querySelector(".underline-btn");
var italicBtn = document.querySelector(".italic-btn");
var colorBtn = document.querySelector(".color-btn");
content.focus();
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
  var wordCounter = content.innerText
    .trim()
    .replace(/\s+/g, " ")
    .split(" ").length;
  var letterCounter = content.innerText.length;
  counter.children[0].children[0].innerText = letterCounter;
  counter.children[1].children[0].innerText = wordCounter;
});

//Dropdown menu
var actionBtn = document.querySelector(".action-btn");
var dropdownMenu = document.querySelector(".dropdown-menu");
actionBtn.addEventListener("click", function () {
  dropdownMenu.classList.toggle("show");
});

//New file
var newFileBtn = document.querySelector(".new-file");
newFileBtn.addEventListener("click", function () {
  dropdownMenu.classList.toggle("show");
  content.innerText = "";
  content.focus();
});

//Save file TXT
var fileName = document.querySelector(".file-name");
var txtBtn = document.querySelector(".txt-file");
txtBtn.addEventListener("click", function () {
  dropdownMenu.classList.toggle("show");
  var blob = new Blob([content.innerText]);
  var previewUrl = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = previewUrl;
  a.download = `${fileName.value}.txt`;
  a.click();
});

//Save file PDF
var pdfBtn = document.querySelector(".pdf-file");
pdfBtn.addEventListener("click", function () {
  dropdownMenu.classList.toggle("show");
  html2pdf()
    .set({ filename: `${fileName.value}.pdf` })
    .from(content)
    .save();
});
