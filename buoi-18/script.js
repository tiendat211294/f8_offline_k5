//Bài 1:

document.write(`<h2>Bài 1: Tính tiền taxi</h2>`);
var km = 100;
var price = 0;
var discount = (price / 100) * 10;

if (km <= 1 && km > 0) {
  price = 15000;
} else if (km > 1 && km <= 5) {
  price = 13500 * km;
} else if (km > 5 && km <= 120) {
  price = 11000 * km;
} else if (km > 120) {
  price = 11000 * km - discount;
} else {
  price = "Không tồn tại";
}
console.log(price);
document.write(`<p>Số km là: ${km}km</br> Số tiền phải trả: ${price}đ</p>`);

//Bài 2:

document.write(`<h2>Bài 2: Tính tiền điện</h2>`);
var consume = 100;
var price = 0;
if (consume > 0 && consume <= 50) {
  price = 1678 * consume;
} else if (consume > 51 && consume <= 100) {
  price = 1734 * consume;
} else if (consume >= 101 && consume <= 200) {
  price = 2014 * consume;
} else if (consume >= 201 && consume <= 300) {
  price = 2536 * consume;
} else if (consume >= 301 && consume <= 400) {
  price = 2834 * consume;
} else if (consume > 401) {
  price = 2927 * consume;
} else price = "Không tồn tại";
console.log(price);
document.write(
  `<p>Số điện năng tiêu thụ: ${consume}kWh</br>Số tiền phải trả: ${price}đ</p>`
);

//Bài 3:

document.write(`<h2>Bài 3: Tính giá trị biểu thức</h2>`);
var n = -10;
var s = 0;
if (n > 0 && n % 1 === 0) {
  for (let i = 0; i <= n; i++) {
    s += i * (i + 1);
  }
  console.log(s);
} else {
  console.log("n không phải số nguyên");
}
document.write(`<p>Số n = ${n}</br>Tổng s = ${s}</p>`);

//Bài 4:

document.write(`<h2>Bài 4: Viết hàm kiểm tra số nguyên tố</h2>`);

function check(n) {
  var answer;
  var x = 10;
  if (n < 1 || n % 1 !== 0) {
    answer = `${n} Không phải số nguyên tố`;
  } else {
    for (let i = n - 1; i > 1; i--) {
      if (n % i === 0) {
        answer = `${n} Không phải số nguyên tố`;
        x = n;
        break;
      } else {
        x = 0;
      }
    }
  }
  if (x === 0) {
    answer = `${n} Là số nguyên tố`;
  }
  return answer;
}
document.write(`<p>Số ${check(50)}</p>`);

//Bài 5:

document.write(`<h2>Bài 5: Vẽ tam giác số</h2>`);
var n = 3;
var number = 0;
for (let row = 1; row <= n; row++) {
  for (let col = 1; col <= row; col++) {
    number++;
    document.write(`${number} `);
  }
  document.write(`</br>`);
}

//Bài 6:

document.write(`<h2>Bài 6: Vẽ bàn cờ vua</h2>`);

document.write(`<section>`);
for (let row = 1; row <= 8; row++) {
  for (let col = 1; col <= 4; col++) {
    if (row % 2 === 0) {
      var black = document.write(`<div class = "black"></div>`);
      var white = document.write(`<div class = "white"></div>`);
    } else {
      var white = document.write(`<div class = "white"></div>`);
      var black = document.write(`<div class = "black"></div>`);
    }
  }
  document.write(`</br>`);
}
document.write(`</section>`);

//Bài 7:

document.write(`<h2>Bài 7: Vẽ bảng cửu chương</h2>`);
for (let a = 1; a <= 10; a++) {
  for (let b = 1; b <= 10; b++) {
    var result = a * b;
    document.write(`${a} x ${b} = ${result}; `);
  }
  document.write(`</br>`);
}

//Bài 8:

document.write(`<h2>Bài 8: Tính giá trị biểu thức không dùng vòng lặp</h2>`);

var s = 0;
function sum(n) {
  if (n <= 0) {
    s = `${s}`;
    return;
  }
  s = s + 1 / n;
  sum(n - 1);
}
sum(3);
document.write(`S kết quả là: ${s}`);
