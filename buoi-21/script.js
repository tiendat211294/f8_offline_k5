//Bài 1:
console.log(`Bài 1: Tìm số lớn nhất, nhỏ nhất và vị trí`);
var minMaxNumbers = [-1, 1, 0, 30, -4];
var max = 0;
var min = 0;
for (number in minMaxNumbers) {
  if (
    minMaxNumbers[number] % 1 !== 0 ||
    typeof minMaxNumbers[number] !== "number"
  ) {
    console.log(`${minMaxNumbers[number]} không hợp lệ`);
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
console.log(``);
console.log(`Bài 2: Tính trung bình cộng các số nguyên tố`);
var integerNumbers = [-1, -3, 5, 10, 11, 20, 3];
var sum = 0;
var count = 0;
var primeNumbers = [];
for (number in integerNumbers) {
  if (
    integerNumbers[number] % 1 !== 0 ||
    typeof integerNumbers[number] !== "number"
  ) {
    console.log(
      `${integerNumbers[number]} không phải số nguyên hoặc không phải số, mời nhập số hợp lệ`
    );
    primeNumbers = [];
    sum = null;
    count = null;
    break;
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
console.log(``);
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
console.log(``);
console.log(`Bài 4: Sắp xếp rồi chèn`);
var randomArray = [11, 2, 3, 5, 2, 4, 65, 1, 77];
console.log(`Mảng ban đầu: ${randomArray}`);

//Sắp xếp:
for (number of randomArray) {
  if (number % 1 !== 0 || typeof number !== "number") {
    console.log(
      `${number} không phải số nguyên hoặc không phải số, mời nhập số khác`
    );
    randomArray = [];
    break;
  } else {
    for (let i = 0; i < randomArray.length - 1; i++) {
      let indexOfMin = i;
      for (let j = i + 1; j < randomArray.length; j++) {
        if (randomArray[j] < randomArray[indexOfMin]) indexOfMin = j;
      }
      let x = randomArray[i];
      randomArray[i] = randomArray[indexOfMin];
      randomArray[indexOfMin] = x;
    }
  }
}
console.log(`Mảng sau khi sắp xếp: ${randomArray}`);

//Chèn số:
var newNumber = 10;
var newArray = [];
if (typeof newNumber !== "number") {
  console.log(`${newNumber} không hợp lệ`);
} else if (newNumber > randomArray[randomArray.length - 1]) {
  newArray = randomArray;
  newArray[newArray.length] = newNumber;
} else if (newNumber <= randomArray[0]) {
  newArray = [newNumber];
  for (number of randomArray) {
    newArray[newArray.length] = number;
  }
} else {
  for (index in randomArray) {
    if (newNumber <= randomArray[index] && newNumber > randomArray[index - 1]) {
      newArray[newArray.length] = newNumber;
      newArray[newArray.length] = randomArray[index];
    } else {
      newArray[newArray.length] = randomArray[index];
    }
  }
}
console.log(`Số cần chèn: ${newNumber}`);
console.log(`Mảng sau khi chèn: ${newArray}`);
