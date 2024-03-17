var productTable = document.querySelector("#product_table");
var products = [
  {
    name: "Sản phẩm 1",
    price: "1000",
  },
  {
    name: "Sản phẩm 2",
    price: "2000",
  },
  {
    name: "Sản phẩm 3",
    price: "3000",
  },
];
var productIndex = 1;
var inputId = 1;
// var buttonId = 1;

//Tạo danh sách sản phẩm
var newProduct = {
  createElement: function (tag, attributes = {}, ...children) {
    var element = document.createElement(tag);
    if (children.length) {
      children.forEach(function (item) {
        element.append(item);
      });
    }
    if (Object.keys(attributes).length) {
      Object.keys(attributes).forEach(function (attribute) {
        var value = attributes[attribute];
        element[attribute] = value;
      });
    }
    return element;
  },
};

products.forEach(function (product) {
  var addProduct = newProduct.createElement(
    "tbody",
    {},
    newProduct.createElement(
      "tr",
      {},
      newProduct.createElement("td", {}, productIndex++),
      newProduct.createElement("td", {}, product.name),
      newProduct.createElement("td", {}, product.price),
      newProduct.createElement(
        "td",
        {},
        newProduct.createElement("input", {
          type: "number",
          id: "quantity_" + inputId++,
          value: "1",
          style: "display: block; width: 90%; margin: 0 auto",
        }),
        newProduct.createElement(
          "button",
          {
            type: "button",
            id: "add_to_cart",
            style: "width: 100%",
          },
          "Thêm vào giỏ"
        )
      )
    )
  );
  productTable.append(addProduct);
});

//Thêm vào giỏ hàng
var cartCount = 1;
var cart = [];
var addProductBtn = document.querySelectorAll("#add_to_cart");
addProductBtn.forEach(function (productBtn) {
  productBtn.addEventListener("click", function () {
    cart.push({
      id: cartCount++,
      name: productBtn.parentElement.previousElementSibling
        .previousElementSibling.innerText,
      quantity: productBtn.previousElementSibling.value,
      price: productBtn.parentElement.previousElementSibling.innerText,
    });
    console.log(cart);
  });
});

var cartData = document.querySelector("#cart_data");

if (!cart.length) {
  cartData.innerText = "Giỏ hàng không có sản phẩm";
}
