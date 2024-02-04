//Bài 1:
console.log(`Bài 1: Tìm số lớn nhất, nhỏ nhất và vị trí`);
var minMaxNumbers = [-1, 1, 2, 30, -4];
var max = 0;
var min = 0;
for (number in minMaxNumbers) {
  if (minMaxNumbers[number] % 1 !== 0) {
    console.log(`Số ${minMaxNumbers[number]} không phải số nguyên`);
    min = undefined;
    max = undefined;
    break;
  } else {
    if (max <= minMaxNumbers[number]) {
      max = minMaxNumbers[number];
    }
    if (min >= minMaxNumbers[number]) {
      min = minMaxNumbers[number];
    }
  }
}
if (min === undefined) {
  console.log(`Mời nhập lại số không hợp lệ`);
} else {
  console.log(`Số lớn nhất là: ${max} ở vị trí: ${minMaxNumbers.indexOf(max)}`);
  console.log(`Số nhỏ nhất là: ${min} ở vị trí: ${minMaxNumbers.indexOf(min)}`);
}

//Bài 2:
console.log(`Bài 2: Tính trung bình cộng các số nguyên tố`);
var integerNumbers = [-1, -3, 5, 10, 11, 20, 3];
var sum = 0;
var count = 0;
var primeNumbers = [];
for (number in integerNumbers) {
  if (integerNumbers[number] % 1 !== 0) {
    console.log(
      `Số ${integerNumbers[number]} không phải số nguyên, mời nhập số hợp lệ`
    );
  } else {
    var check = undefined;
    for (let i = 2; i < integerNumbers[number]; i++) {
      if (integerNumbers[number] % i === 0 && integerNumbers[number] > 1) {
        check = false;
        break;
      } else {
        check = true;
      }
    }
    if (check === true) {
      sum += integerNumbers[number];
      count++;
      primeNumbers[primeNumbers.length] = integerNumbers[number];
    }
  }
}
console.log(`Các số nguyên tố có trong mảng:`);
for (number of primeNumbers) {
  console.log(number);
}
console.log(`Trung bình cộng các số nguyên tố: ${sum / count}`);

//Bài 3:
console.log(`Bài 3: Lọc trùng`);
var randomArray = ["a", "b", "v", "a", 1, 2, 3, 1, 4];
var newArray = [];
var count = 0;
for (element of randomArray) {
  count += 1;
  if (randomArray.indexOf(element) === count - 1) {
    newArray[newArray.length] = element;
  }
}
console.log(`Mảng ban đầu là: ${randomArray}`);
console.log(`Mảng sau khi lọc trùng là: ${newArray}`);

//Bài 4:
