const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;

const grammar = "#JSGF V1.0;";

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "vi-VN";
recognition.interimResults = false;
const btn = document.querySelector(".btn");
const message = document.querySelector(".message");

btn.onclick = () => {
  recognition.start();
  btn.classList.add("ghost");
  message.style.display = "block";
};

// Xử lý sự kiện kết quả
recognition.onresult = (event) => {
  const text = event.results[0][0].transcript;
  const textValue = text.toLowerCase();
  if (textValue.includes("facebook")) {
    if (confirm(`Có phải bạn muốn: ${text} ?`)) {
      window.open("https://www.facebook.com", "_blank");
    }
  } else if (
    textValue.includes("google") &&
    !textValue.slice(textValue.indexOf("google") + 7)
  ) {
    if (confirm(`Có phải bạn muốn: ${text} ?`)) {
      window.open("https://www.google.com", "_blank");
    }
  } else if (textValue.includes("youtube")) {
    if (confirm(`Có phải bạn muốn: ${text} ?`)) {
      window.open("https://www.youtube.com", "_blank");
    }
  } else if (textValue.includes("google drive")) {
    if (confirm(`Có phải bạn muốn: ${text} ?`)) {
      window.open("https://www.drive.google.com", "_blank");
    }
  } else if (textValue.includes("google map")) {
    if (confirm(`Có phải bạn muốn: ${text} ?`)) {
      window.open(
        "https://www.google.com/maps/@21.0223341,105.8270062,13z?hl=vi-VN&entry=ttu",
        "_blank"
      );
    }
  } else if (textValue.includes("bài hát")) {
    if (confirm(`Có phải bạn muốn: ${text} ?`)) {
      let songName = textValue.slice(textValue.indexOf("bài hát") + 8);
      window.open(`https://zingmp3.vn/tim-kiem/tat-ca?q=${songName}`, "_blank");
    }
  } else if (textValue.includes("video")) {
    if (confirm(`Có phải bạn muốn: ${text} ?`)) {
      let videoName = textValue.slice(textValue.indexOf("video") + 6);
      window.open(
        `https://www.youtube.com/results?search_query=${videoName}`,
        "_blank"
      );
    }
  } else if (textValue.includes("tới")) {
    if (confirm(`Có phải bạn muốn: ${text} ?`)) {
      let location = textValue.slice(textValue.indexOf("tới") + 4);
      window.open(`https://google.com/maps/search/${location}`, "_blank");
    }
  } else {
    if (confirm(`Có phải bạn muốn: ${text} ?`)) {
      alert(`Không thực hiện được yêu cầu: ${text}`);
    }
  }
};

// Dừng nhận diện khi giọng nói kết thúc
recognition.onspeechend = () => {
  recognition.stop();
  btn.classList.remove("ghost");
  message.style.display = "none";
};
