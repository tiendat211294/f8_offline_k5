var carousel = document.querySelector(".carousel");
var carouselImages = document.querySelector(".carousel-images");
var carouselNextBtn = document.querySelector(".carousel-nav .next");
var carouselPrevBtn = document.querySelector(".carousel-nav .prev");
var carouselItems = carouselImages.children;
var index = 0;

//Tính kích thước chiều rộng của 1 item
var itemWidth = carouselImages.clientWidth;

//Tính tổng kích thước các item
var totalWidth = itemWidth * carouselItems.length;

//Cập nhật css cho carousel-images
carouselImages.style.width = `${totalWidth}px`;

//Lắng nghe sự kiện click vào nút next, prev
var translateX = 0;
carouselNextBtn.addEventListener("click", function () {
  if (Math.abs(translateX) >= totalWidth - itemWidth) {
    return;
  }
  translateX -= itemWidth;
  carouselImages.style.translate = `${translateX}px`;
  index++;
  activeDot();
});
carouselPrevBtn.addEventListener("click", function () {
  if (Math.abs(translateX) < itemWidth) {
    return;
  }
  translateX += itemWidth;
  carouselImages.style.translate = `${translateX}px`;
  index--;
  activeDot();
});

//Tạo dots
var carouselDots = document.querySelector(".carousel-dots");
for (let i = 0; i < carouselItems.length; i++) {
  var dot = document.createElement("span");
  dot.classList.add("dot");
  carouselDots.appendChild(dot);
}
function activeDot() {
  for (let i = 0; i < carouselItems.length; i++) {
    carouselDots.children[i].classList.remove("active");
    if (i === index) {
      carouselDots.children[i].classList.add("active");
    }
  }
}
activeDot();

//Click dot
var carouselDotsElement = document.querySelectorAll(".dot");
for (let i = 0; i < carouselDotsElement.length; i++) {
  carouselDotsElement[i].addEventListener("click", function () {
    translateX = i * itemWidth * -1;
    carouselImages.style.translate = `${translateX}px`;
    index = i;
    activeDot();
  });
}

//Kéo thả image
var dragPosition = 0;
var x = 0;
var checkDrag = 0;
var carouselImagesElement = document.querySelectorAll(".item");

carouselImages.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
carouselImages.addEventListener("mousedown", function (e) {
  e.preventDefault();
  dragPosition = e.clientX;
  document.addEventListener("mousemove", handleDrag);

  carouselImages.style.cursor = "move";
});
carouselImages.addEventListener("mouseup", function () {
  document.removeEventListener("mousemove", handleDrag);
  carouselImages.style.transition = "0.3s translate linear";
  carouselImages.style.cursor = "";
  carouselImages.style.translate = `${translateX}px`;
});

var handleDrag = function (e) {
  x = e.clientX - dragPosition - index * itemWidth;
  if (
    (index === 0 && x > 0) ||
    (index === carouselItems.length - 1 && x + index * itemWidth < 0)
  ) {
    return;
  }
  carouselImages.style.transition = "none";
  carouselImages.style.translate = `${x}px`;
  if (Math.abs(x + index * itemWidth) >= itemWidth / 4) {
    carouselImages.style.transition = "0.3s translate linear";
    if (x + index * itemWidth > 0) {
      //Kéo sang trái
      translateX += itemWidth;
      index--;
      carouselImages.style.translate = `${translateX}px`;
      activeDot();
      document.removeEventListener("mousemove", handleDrag);
      carouselImages.style.cursor = "";
    } else if (x + index * itemWidth < 0) {
      //Kéo sang phải
      translateX -= itemWidth;
      index++;
      carouselImages.style.translate = `${translateX}px`;
      activeDot();
      document.removeEventListener("mousemove", handleDrag);
      carouselImages.style.cursor = "";
    }
  }
};
