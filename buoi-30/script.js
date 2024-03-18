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
    if (!cart.length) {
      cart.push({
        id: cartCount++,
        name: productBtn.parentElement.previousElementSibling
          .previousElementSibling.innerText,
        quantity: Number(productBtn.previousElementSibling.value),
        price: productBtn.parentElement.previousElementSibling.innerText,
      });
    } else {
      var check = 0;
      cart.forEach(function (item) {
        check++;
        if (
          item.name ===
          productBtn.parentElement.previousElementSibling.previousElementSibling
            .innerText
        ) {
          item.quantity += Number(productBtn.previousElementSibling.value);
          check--;
        } else {
          if (check === cart.length) {
            cart.push({
              id: cartCount++,
              name: productBtn.parentElement.previousElementSibling
                .previousElementSibling.innerText,
              quantity: Number(productBtn.previousElementSibling.value),
              price: productBtn.parentElement.previousElementSibling.innerText,
            });
          }
        }
      });
    }
    cartData.innerText = "";
    createCart();
  });
});
var createCart = function () {
  cartData.innerHTML =
    '<table width="100%" border="1" id="cart_table" cellpadding="0" cellspacing="0"></table>';
  var addCart = newProduct.createElement(
    "thead",
    {},
    newProduct.createElement(
      "tr",
      {},
      newProduct.createElement("th", { width: "5%" }, "STT")
    )
  );
  console.log(cartData.children);
  //   cartData.children.append(addCart);
};

var cartData = document.querySelector("#cart_data");
