var todoInput = document.querySelector(".todo-input");
var data = "";
todoInput.addEventListener("keyup", function () {
  data = todoInput.value;
});

//Thêm todo list
var todoForm = document.querySelector(".todo-form");
var todoBtn = document.querySelector(".todo-btn");

todoBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var newTodo = document.createElement("div");
  newTodo.classList.add("todo");
  newTodo.innerHTML = `<p class="task">${data}</p><div><i class="fa-solid fa-pen-to-square"></i><i style="margin-left: 10px" class="fa-solid fa-trash"></i></div>`;
  if (data) {
    todoForm.insertAdjacentElement("afterend", newTodo);
  }
  todoInput.value = "";
  data = "";

  //Xóa todo
  var trashes = document.querySelectorAll(".fa-trash");
  function removeTodo(trashes) {
    trashes.forEach(function (trash) {
      trash.addEventListener("click", function () {
        trash.parentElement.parentElement.remove();
      });
    });
  }
  removeTodo(trashes);

  //Sửa todo
  var edits = document.querySelectorAll(".fa-pen-to-square");
  function editTodo(edits) {
    edits.forEach(function (edit) {
      edit.addEventListener("click", function (e) {
        var check = edit.parentElement.parentElement.innerText;
        edit.parentElement.parentElement.outerHTML = `<form action="" class="todo-form">
      <input type="text" placeholder="Update Task" class="todo-input" value="${check}"/>
      <button class="todo-btn">Add Task</button></form>`;
        var todoBtnList = document.querySelectorAll(".todo-btn");
        var todoInputs = document.querySelectorAll(".todo-input");
        var todoForms = document.querySelectorAll(".todo-form");
        for (let j = 1; j < todoBtnList.length; j++) {
          todoBtnList[j].addEventListener("click", function (e) {
            e.preventDefault();
            todoForms[
              j
            ].outerHTML = `<div class="todo"><p class="task">${todoInputs[j].value}</p>
          <div>
          <i class="fa-solid fa-pen-to-square"></i><i style="margin-left: 10px" class="fa-solid fa-trash"></i>
          </div>
          </div>`;
            trashes = document.querySelectorAll(".fa-trash");
            removeTodo(trashes);
            edits = document.querySelectorAll(".fa-pen-to-square");
            editTodo(edits);
          });
        }
      });
    });
  }
  editTodo(edits);
});
