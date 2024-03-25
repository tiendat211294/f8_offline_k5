var list = document.querySelector(".list");
var listItems = list.querySelectorAll(".list-item");

for (let i = 0; i < listItems.length; i++) {
  var currentElement;
  var dragElement;
  listItems[i].addEventListener("dragstart", function (e) {
    e.currentTarget.classList.add("ghost");
    dragElement = e.currentTarget;
    currentElement = e.currentTarget.getBoundingClientRect();
  });
  listItems[i].addEventListener("dragend", function (e) {
    e.currentTarget.classList.remove("ghost");
    var lessonCount = 0;
    var chapterCount = 0;
    listItems = list.querySelectorAll(".list-item");
    listItems.forEach(function (item) {
      if (item.classList.contains("active")) {
        chapterCount++;
        item.childNodes[1].childNodes[0].innerText = `Chương ${chapterCount}:`;
      } else {
        lessonCount++;
        item.childNodes[1].childNodes[0].innerText = `Bài ${lessonCount}:`;
      }
    });
  });
  listItems[i].addEventListener("dragover", function (e) {
    var tempElement = e.currentTarget.getBoundingClientRect();
    if (currentElement.top > tempElement.top + tempElement.height / 2) {
      list.insertBefore(dragElement, e.currentTarget);
    } else if (currentElement.bottom < tempElement.bottom) {
      list.insertBefore(dragElement, e.currentTarget.nextElementSibling);
    }
  });
}
