var progressBar = document.querySelector(".progress-bar");
var progress = progressBar.querySelector(".progress");
var progressSpan = progress.querySelector("span");
var progressBarWidth = progressBar.clientWidth;
var checkUp = false;
progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    var offsetX = e.offsetX;
    var rate = (offsetX * 100) / progressBarWidth;
    progress.style.width = `${rate}%`;
    positionSpace = offsetX;
    offsetWidth = offsetX;
    initialClientX = e.clientX;
    audio.removeEventListener("timeupdate", updateTime);
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleSetProgress);
  }
});
progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  if (e.which === 1) {
    var rate = audio.currentTime / audio.duration;
    offsetWidth = rate * progressBarWidth;
    positionSpace = rate * progressBarWidth;
    initialClientX = e.clientX;
    audio.removeEventListener("timeupdate", updateTime);
    document.addEventListener("mousemove", handleDrag);
    checkUp = true;
    document.addEventListener("mouseup", handleSetProgress);
  }
});

var handleSetProgress = function () {
  if (checkUp) {
    var rate = audio.currentTime / audio.duration;
    offsetWidth = rate * progressBarWidth;
    checkUp = false;
  }
  offsetWidth = positionSpace;
  document.removeEventListener("mousemove", handleDrag);
  setProgress();
  audio.addEventListener("timeupdate", updateTime);
  document.removeEventListener("mouseup", handleSetProgress);
};

var initialClientX = 0;
var positionSpace = 0; //Khoảng cách kéo thêm tại vị trí ban đầu tới vị trí mới
var offsetWidth = 0; //Khoảng cách ban đầu span so với progressBar
var handleDrag = function (e) {
  e.stopPropagation();
  var clientX = e.clientX;
  positionSpace = offsetWidth + clientX - initialClientX;
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
  currentTime = 0;
  audio.currentTime = 0;
});

var setProgress = function () {
  var rate = (positionSpace * 100) / progressBarWidth;
  audio.currentTime = (audio.duration * rate) / 100;
};

//Hiển thị timer
var timer = document.querySelector(".timer");
var setTimer = function (e) {
  timer.style.display = "block";
  timer.style.left = `${e.offsetX}px`;
  var rate = (e.offsetX * 100) / progressBarWidth;
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

//Karaoke
//Ẩn hiện karaoke
var karaokeBtn = document.querySelector(".open-btn");
var closeKaraoke = document.querySelector(".close-karaoke");
var karaoke = document.querySelector(".karaoke");
karaokeBtn.addEventListener("click", function () {
  karaoke.classList.add("show");
});
closeKaraoke.addEventListener("click", function () {
  karaoke.classList.remove("show");
});

//Lyric
var lyric = `{
  "title": "Biết tìm đâu",
  "singer": "Tuấn Hưng",
  "err": 0,
  "msg": "Success",
  "data": {
      "sentences": [
          {
              "words": [
                  {
                      "startTime": 27460,
                      "endTime": 27909,
                      "data": "Từng"
                  },
                  {
                      "startTime": 27919,
                      "endTime": 28440,
                      "data": "ngày"
                  },
                  {
                      "startTime": 28440,
                      "endTime": 28550,
                      "data": "dài"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 28769,
                      "endTime": 29089,
                      "data": "Còn"
                  },
                  {
                      "startTime": 29089,
                      "endTime": 29369,
                      "data": "lại"
                  },
                  {
                      "startTime": 29369,
                      "endTime": 29619,
                      "data": "một"
                  },
                  {
                      "startTime": 29619,
                      "endTime": 29649,
                      "data": "mình"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 29950,
                      "endTime": 30529,
                      "data": "Nơi"
                  },
                  {
                      "startTime": 30529,
                      "endTime": 30909,
                      "data": "đây"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 32179,
                      "endTime": 32429,
                      "data": "Nhìn"
                  },
                  {
                      "startTime": 32429,
                      "endTime": 32979,
                      "data": "cánh"
                  },
                  {
                      "startTime": 32979,
                      "endTime": 33019,
                      "data": "chim"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 33529,
                      "endTime": 33569,
                      "data": "Bay"
                  },
                  {
                      "startTime": 33569,
                      "endTime": 33839,
                      "data": "ngang"
                  },
                  {
                      "startTime": 33839,
                      "endTime": 34130,
                      "data": "thấp"
                  },
                  {
                      "startTime": 34130,
                      "endTime": 34170,
                      "data": "thoáng"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 34589,
                      "endTime": 34889,
                      "data": "Trời"
                  },
                  {
                      "startTime": 34889,
                      "endTime": 35089,
                      "data": "xa"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 36520,
                      "endTime": 37640,
                      "data": "Lòng ngậm ngùi "
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 37739,
                      "endTime": 37949,
                      "data": "Về"
                  },
                  {
                      "startTime": 37949,
                      "endTime": 38169,
                      "data": "một"
                  },
                  {
                      "startTime": 38279,
                      "endTime": 38510,
                      "data": "cuộc"
                  },
                  {
                      "startTime": 38510,
                      "endTime": 38539,
                      "data": "tình"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 38859,
                      "endTime": 39249,
                      "data": "đã"
                  },
                  {
                      "startTime": 39249,
                      "endTime": 39269,
                      "data": "lỡ"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 40999,
                      "endTime": 41350,
                      "data": "Tình"
                  },
                  {
                      "startTime": 41350,
                      "endTime": 41829,
                      "data": "đã"
                  },
                  {
                      "startTime": 41829,
                      "endTime": 41849,
                      "data": "bay"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 42329,
                      "endTime": 42359,
                      "data": "Theo"
                  },
                  {
                      "startTime": 42359,
                      "endTime": 42669,
                      "data": "những"
                  },
                  {
                      "startTime": 42669,
                      "endTime": 42949,
                      "data": "cánh"
                  },
                  {
                      "startTime": 42959,
                      "endTime": 43229,
                      "data": "chim"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 43390,
                      "endTime": 45190,
                      "data": "Về đâu"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 47469,
                      "endTime": 47809,
                      "data": "Từng"
                  },
                  {
                      "startTime": 47819,
                      "endTime": 48499,
                      "data": "ngày"
                  },
                  {
                      "startTime": 48499,
                      "endTime": 48619,
                      "data": "dài"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 48849,
                      "endTime": 49159,
                      "data": "Còn"
                  },
                  {
                      "startTime": 49159,
                      "endTime": 49449,
                      "data": "lại"
                  },
                  {
                      "startTime": 49449,
                      "endTime": 49759,
                      "data": "một"
                  },
                  {
                      "startTime": 49759,
                      "endTime": 49789,
                      "data": "mình"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 50069,
                      "endTime": 50409,
                      "data": "Nơi"
                  },
                  {
                      "startTime": 50409,
                      "endTime": 50919,
                      "data": "đây"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 51979,
                      "endTime": 52159,
                      "data": "Lòng"
                  },
                  {
                      "startTime": 52179,
                      "endTime": 52889,
                      "data": "khát"
                  },
                  {
                      "startTime": 52889,
                      "endTime": 53139,
                      "data": "khao"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 53379,
                      "endTime": 53619,
                      "data": "Bao"
                  },
                  {
                      "startTime": 53619,
                      "endTime": 53910,
                      "data": "nhiêu"
                  },
                  {
                      "startTime": 53919,
                      "endTime": 54189,
                      "data": "yêu"
                  },
                  {
                      "startTime": 54189,
                      "endTime": 54530,
                      "data": "thương"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 54720,
                      "endTime": 55930,
                      "data": "Ngày nào"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 56619,
                      "endTime": 57009,
                      "data": "Trong"
                  },
                  {
                      "startTime": 57009,
                      "endTime": 57469,
                      "data": "vòng"
                  },
                  {
                      "startTime": 57469,
                      "endTime": 57489,
                      "data": "tay"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 57790,
                      "endTime": 58090,
                      "data": "Mình"
                  },
                  {
                      "startTime": 58090,
                      "endTime": 58180,
                      "data": "đã"
                  },
                  {
                      "startTime": 58309,
                      "endTime": 58620,
                      "data": "nguyện"
                  },
                  {
                      "startTime": 58630,
                      "endTime": 58920,
                      "data": "thề"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 59149,
                      "endTime": 59619,
                      "data": "Bên"
                  },
                  {
                      "startTime": 59759,
                      "endTime": 60649,
                      "data": "nhau"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 61099,
                      "endTime": 61449,
                      "data": "Hồn"
                  },
                  {
                      "startTime": 61459,
                      "endTime": 61950,
                      "data": "ngất"
                  },
                  {
                      "startTime": 61950,
                      "endTime": 62009,
                      "data": "ngây"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 62219,
                      "endTime": 62539,
                      "data": "Khi"
                  },
                  {
                      "startTime": 62539,
                      "endTime": 62769,
                      "data": "đôi"
                  },
                  {
                      "startTime": 62769,
                      "endTime": 63109,
                      "data": "môi"
                  },
                  {
                      "startTime": 63119,
                      "endTime": 63329,
                      "data": "em"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 63479,
                      "endTime": 63980,
                      "data": "Vừa"
                  },
                  {
                      "startTime": 64080,
                      "endTime": 64529,
                      "data": "trao"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 67379,
                      "endTime": 67919,
                      "data": "Khát"
                  },
                  {
                      "startTime": 67929,
                      "endTime": 68409,
                      "data": "khao"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 68650,
                      "endTime": 69129,
                      "data": "Mong"
                  },
                  {
                      "startTime": 69139,
                      "endTime": 69590,
                      "data": "trở"
                  },
                  {
                      "startTime": 69710,
                      "endTime": 70039,
                      "data": "lại"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 70180,
                      "endTime": 70660,
                      "data": "Một"
                  },
                  {
                      "startTime": 70670,
                      "endTime": 71150,
                      "data": "ngày"
                  },
                  {
                      "startTime": 71150,
                      "endTime": 71759,
                      "data": "êm"
                  },
                  {
                      "startTime": 71759,
                      "endTime": 72289,
                      "data": "đềm"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 72519,
                      "endTime": 72779,
                      "data": "Ta"
                  },
                  {
                      "startTime": 72779,
                      "endTime": 73089,
                      "data": "cùng"
                  },
                  {
                      "startTime": 73089,
                      "endTime": 73119,
                      "data": "nhau"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 73249,
                      "endTime": 73589,
                      "data": "Say"
                  },
                  {
                      "startTime": 73589,
                      "endTime": 73769,
                      "data": "sưa"
                  },
                  {
                      "startTime": 73959,
                      "endTime": 73989,
                      "data": "bước"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 74119,
                      "endTime": 74539,
                      "data": "Trên"
                  },
                  {
                      "startTime": 74539,
                      "endTime": 75120,
                      "data": "đường"
                  },
                  {
                      "startTime": 75340,
                      "endTime": 75610,
                      "data": "tình"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 76289,
                      "endTime": 76799,
                      "data": "Nắm"
                  },
                  {
                      "startTime": 76919,
                      "endTime": 77449,
                      "data": "tay"
                  },
                  {
                      "startTime": 77449,
                      "endTime": 77709,
                      "data": "nhau"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 78019,
                      "endTime": 78549,
                      "data": "Vui"
                  },
                  {
                      "startTime": 78599,
                      "endTime": 78839,
                      "data": "đùa"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 79079,
                      "endTime": 79529,
                      "data": "Rộn"
                  },
                  {
                      "startTime": 79569,
                      "endTime": 80020,
                      "data": "vang"
                  },
                  {
                      "startTime": 80020,
                      "endTime": 80530,
                      "data": "tiếng"
                  },
                  {
                      "startTime": 80540,
                      "endTime": 80920,
                      "data": "cười"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 81349,
                      "endTime": 81679,
                      "data": "Dìu"
                  },
                  {
                      "startTime": 81679,
                      "endTime": 81879,
                      "data": "nhau"
                  },
                  {
                      "startTime": 81879,
                      "endTime": 81899,
                      "data": "đi"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 82219,
                      "endTime": 82519,
                      "data": "Với"
                  },
                  {
                      "startTime": 82519,
                      "endTime": 82749,
                      "data": "những"
                  },
                  {
                      "startTime": 82759,
                      "endTime": 83099,
                      "data": "chiếc"
                  },
                  {
                      "startTime": 83099,
                      "endTime": 83159,
                      "data": "hôn"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 83360,
                      "endTime": 83879,
                      "data": "đầu"
                  },
                  {
                      "startTime": 83939,
                      "endTime": 84399,
                      "data": "tiên"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 85159,
                      "endTime": 85820,
                      "data": "Khát"
                  },
                  {
                      "startTime": 85820,
                      "endTime": 86160,
                      "data": "khao"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 86329,
                      "endTime": 86889,
                      "data": "Mong"
                  },
                  {
                      "startTime": 86899,
                      "endTime": 87459,
                      "data": "trở"
                  },
                  {
                      "startTime": 87489,
                      "endTime": 87749,
                      "data": "lại"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 88079,
                      "endTime": 88590,
                      "data": "Một"
                  },
                  {
                      "startTime": 88590,
                      "endTime": 89090,
                      "data": "ngày"
                  },
                  {
                      "startTime": 89090,
                      "endTime": 89370,
                      "data": "êm"
                  },
                  {
                      "startTime": 89380,
                      "endTime": 89840,
                      "data": "đềm"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 90189,
                      "endTime": 90549,
                      "data": "Ta"
                  },
                  {
                      "startTime": 90549,
                      "endTime": 90829,
                      "data": "cùng"
                  },
                  {
                      "startTime": 90829,
                      "endTime": 90849,
                      "data": "em"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 91030,
                      "endTime": 91339,
                      "data": "Say"
                  },
                  {
                      "startTime": 91339,
                      "endTime": 91699,
                      "data": "sưa"
                  },
                  {
                      "startTime": 91699,
                      "endTime": 91749,
                      "data": "bước"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 91889,
                      "endTime": 92319,
                      "data": "Trên"
                  },
                  {
                      "startTime": 92319,
                      "endTime": 92880,
                      "data": "đường"
                  },
                  {
                      "startTime": 93080,
                      "endTime": 93370,
                      "data": "về"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 94140,
                      "endTime": 94669,
                      "data": "Nước"
                  },
                  {
                      "startTime": 94669,
                      "endTime": 95069,
                      "data": "mắt"
                  },
                  {
                      "startTime": 95079,
                      "endTime": 95439,
                      "data": "rơi"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 95829,
                      "endTime": 96299,
                      "data": "Biết"
                  },
                  {
                      "startTime": 96299,
                      "endTime": 96639,
                      "data": "giờ"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 96899,
                      "endTime": 97359,
                      "data": "Chỉ"
                  },
                  {
                      "startTime": 97369,
                      "endTime": 97749,
                      "data": "là"
                  },
                  {
                      "startTime": 97759,
                      "endTime": 98319,
                      "data": "xa"
                  },
                  {
                      "startTime": 98319,
                      "endTime": 98649,
                      "data": "vời"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 99129,
                      "endTime": 99429,
                      "data": "Lòng"
                  },
                  {
                      "startTime": 99429,
                      "endTime": 99660,
                      "data": "chua"
                  },
                  {
                      "startTime": 99660,
                      "endTime": 99719,
                      "data": "xót"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 99929,
                      "endTime": 100280,
                      "data": "Thấy"
                  },
                  {
                      "startTime": 100280,
                      "endTime": 100540,
                      "data": "tiếc"
                  },
                  {
                      "startTime": 100540,
                      "endTime": 100570,
                      "data": "nuối"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 100829,
                      "endTime": 101129,
                      "data": "Những"
                  },
                  {
                      "startTime": 101129,
                      "endTime": 101639,
                      "data": "ngày"
                  },
                  {
                      "startTime": 101689,
                      "endTime": 101839,
                      "data": "qua"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 105219,
                      "endTime": 105859,
                      "data": "Biết"
                  },
                  {
                      "startTime": 105859,
                      "endTime": 107109,
                      "data": "tìm"
                  },
                  {
                      "startTime": 107109,
                      "endTime": 107149,
                      "data": "đâu"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 145289,
                      "endTime": 145699,
                      "data": "Từng"
                  },
                  {
                      "startTime": 145789,
                      "endTime": 146369,
                      "data": "ngày"
                  },
                  {
                      "startTime": 146369,
                      "endTime": 146489,
                      "data": "dài"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 146690,
                      "endTime": 147000,
                      "data": "Còn"
                  },
                  {
                      "startTime": 147000,
                      "endTime": 147250,
                      "data": "lại"
                  },
                  {
                      "startTime": 147250,
                      "endTime": 147529,
                      "data": "một"
                  },
                  {
                      "startTime": 147529,
                      "endTime": 147559,
                      "data": "mình"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 147830,
                      "endTime": 148430,
                      "data": "Nơi"
                  },
                  {
                      "startTime": 148430,
                      "endTime": 148849,
                      "data": "đây"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 149929,
                      "endTime": 150229,
                      "data": "Nhìn"
                  },
                  {
                      "startTime": 150259,
                      "endTime": 150779,
                      "data": "cánh"
                  },
                  {
                      "startTime": 150779,
                      "endTime": 150809,
                      "data": "chim"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 151090,
                      "endTime": 151389,
                      "data": "Bay"
                  },
                  {
                      "startTime": 151389,
                      "endTime": 151669,
                      "data": "ngang"
                  },
                  {
                      "startTime": 151669,
                      "endTime": 151960,
                      "data": "thấp"
                  },
                  {
                      "startTime": 151970,
                      "endTime": 152210,
                      "data": "thoáng"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 152389,
                      "endTime": 152659,
                      "data": "Trời"
                  },
                  {
                      "startTime": 152679,
                      "endTime": 152959,
                      "data": "xa"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 154430,
                      "endTime": 154780,
                      "data": "Lòng"
                  },
                  {
                      "startTime": 154780,
                      "endTime": 154829,
                      "data": "ngậm"
                  },
                  {
                      "startTime": 154839,
                      "endTime": 154869,
                      "data": "ngùi"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 155500,
                      "endTime": 155819,
                      "data": "Về"
                  },
                  {
                      "startTime": 155819,
                      "endTime": 156130,
                      "data": "một"
                  },
                  {
                      "startTime": 156130,
                      "endTime": 156339,
                      "data": "cuộc"
                  },
                  {
                      "startTime": 156339,
                      "endTime": 156369,
                      "data": "tình"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 156690,
                      "endTime": 157529,
                      "data": "đã"
                  },
                  {
                      "startTime": 157529,
                      "endTime": 157919,
                      "data": "lỡ"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 158920,
                      "endTime": 159259,
                      "data": "Tình"
                  },
                  {
                      "startTime": 159259,
                      "endTime": 159669,
                      "data": "đã"
                  },
                  {
                      "startTime": 159669,
                      "endTime": 159689,
                      "data": "bay"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 160019,
                      "endTime": 160289,
                      "data": "Theo"
                  },
                  {
                      "startTime": 160309,
                      "endTime": 160599,
                      "data": "những"
                  },
                  {
                      "startTime": 160599,
                      "endTime": 160880,
                      "data": "cánh"
                  },
                  {
                      "startTime": 160880,
                      "endTime": 161040,
                      "data": "chim"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 161409,
                      "endTime": 162009,
                      "data": "Về"
                  },
                  {
                      "startTime": 162809,
                      "endTime": 162849,
                      "data": "đâu"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 165299,
                      "endTime": 165619,
                      "data": "Từng"
                  },
                  {
                      "startTime": 165689,
                      "endTime": 166330,
                      "data": "ngày"
                  },
                  {
                      "startTime": 166330,
                      "endTime": 166420,
                      "data": "dài"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 166669,
                      "endTime": 166969,
                      "data": "Còn"
                  },
                  {
                      "startTime": 166969,
                      "endTime": 167249,
                      "data": "lại"
                  },
                  {
                      "startTime": 167249,
                      "endTime": 167530,
                      "data": "một"
                  },
                  {
                      "startTime": 167530,
                      "endTime": 167560,
                      "data": "mình"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 167860,
                      "endTime": 168209,
                      "data": "Nơi"
                  },
                  {
                      "startTime": 168209,
                      "endTime": 168719,
                      "data": "đây"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 170120,
                      "endTime": 170149,
                      "data": "Lòng"
                  },
                  {
                      "startTime": 170279,
                      "endTime": 170689,
                      "data": "khát"
                  },
                  {
                      "startTime": 170719,
                      "endTime": 170939,
                      "data": "khao"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 171140,
                      "endTime": 171349,
                      "data": "Bao"
                  },
                  {
                      "startTime": 171349,
                      "endTime": 171619,
                      "data": "nhiêu"
                  },
                  {
                      "startTime": 171629,
                      "endTime": 171950,
                      "data": "yêu"
                  },
                  {
                      "startTime": 171950,
                      "endTime": 172119,
                      "data": "thương"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 172509,
                      "endTime": 172829,
                      "data": "Ngày"
                  },
                  {
                      "startTime": 172829,
                      "endTime": 173009,
                      "data": "nào"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 174369,
                      "endTime": 174769,
                      "data": "Trong"
                  },
                  {
                      "startTime": 174769,
                      "endTime": 175279,
                      "data": "vòng"
                  },
                  {
                      "startTime": 175279,
                      "endTime": 175299,
                      "data": "tay"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 175579,
                      "endTime": 175879,
                      "data": "Mình"
                  },
                  {
                      "startTime": 175879,
                      "endTime": 176079,
                      "data": "đã"
                  },
                  {
                      "startTime": 176079,
                      "endTime": 176399,
                      "data": "nguyện"
                  },
                  {
                      "startTime": 176409,
                      "endTime": 176759,
                      "data": "thề"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 176909,
                      "endTime": 177469,
                      "data": "Bên"
                  },
                  {
                      "startTime": 177479,
                      "endTime": 177899,
                      "data": "nhau"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 178890,
                      "endTime": 179220,
                      "data": "Hồn"
                  },
                  {
                      "startTime": 179230,
                      "endTime": 179730,
                      "data": "ngất"
                  },
                  {
                      "startTime": 179730,
                      "endTime": 179799,
                      "data": "ngây"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 179979,
                      "endTime": 180329,
                      "data": "Khi"
                  },
                  {
                      "startTime": 180329,
                      "endTime": 180549,
                      "data": "đôi"
                  },
                  {
                      "startTime": 180549,
                      "endTime": 180919,
                      "data": "môi"
                  },
                  {
                      "startTime": 180919,
                      "endTime": 181139,
                      "data": "em"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 181279,
                      "endTime": 181790,
                      "data": "Vừa"
                  },
                  {
                      "startTime": 181870,
                      "endTime": 182780,
                      "data": "trao"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 185050,
                      "endTime": 185840,
                      "data": "Khát"
                  },
                  {
                      "startTime": 185889,
                      "endTime": 186199,
                      "data": "khao"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 186369,
                      "endTime": 186509,
                      "data": "Mong"
                  },
                  {
                      "startTime": 186879,
                      "endTime": 187390,
                      "data": "trở"
                  },
                  {
                      "startTime": 187500,
                      "endTime": 187840,
                      "data": "lại"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 187999,
                      "endTime": 188469,
                      "data": "Một"
                  },
                  {
                      "startTime": 188579,
                      "endTime": 188949,
                      "data": "ngày"
                  },
                  {
                      "startTime": 188949,
                      "endTime": 189529,
                      "data": "êm"
                  },
                  {
                      "startTime": 189529,
                      "endTime": 190079,
                      "data": "đềm"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 190229,
                      "endTime": 190539,
                      "data": "Ta"
                  },
                  {
                      "startTime": 190539,
                      "endTime": 190719,
                      "data": "cùng"
                  },
                  {
                      "startTime": 190729,
                      "endTime": 190919,
                      "data": "nhau"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 191049,
                      "endTime": 191289,
                      "data": "Say"
                  },
                  {
                      "startTime": 191299,
                      "endTime": 191549,
                      "data": "sưa"
                  },
                  {
                      "startTime": 191659,
                      "endTime": 191789,
                      "data": "bước"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 191899,
                      "endTime": 192319,
                      "data": "Trên"
                  },
                  {
                      "startTime": 192319,
                      "endTime": 192920,
                      "data": "đường"
                  },
                  {
                      "startTime": 193050,
                      "endTime": 193429,
                      "data": "tình"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 194110,
                      "endTime": 194469,
                      "data": "Nắm"
                  },
                  {
                      "startTime": 194699,
                      "endTime": 195279,
                      "data": "tay"
                  },
                  {
                      "startTime": 195279,
                      "endTime": 195519,
                      "data": "nhau"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 195809,
                      "endTime": 196409,
                      "data": "Vui"
                  },
                  {
                      "startTime": 196409,
                      "endTime": 196689,
                      "data": "đùa"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 196869,
                      "endTime": 197329,
                      "data": "Rộn"
                  },
                  {
                      "startTime": 197399,
                      "endTime": 197820,
                      "data": "vang"
                  },
                  {
                      "startTime": 197820,
                      "endTime": 198330,
                      "data": "tiếng"
                  },
                  {
                      "startTime": 198330,
                      "endTime": 198709,
                      "data": "cười"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 199069,
                      "endTime": 199419,
                      "data": "Dìu"
                  },
                  {
                      "startTime": 199419,
                      "endTime": 199679,
                      "data": "nhau"
                  },
                  {
                      "startTime": 199679,
                      "endTime": 199699,
                      "data": "đi"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 199819,
                      "endTime": 200280,
                      "data": "Với"
                  },
                  {
                      "startTime": 200290,
                      "endTime": 200510,
                      "data": "những"
                  },
                  {
                      "startTime": 200520,
                      "endTime": 200820,
                      "data": "chiếc"
                  },
                  {
                      "startTime": 200920,
                      "endTime": 200950,
                      "data": "hôn"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 201089,
                      "endTime": 201590,
                      "data": "đầu"
                  },
                  {
                      "startTime": 201690,
                      "endTime": 202180,
                      "data": "tiên"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 202909,
                      "endTime": 203469,
                      "data": "Khát"
                  },
                  {
                      "startTime": 203479,
                      "endTime": 203959,
                      "data": "khao"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 204139,
                      "endTime": 204640,
                      "data": "Mong"
                  },
                  {
                      "startTime": 204650,
                      "endTime": 205140,
                      "data": "trở"
                  },
                  {
                      "startTime": 205260,
                      "endTime": 205500,
                      "data": "lại"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 205879,
                      "endTime": 206389,
                      "data": "Một"
                  },
                  {
                      "startTime": 206389,
                      "endTime": 206739,
                      "data": "ngày"
                  },
                  {
                      "startTime": 206739,
                      "endTime": 207169,
                      "data": "êm"
                  },
                  {
                      "startTime": 207179,
                      "endTime": 207670,
                      "data": "đềm"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 208099,
                      "endTime": 208309,
                      "data": "Ta"
                  },
                  {
                      "startTime": 208309,
                      "endTime": 208649,
                      "data": "cùng"
                  },
                  {
                      "startTime": 208649,
                      "endTime": 208669,
                      "data": "em"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 208770,
                      "endTime": 209119,
                      "data": "Say"
                  },
                  {
                      "startTime": 209119,
                      "endTime": 209499,
                      "data": "sưa"
                  },
                  {
                      "startTime": 209499,
                      "endTime": 209559,
                      "data": "bước"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 209679,
                      "endTime": 210060,
                      "data": "Trên"
                  },
                  {
                      "startTime": 210060,
                      "endTime": 210650,
                      "data": "đường"
                  },
                  {
                      "startTime": 210820,
                      "endTime": 211119,
                      "data": "về"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 211959,
                      "endTime": 212369,
                      "data": "Nước"
                  },
                  {
                      "startTime": 212369,
                      "endTime": 212810,
                      "data": "mắt"
                  },
                  {
                      "startTime": 212820,
                      "endTime": 213239,
                      "data": "rơi"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 213599,
                      "endTime": 214039,
                      "data": "Biết"
                  },
                  {
                      "startTime": 214039,
                      "endTime": 214409,
                      "data": "giờ"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 214599,
                      "endTime": 215199,
                      "data": "Chỉ"
                  },
                  {
                      "startTime": 215199,
                      "endTime": 215529,
                      "data": "là"
                  },
                  {
                      "startTime": 215539,
                      "endTime": 216089,
                      "data": "xa"
                  },
                  {
                      "startTime": 216089,
                      "endTime": 216469,
                      "data": "vời"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 216910,
                      "endTime": 217179,
                      "data": "Lòng"
                  },
                  {
                      "startTime": 217179,
                      "endTime": 217379,
                      "data": "chua"
                  },
                  {
                      "startTime": 217399,
                      "endTime": 217489,
                      "data": "xót"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 217710,
                      "endTime": 218020,
                      "data": "Thấy"
                  },
                  {
                      "startTime": 218020,
                      "endTime": 218339,
                      "data": "tiếc"
                  },
                  {
                      "startTime": 218339,
                      "endTime": 218369,
                      "data": "nuối"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 218600,
                      "endTime": 218910,
                      "data": "Những"
                  },
                  {
                      "startTime": 218910,
                      "endTime": 219450,
                      "data": "ngày"
                  },
                  {
                      "startTime": 219450,
                      "endTime": 219640,
                      "data": "qua"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 223019,
                      "endTime": 223720,
                      "data": "Biết"
                  },
                  {
                      "startTime": 223720,
                      "endTime": 224730,
                      "data": "tìm"
                  },
                  {
                      "startTime": 224730,
                      "endTime": 225020,
                      "data": "đâu"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 227529,
                      "endTime": 228019,
                      "data": "Khát"
                  },
                  {
                      "startTime": 228029,
                      "endTime": 228519,
                      "data": "khao"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 228859,
                      "endTime": 229149,
                      "data": "Mong"
                  },
                  {
                      "startTime": 229159,
                      "endTime": 229729,
                      "data": "trở"
                  },
                  {
                      "startTime": 229729,
                      "endTime": 230089,
                      "data": "lại"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 230280,
                      "endTime": 232540,
                      "data": "Một ngày êm đềm"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 232540,
                      "endTime": 233360,
                      "data": "Ta cùng nhau "
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 233239,
                      "endTime": 233520,
                      "data": "Say"
                  },
                  {
                      "startTime": 233520,
                      "endTime": 233860,
                      "data": "sưa"
                  },
                  {
                      "startTime": 233879,
                      "endTime": 234070,
                      "data": "bước"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 234100,
                      "endTime": 234710,
                      "data": "Trên"
                  },
                  {
                      "startTime": 234710,
                      "endTime": 235220,
                      "data": "đường"
                  },
                  {
                      "startTime": 235259,
                      "endTime": 235759,
                      "data": "tình"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 236410,
                      "endTime": 236890,
                      "data": "Nắm"
                  },
                  {
                      "startTime": 236900,
                      "endTime": 237499,
                      "data": "tay"
                  },
                  {
                      "startTime": 237499,
                      "endTime": 237809,
                      "data": "nhau"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 238009,
                      "endTime": 238549,
                      "data": "Vui"
                  },
                  {
                      "startTime": 238549,
                      "endTime": 238939,
                      "data": "đùa"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 239049,
                      "endTime": 239620,
                      "data": "Rộn"
                  },
                  {
                      "startTime": 239630,
                      "endTime": 239970,
                      "data": "vang"
                  },
                  {
                      "startTime": 239970,
                      "endTime": 240559,
                      "data": "tiếng"
                  },
                  {
                      "startTime": 240559,
                      "endTime": 240890,
                      "data": "cười"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 241329,
                      "endTime": 241569,
                      "data": "Dìu"
                  },
                  {
                      "startTime": 241579,
                      "endTime": 241929,
                      "data": "nhau"
                  },
                  {
                      "startTime": 241929,
                      "endTime": 241949,
                      "data": "đi"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 242209,
                      "endTime": 242469,
                      "data": "Với"
                  },
                  {
                      "startTime": 242469,
                      "endTime": 242669,
                      "data": "những"
                  },
                  {
                      "startTime": 242679,
                      "endTime": 243079,
                      "data": "chiếc"
                  },
                  {
                      "startTime": 243079,
                      "endTime": 243119,
                      "data": "hôn"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 243309,
                      "endTime": 243859,
                      "data": "đầu"
                  },
                  {
                      "startTime": 243879,
                      "endTime": 244249,
                      "data": "tiên"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 245169,
                      "endTime": 245789,
                      "data": "Khát"
                  },
                  {
                      "startTime": 245799,
                      "endTime": 246279,
                      "data": "khao"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 246399,
                      "endTime": 246909,
                      "data": "Mong"
                  },
                  {
                      "startTime": 246929,
                      "endTime": 247559,
                      "data": "trở"
                  },
                  {
                      "startTime": 247589,
                      "endTime": 247779,
                      "data": "lại"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 248159,
                      "endTime": 248479,
                      "data": "Một"
                  },
                  {
                      "startTime": 248589,
                      "endTime": 248949,
                      "data": "ngày"
                  },
                  {
                      "startTime": 248949,
                      "endTime": 249519,
                      "data": "êm"
                  },
                  {
                      "startTime": 249519,
                      "endTime": 249809,
                      "data": "đềm"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 250300,
                      "endTime": 250520,
                      "data": "Ta"
                  },
                  {
                      "startTime": 250520,
                      "endTime": 250890,
                      "data": "cùng"
                  },
                  {
                      "startTime": 250890,
                      "endTime": 250910,
                      "data": "em"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 251009,
                      "endTime": 251300,
                      "data": "Say"
                  },
                  {
                      "startTime": 251300,
                      "endTime": 251670,
                      "data": "sưa"
                  },
                  {
                      "startTime": 251680,
                      "endTime": 251849,
                      "data": "bước"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 251879,
                      "endTime": 252569,
                      "data": "Trên"
                  },
                  {
                      "startTime": 252569,
                      "endTime": 252889,
                      "data": "đường"
                  },
                  {
                      "startTime": 252889,
                      "endTime": 252909,
                      "data": "về"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 254170,
                      "endTime": 254570,
                      "data": "Nước"
                  },
                  {
                      "startTime": 254700,
                      "endTime": 255100,
                      "data": "mắt"
                  },
                  {
                      "startTime": 255110,
                      "endTime": 255539,
                      "data": "rơi"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 255869,
                      "endTime": 256330,
                      "data": "Biết"
                  },
                  {
                      "startTime": 256330,
                      "endTime": 256710,
                      "data": "giờ"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 256869,
                      "endTime": 257400,
                      "data": "Chỉ"
                  },
                  {
                      "startTime": 257400,
                      "endTime": 257770,
                      "data": "là"
                  },
                  {
                      "startTime": 257780,
                      "endTime": 258329,
                      "data": "xa"
                  },
                  {
                      "startTime": 258359,
                      "endTime": 258640,
                      "data": "vời"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 259200,
                      "endTime": 259439,
                      "data": "Lòng"
                  },
                  {
                      "startTime": 259449,
                      "endTime": 259639,
                      "data": "chua"
                  },
                  {
                      "startTime": 259649,
                      "endTime": 259829,
                      "data": "xót"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 259949,
                      "endTime": 260270,
                      "data": "Thấy"
                  },
                  {
                      "startTime": 260270,
                      "endTime": 260639,
                      "data": "tiếc"
                  },
                  {
                      "startTime": 260639,
                      "endTime": 260679,
                      "data": "nuối"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 260809,
                      "endTime": 261170,
                      "data": "Những"
                  },
                  {
                      "startTime": 261170,
                      "endTime": 261669,
                      "data": "ngày"
                  },
                  {
                      "startTime": 261669,
                      "endTime": 261949,
                      "data": "qua"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 265949,
                      "endTime": 265979,
                      "data": "Biết"
                  },
                  {
                      "startTime": 265989,
                      "endTime": 266469,
                      "data": "tìm"
                  },
                  {
                      "startTime": 266469,
                      "endTime": 266499,
                      "data": "đâu"
                  }
              ]
          },
          {
              "words": [
                  {
                      "startTime": 276479,
                      "endTime": 277049,
                      "data": "Biết"
                  },
                  {
                      "startTime": 277049,
                      "endTime": 277689,
                      "data": "tìm"
                  },
                  {
                      "startTime": 281209,
                      "endTime": 281250,
                      "data": "đâu"
                  }
              ]
          }
      ],
      "file": "https://static-zmp3.zmdcdn.me/lyrics/2015/5/b/5b2634a74f665fbcd4c08242385afda7_1073760751.lrc",
      "enabledVideoBG": true,
      "defaultIBGUrls": [
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/3/c/0/5/3c05c10ae36f6361f9af0874bb7c4851.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/b/e/0/bbe01e4bf6d8e23101fcb6db44df311d.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/a/1/f/3/a1f34293d1dc92735be8c3f9082c4acf.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/e/9/5/6e95b598e1e14a187ee779bcd888e75c.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/1/c/8/1/1c81e957a6270eba91571d822a47e7c5.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/0/0/0/d/000d9d0679bbbb564a191a6801d7f19d.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/6/4/f/e64f4fd6f53caebabc1c26d592093cfa.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/e/3/1/de315c40b537d40b7409a6702f446631.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/1/4/6/2/1462efc7378bed3f98ace411e11eab45.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/5/b/f/a/5bfa05533ed7975035e69a4508c82fd6.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/f/2/b/1/f2b1b91fa64e0c354150c86fd96c249c.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/5/1/f/b/51fbcd4ae32096ffe2dd89cd36bb6ed9.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/2/3/9/62392463eab1eb1aaa2d1f3bd0f758bb.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/1/2/f/0/12f01e12d6e13e263ef76f3fdb65d66e.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/8/8/2/4/8824ef8e3e3aa3e302f03879a1f9d7d3.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/4/3/4/9/43491e9d95a9942015548bd2a061250d.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/9/8/7/5/987517940ce71a96bab9c0c88d5b6b95.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/8/e/2/4/8e24305fde744814083af980a593e8c2.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/f/1/2/7/f1270dd1bed79b527228e3351d2b67ae.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/0/a/3/0/0a301934881ee4e2de30dc8f41bc55f9.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/c/c/9/f/cc9fce8719364ba9d8a846984c590a0e.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/5/d/e/e5de86acd7567465f54a6b9307076947.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/4/b/b/64bb19c5f971b4e4f16f3bfdff64a396.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/0/3/2/0/03206606d461843e22451747a9b60769.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/d/4/4/bd4485d6dfef80764869a4d88d9b0475.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/8/6/8/e86817d147315d9d644835f60d17ae41.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/b/4/7/bb477f2f56f162b13426f70c9858c732.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/c/5/3/6/c536ff6ab992e36be24ca0adf8e86ae0.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/6/c/f/c/6cfc1e6e3b94c62cded257659602f00b.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/2/5/d/6/25d6adaa11b4e932d61309ed635d57fa.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/2/a/e/d2ae42243ccd4fec321fc60692a5a2dc.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/b/8/0/e/b80e5777c7eec332c882bf79bd692056.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/7/b/a/e7ba1207018f1d2fa7048598c7d627df.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/3/f/4/0/3f40bd0d6d8cbcf833c72ab050f19e6a.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/a/d/a/d/adad060e15f8409ec2e7670cf943c202.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/e/d/1/7/ed17742d63b635725e6071a9bee362c5.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/3/a/e/8/3ae816de233a9eae0116b4b5a21af43e.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/7/f/1/d7f15e3996e7923ffc2a64d1f8e43448.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/0/0/7/e/007e6b48696aab4a61ca46a10d980f63.jpg",
          "https://photo-resize-zmp3.zmdcdn.me/w1920_r3x2_jpeg/cover/d/9/f/5/d9f592437d80e358a76e32798ce2d294.jpg"
      ],
      "BGMode": 0
  },
  "timestamp": 1711011004211
}`;
lyric = JSON.parse(lyric);

var karaokeLyrics = document.querySelector(".karaoke-lyrics");
var firstSentence = karaokeLyrics.querySelector(".first-sentence");
var nextSentence = karaokeLyrics.querySelector(".next-sentence");
var sentences = lyric.data.sentences;
var sentenceA = "";
var sentenceB = "";
var count = 0;
var handleLyrics = function () {
  for (let i = 0; i < sentences.length; i++) {
    count++;
    if (count % 2 === 0) {
      sentenceB = "";
    } else {
      sentenceA = "";
    }
    if (
      audio.currentTime >= sentences[i].words[0].startTime / 1000 - 0.5 &&
      audio.currentTime <=
        sentences[i + 1].words[sentences[i + 1].words.length - 1].endTime / 1000
    ) {
      for (let j = 0; j < sentences[i].words.length; j++) {
        if (i === 0 || i % 2 === 0) {
          sentenceA += `${sentences[i].words[j].data} `;
        } else {
          sentenceB += `${sentences[i].words[j].data} `;
        }
      }
      firstSentence.innerText = sentenceA.trim();
      nextSentence.innerText = sentenceB.trim();
    } else if (
      audio.currentTime < sentences[0].words[0].startTime / 1000 - 1 ||
      audio.currentTime >
        sentences[sentences.length - 1].words[
          sentences[sentences.length - 1].words.length - 1
        ].endTime /
          1000 +
          1
    ) {
      firstSentence.innerText = `Bài hát: ${lyric.title}`;
      nextSentence.innerText = `Ca sỹ: ${lyric.singer}`;
    }
  }
};

audio.addEventListener("timeupdate", handleLyrics);
