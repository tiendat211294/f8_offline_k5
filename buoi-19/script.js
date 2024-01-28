//Bài 1:Dãy Fibonacci:

console.log(`Dãy Fibonacci:`);

var n = 10;
var n1 = 0;
var n2 = 1;
var next = 0;
function getFibonacci(n) {
  if (n > 2 && n % 1 === 0) {
    next = n1 + n2;
    n1 = n2;
    n2 = next;
    console.log(next);
    getFibonacci(n - 1);
  }
}
if (n === 1) {
  console.log(n1);
} else if (n === 2) {
  console.log(n1);
  console.log(n2);
} else if (n > 2 && n % 1 === 0) {
  console.log(n1);
  console.log(n2);
  console.log(getFibonacci(n));
} else {
  console.log(`Số ${n} không hợp lệ`);
}

//Bài 2:Đảo số nguyên:

console.log(`Đảo số nguyên:`);

function reverseNumber(n) {
  if (n >= 0 && n % 1 === 0) {
    var x = String(n);
    var newString = "";
    for (let i = x.length - 1; i >= 0; i--) {
      newString += x[i];
    }
    return Number(newString);
  } else if (n < 0 && n % 1 === 0) {
    var x = String(-n);
    var newString = "";
    for (let i = x.length - 1; i >= 0; i--) {
      newString += x[i];
    }
    return -Number(newString);
  } else {
    return console.log(`${n} Không phải số nguyên`);
  }
}
console.log(reverseNumber(12345));

//Bài 3:Đổi số thành chữ:

console.log(`Đổi số thành chữ:`);

function switchNumber(n) {
  if (n < 0 || n > 9999) {
    return console.log(`Số ${n} Không hợp lệ`);
  } else {
    var x = String(n);
    var newString = "";
    for (let i = 0; i <= x.length - 1; i++) {
      var letter = x[i];
      switch (letter) {
        case "1":
          letter = "một ";
          break;
        case "2":
          letter = "hai ";
          break;
        case "3":
          letter = "ba ";
          break;
        case "4":
          letter = "bốn ";
          break;
        case "5":
          letter = "năm ";
          break;
        case "6":
          letter = "sáu ";
          break;
        case "7":
          letter = "bảy ";
          break;
        case "8":
          letter = "tám ";
          break;
        case "9":
          letter = "chín ";
          break;
        case "0":
          letter = "không ";
          break;
      }
      newString += letter;
    }
  }
  return newString;
}
console.log(switchNumber(1234));
