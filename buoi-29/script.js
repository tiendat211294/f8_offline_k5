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
  }
});
progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  document.addEventListener("mousemove", handleDrag);
  initialClientX = e.clientX;
});

document.addEventListener("mouseup", function () {
  document.removeEventListener("mousemove", handleDrag);
  offsetWidth = positionSpace;
});
var initialClientX = 0;
var positionSpace = 0; //Khoảng cách kéo thêm tại vị trí ban đầu tới vị trí mới
var offsetWidth = 0; //Khoảng cách ban đầu span so với progressBar
var handleDrag = function (e) {
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
playBtn.addEventListener("click", function () {
  //Nếu nhạc đang dừng --> phát nhạc
  //Nếu nhạc đang phát --> dừng nhạc
  if (audio.paused) {
    audio.play();
    this.classList.remove("fa-play");
    this.classList.add("fa-pause");
  } else {
    audio.pause();
    this.classList.remove("fa-pause");
    this.classList.add("fa-play");
  }
});

//Khi nhạc đang phát
audio.addEventListener("timeupdate", function () {
  currentTimeElement.innerText = getTime(audio.currentTime);
  //Tính tỷ lệ %
  var rate = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${rate}%`;
});

//reset khi hết nhạc
audio.addEventListener("ended", function () {
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
  progress.style.width = `0%`;
  currentTimeElement.innerText = `00:00`;
});

var setProgress = function (positionSpace) {
  var rate = (positionSpace * 100) / progressBar.clientWidth;
  audio.currentTime = audio.duration * rate;
};
