//Bài 1:

var a = 5;
var b = 7;
var c = 0;

console.log(`số ban đầu: ${a} , ${b}`);

c = a;
a = b;
b = c;

console.log(`số sau hoán vị: ${a} , ${b} `);

//Bài 2:

var s = 10 + 20 + 5 ** 10 / 2;
console.log(`s = ${s}`);

//Bài 3:

var a = 10;
var b = 110;
var c = 11;
var max = 0;

if (a >= b && a >= c) {
  max = a;
}
if (b >= a && b >= c) {
  max = b;
}
if (c >= a && c >= b) {
  max = c;
}

console.log(`số lớn nhất là ${max}`);

//Bài 4:

var a = -10;
var b = -100;

if (a * b > 0) {
  console.log(`hai số cùng dấu`);
} else if (a * b < 0) {
  console.log(`hai số khác dấu`);
} else {
  console.log(`có số 0`);
}

//Bài 5:

var a = 3;
var b = -5;
var c = 10;
var x = 0;
console.log(`Thứ tự ban đầu: ${a}, ${b}, ${c}`);

if (b <= a) {
  x = a;
  a = b;
  b = x;
}
if (c <= b) {
  x = b;
  b = c;
  c = x;
}
if (b <= a) {
  x = a;
  a = b;
  b = x;
}

console.log(`Thứ tự tăng dần: ${a}, ${b}, ${c}`);
