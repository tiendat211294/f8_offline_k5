var list = document.querySelector(".list");
var listItems = list.querySelectorAll(".list-item");

for (let i = 0; i < listItems.length; i++) {
  var offsetY = 0;
  var newNode = listItems[i];
  listItems[i].addEventListener("dragstart", function () {
    listItems[i].classList.add("ghost");
    newNode.classList.add("ghost");
    document.addEventListener("mousemove", function (e) {
      offsetY = e.offsetY;
    });
    console.log(offsetY, listItems[i].offsetTop);
    if (offsetY > listItems[i].offsetTop) {
      list.insertBefore(listItems[i], newNode);
    } else if (offsetY < listItems[i].offsetTop) {
      list.insertBefore(listItems[i + 1], newNode);
    }
  });
  listItems[i].addEventListener("dragend", function (e) {
    listItems[i].classList.remove("ghost");
  });
}
