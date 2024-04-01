var counter = document.querySelector(".counter");
var getLinkBtn = document.querySelector(".get-link-btn");
let start;
let requestAnimationID = window.requestAnimationFrame(countDown);
function countDown(timeStamp) {
  if (start === undefined) {
    start = timeStamp;
  }
  const elapsed = timeStamp - start;
  let count = Math.floor(elapsed / 1000);
  counter.innerText = 30 - count;
  if (elapsed <= 30000) {
    requestAnimationID = window.requestAnimationFrame(countDown);
  } else {
    counter.innerText = 0;
    getLinkBtn.disabled = "";
    getLinkBtn.addEventListener("click", function () {
      window.location.href = "https://fullstack.edu.vn/";
    });
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    window.cancelAnimationFrame(requestAnimationID);
  } else {
    requestAnimationID = window.requestAnimationFrame(countDown);
  }
}
document.addEventListener("visibilitychange", handleVisibilityChange);
