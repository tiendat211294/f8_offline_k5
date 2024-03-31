var counter = document.querySelector(".counter");
var getLinkBtn = document.querySelector(".get-link-btn");
let start;
function step(timeStamp) {
  if (start === undefined) {
    start = timeStamp;
  }
  const elapsed = timeStamp - start;
  let count = Math.floor(elapsed / 1000);
  counter.innerText = 30 - count;
  if (elapsed <= 30000) {
    window.requestAnimationFrame(step);
  } else {
    counter.innerText = 0;
    getLinkBtn.disabled = "";
    getLinkBtn.addEventListener("click", function () {
      window.location.href = "https://fullstack.edu.vn/";
    });
  }
}

window.requestAnimationFrame(step);
