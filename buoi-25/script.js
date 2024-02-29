//Bài 1:
console.log("Bài 1:");
function sumNumbers(...numbers) {
  var result = 0;
  if (numbers.length === 0) {
    return "Mời nhập dữ liệu!";
  }
  for (var number of numbers) {
    var check = Number(number);
    if (isNaN(check) || Math.abs(check) === Infinity || Array.isArray(check)) {
      return `${number} không hợp lệ`;
    }
    result += check;
  }
  return result;
}
console.log(sumNumbers(1, 2, 3, 4, 5));

//Bài 2:
console.log("Bài 2:");
var price = "123456";
Object.prototype.getCurrency = function (unit) {
  if (Array.isArray(this) || this.constructor.name === "Boolean") {
    return "Số không hợp lệ";
  }
  var value = Number(this);
  if (
    isNaN(value) ||
    Math.abs(value) === Infinity ||
    typeof value !== "number"
  ) {
    return "Số không hợp lệ";
  }
  return value.toLocaleString("en-US") + " " + unit;
};
console.log(price.getCurrency("đ"));

//Bài 3:
console.log("Bài 3:");
Array.prototype.push2 = function (...arguments) {
  var result = this;
  for (var argument of arguments) {
    result[result.length] = argument;
  }
  return result;
};
var arr = ["a"];
arr.push2(5, 6, 7, null);
console.log(arr);

//Bài 4:
console.log("Bài 4:");
Array.prototype.filter2 = function (callback) {
  var result = [];
  for (let i = 0; i < this.length; i++) {
    var check = callback(this[i], i, this);
    if (check) {
      result.push(this[i]);
    }
  }
  return result;
};
var arr = [1, 2, 3, 4, 5];
var result = arr.filter2(function (number) {
  if (number % 2 !== 0) {
    return true;
  }
});
console.log(result);

//Bài 5:
console.log("Bài 5:");
var categories = [
  {
    id: 1,
    name: "Chuyên mục 1",
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    children: [
      {
        id: 4,
        name: "Chuyên mục 2.1",
      },
      {
        id: 5,
        name: "Chuyên mục 2.2",
        children: [
          {
            id: 10,
            name: "Chuyên mục 2.2.1",
          },
          {
            id: 11,
            name: "Chuyên mục 2.2.2",
          },
          {
            id: 12,
            name: "Chuyên mục 2.2.3",
          },
        ],
      },
      {
        id: 6,
        name: "Chuyên mục 2.3",
      },
    ],
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    children: [
      {
        id: 7,
        name: "Chuyên mục 3.1",
      },
      {
        id: 8,
        name: "Chuyên mục 3.2",
      },
      {
        id: 9,
        name: "Chuyên mục 3.3",
      },
    ],
  },
];
var result = `<option value="0">Chọn chuyên mục</option>`;
var value = 0;
function convertToHtml(data, level = "") {
  for (let i = 0; i < data.length; i++) {
    value++;
    if (!data[i].children) {
      result += `<option value="${value}">${level}${data[i].name}</option>`;
    } else {
      result += `<option value="${value}">${level}${data[i].name}</option>`;
      convertToHtml(data[i].children, level + "--|");
    }
  }
  return result;
}

var content = document.getElementById("selections");
content.innerHTML = convertToHtml(categories);
