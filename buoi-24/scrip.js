//Bài 1:
console.log("Bài 1:");
function sumNumbers(...numbers) {
  var result = 0;
  for (var number of numbers) {
    if (typeof number !== "number" || number === NaN) {
      return `${number} không hợp lệ`;
    }
    result += number;
  }
  return result;
}
console.log(sumNumbers(1, 2, 3, 4, 5));

//Bài 2:
console.log("Bài 2:");
var price = "90000";
Object.prototype.getCurrency = function (unit) {
  var result = "";
  if (Number(this) > 999) {
    var toString = String(this);
    for (let i = toString.length - 3; i > 0; i -= 3) {
      result = toString.slice(0, i) + "," + toString.slice(i);
      toString = result;
    }
    return result + " " + unit;
  } else if (Number(this) <= 999 && Number(this) > 0) {
    result = this;
    return result + " " + unit;
  } else {
    return "Không hợp lệ";
  }
};
console.log(price.getCurrency("đ"));

//Bài 3:
console.log("Bài 3:");

var input = [
  {
    id: 1,
    name: "Chuyên mục 1",
    parent: 0,
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    parent: 0,
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    parent: 0,
  },
  {
    id: 4,
    name: "Chuyên mục 2.1",
    parent: 2,
  },
  {
    id: 5,
    name: "Chuyên mục 2.2",
    parent: 2,
  },
  {
    id: 6,
    name: "Chuyên mục 2.3",
    parent: 2,
  },
  {
    id: 7,
    name: "Chuyên mục 3.1",
    parent: 3,
  },
  {
    id: 8,
    name: "Chuyên mục 3.2",
    parent: 3,
  },
  {
    id: 9,
    name: "Chuyên mục 3.3",
    parent: 3,
  },
  {
    id: 10,
    name: "Chuyên mục 2.2.1",
    parent: 5,
  },
  {
    id: 11,
    name: "Chuyên mục 2.2.2",
    parent: 5,
  },
];

function buildTree(arr, parentId = 0) {
  var result = [];
  for (let item of arr) {
    if (item.parent === parentId) {
      var children = buildTree(arr, item.id);
      if (children.length) {
        item.children = children;
      }
      delete item.parent;
      result.push(item);
    }
  }
  return result;
}
console.log(buildTree(input));
0;

//Bài 4:
console.log("Bài 4:");
Array.prototype.reduce2 = function (callback, initialValue) {
  var index = 0;
  var value = initialValue;
  if (!initialValue) {
    value = this[0];
    index = 1;
  }
  for (; index < this.length; index++) {
    value = callback.call(this, value, this[index], index);
  }
  return value;
};
var arr = [1, 2, 3, 4, 5];
console.log(
  arr.reduce2(function (a, b) {
    return a + b;
  })
);
