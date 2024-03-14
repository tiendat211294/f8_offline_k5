var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    var offsetX = e.offsetX;
    var progressBarWidth = this.clientWidth;
    var rate = (offsetX * 100) / progressBarWidth;
    progress.style.width = `${rate}%`;
    positionSpace = offsetX;
    offsetWidth = offsetX;
    initialClientX = e.clientX;
    document.addEventListener("mousemove", handleDrag);
    // audio.removeEventListener("timeupdate", updateTime);
  }
});
progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  initialClientX = e.clientX;
  document.addEventListener("mousemove", handleDrag);
  audio.removeEventListener("timeupdate", updateTime);
});

document.addEventListener("mouseup", function () {
  document.removeEventListener("mousemove", handleDrag);
  offsetWidth = positionSpace;
  setProgress();
  audio.addEventListener("timeupdate", updateTime);
});
var initialClientX = 0;
var positionSpace = 0; //Khoảng cách kéo thêm tại vị trí ban đầu tới vị trí mới
var offsetWidth = 0; //Khoảng cách ban đầu span so với progressBar
var handleDrag = function (e) {
  e.stopPropagation();
  var clientX = e.clientX;
  positionSpace = offsetWidth + clientX - initialClientX;
  var progressBarWidth = progressBar.clientWidth;
  var rate = (positionSpace * 100) / progressBarWidth;
  if (rate < 0) {
    rate = 0;
  }
  if (rate > 100) {
    rate = 100;
  }
  progress.style.width = `${rate}%`;
};

//Xây dựng trình phát nhạc
var audio = document.querySelector("audio");
var durationElement = progressBar.nextElementSibling;
var currentTimeElement = progressBar.previousElementSibling;
var playBtn = document.querySelector(".player .player-action i");
var getTime = function (seconds) {
  var mins = Math.floor(seconds / 60);
  seconds = Math.floor(seconds - mins * 60);
  return `${mins < 10 ? "0" + mins : mins}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

//Lắng nghe sự kiện khi file mp3 được tải xong và trình duyệt lấy được thông tin
durationElement.innerText = getTime(audio.duration);
audio.addEventListener("loadeddata", function () {
  durationElement.innerText = getTime(audio.duration);
});

//Khi người dùng click vào nút play
var currentTime = 0;
playBtn.addEventListener("click", function () {
  //Nếu nhạc đang dừng --> phát nhạc
  //Nếu nhạc đang phát --> dừng nhạc
  if (!audio.paused) {
    audio.currentTime = currentTime;
    audio.pause();
    this.classList.remove("fa-pause");
    this.classList.add("fa-play");
  } else {
    audio.currentTime = currentTime;
    audio.play();
    this.classList.remove("fa-play");
    this.classList.add("fa-pause");
  }
});

//Khi nhạc đang phát
var updateTime = function () {
  currentTimeElement.innerText = getTime(audio.currentTime);
  //Tính tỷ lệ %
  var rate = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${rate}%`;
  currentTime = audio.currentTime;
};
audio.addEventListener("timeupdate", updateTime);

//reset khi hết nhạc
audio.addEventListener("ended", function () {
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
  progress.style.width = `0%`;
  currentTimeElement.innerText = `00:00`;
  currentTime = 0;
});

var setProgress = function () {
  var rate = (positionSpace * 100) / progressBar.clientWidth;
  audio.currentTime = (audio.duration * rate) / 100;
};

//Hiển thị timer
var timer = document.querySelector(".timer");
var setTimer = function (e) {
  timer.style.display = "block";
  timer.style.left = `${e.offsetX}px`;
  var rate = (e.offsetX * 100) / this.clientWidth;
  var time = (rate * audio.duration) / 100;
  timer.innerText = getTime(time);
};
progressBar.addEventListener("mousemove", setTimer);
progressBar.addEventListener("mouseout", function () {
  timer.style.display = "none";
});
progressSpan.addEventListener("mousemove", function (e) {
  e.stopPropagation();
});
