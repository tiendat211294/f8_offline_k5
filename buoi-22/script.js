//Bài 1:
console.log(`Bài 1: Lấy kết quả giao giữa 2 mảng`);
var arrA = [1, 2, "a", 3, 5, 2, 7, 4, 9, 10];
var arrB = [2, 4, 6, 4, "a", 8, 10];
var newArr = [];

arrA.forEach(function (elementA) {
  arrB.forEach(function (elementB) {
    if (elementA === elementB) {
      newArr.push(elementB);
    }
  });
});
newArr = newArr.filter(function (element, index) {
  if (index === newArr.indexOf(element)) {
    return true;
  }
});
console.log(`Mảng thứ nhất: ${arrA}`);
console.log(`Mảng thứ hai: ${arrB}`);
console.log(`Giao giữa 2 mảng: ${newArr}`);

//Bài 2:
console.log(``);
console.log(`Bài 2: Chuyển về mảng 1 chiều`);
var arrA = [1, 2, 3, [4, 5, 6, [7, [8, 9]]], 10];
var result = [];
function flatten(arr) {
  arr.forEach(function (arrElement) {
    if (Array.isArray(arrElement)) {
      flatten(arrElement);
    } else {
      result.push(arrElement);
    }
  });
  return result;
}
console.log(flatten(arrA));

//Bài 3:
console.log(``);
console.log(`Bài 3: Tách phần tử theo kiểu dữ liệu`);
var randomArr = [
  ["a", 1, true],
  ["b", 2, false],
  [null, undefined],
  [null, undefined],
];

//Làm phẳng
var flatArr = [];
function flat(arr) {
  arr.forEach(function (arrElement) {
    if (Array.isArray(arrElement)) {
      flat(arrElement);
    } else {
      flatArr.push(arrElement);
    }
  });
  return flatArr;
}
var newArr = flat(randomArr);

//Chia kiểu dữ liệu
var result = [];
newArr.forEach(function check(newArrElement) {
  var type = typeof newArrElement;
  if (!result[type]) {
    result[type] = [];
    result[result.length] = result[type];
    check(newArrElement);
  } else {
    result[type].push(newArrElement);
  }
  return result;
});
console.log(Array.from(result));

//Bài 4:
var arr = [
  [
    "Tiêu đề 1",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, optio?",
    "./images/random-pic.jpg",
  ],
  [
    "Tiêu đề 2",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, optio?",
    "./images/random-pic.jpg",
  ],
  [
    "Tiêu đề 3",
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, optio?",
    "./images/random-pic.jpg",
  ],
];
arr.forEach(function (data) {
  data.map(function (dataElement, index) {
    if (index === 0) {
      return document.write(`<div class="post"><div><h2>${dataElement}</h2>`);
    } else if (index === 1) {
      return document.write(`<p>${dataElement}</p></div>`);
    } else {
      document.write(`<img src="${dataElement}" alt=""></div>`);
    }
  });
});
