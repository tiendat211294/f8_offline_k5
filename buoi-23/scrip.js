//Bài 1:
console.log("Bài 1:");
var errors = {
  name: {
    required: "Vui lòng nhập họ tên",
    min: "Họ tên phải từ 5 ký tự",
  },
  email: {
    email: "Định dạng email không hợp lệ",
    unique: "Email đã có người sử dụng",
    required: "Vui lòng nhập địa chỉ email",
  },
  password: {
    required: "Vui lòng nhập mật khẩu",
    same: "Mật khẩu phải khớp với mật khẩu nhập lại",
  },
};

function getError(field) {
  for (var key in errors) {
    if (field === key) {
      return console.log(errors[key].required);
    } else if (field.includes(".")) {
      for (var innerKey in errors[key]) {
        if (
          field.slice(0, field.indexOf(".")) === key &&
          field.slice(field.indexOf(".") + 1) === innerKey
        ) {
          return console.log(errors[key][innerKey]);
        }
      }
    }
  }
  return console.log("Không hợp lệ");
}
getError("email.email");

//Bài 2:
console.log("Bài 2:");
function Customer(name, age, address) {
  var user = this;
  user.name = name;
  user.age = age;
  user.address = address;
  return user;
}
var customers = [];
customers.push(new Customer("Nguyễn Văn A", 11, "Hà Nội"));
customers.push(new Customer("Nguyễn Văn B", 2, "Hải Phòng"));
customers.push(new Customer("Nguyễn Văn C", 12, "TP.HCM"));

function createCustomers(customers) {
  const sortCustomers = customers.sort(function (a, b) {
    if (a.age >= b.age) {
      return 1;
    }
    return -1;
  });
  for (var customer of sortCustomers) {
    customer.shortName =
      customer.name.slice(0, customer.name.indexOf(" ")) +
      customer.name.slice(customer.name.lastIndexOf(" "));
  }
  return sortCustomers;
}
const result = createCustomers(customers);
console.log(result);

//Bài 3:
console.log("Bài 3:");
var usersData = [];
function handleRegister(name, password, email) {
  var user = {
    name: name,
    password: password,
    email: email,
  };
  if (user.name.length < 5) {
    return console.log("Tên phải từ 5 ký tự");
  }
  if (user.password === "") {
    return console.log("Mật khẩu không hợp lệ");
  }
  if (!user.email.includes("@")) {
    return console.log("Email không hợp lệ");
  }
  user.role = "user";
  usersData.push(user);
  return user;
}
var userA = handleRegister("Nguyen Van A", "123456", "nguyenvana@email.com");
var userB = handleRegister("Nguyen Van B", "1234567", "nguyenvanb@email.com");
var userC = handleRegister("Nguyen Van C", "12345678", "nguyenvanc@email.com");

function handleLogin(email, password) {
  for (user of usersData) {
    if (user.email === email && user.password === password) {
      return console.log("Thông tin người dùng:", user);
    }
  }
  return console.log("Thông tin đăng nhập không hợp lệ");
}
handleLogin("nguyenvana@email.com", "123456");
