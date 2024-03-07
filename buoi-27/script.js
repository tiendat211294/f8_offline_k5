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
  var todoList = document.querySelectorAll(".todo");
  var trashes = document.querySelectorAll(".fa-trash");
  for (let i = 0; i < trashes.length; i++) {
    trashes[i].addEventListener("click", function () {
      todoList[i].remove();
    });
  }

  //Sửa todo
  var edits = document.querySelectorAll(".fa-pen-to-square");
  var tasks = document.querySelectorAll(".task");
  for (let i = 0; i < edits.length; i++) {
    edits[i].addEventListener("click", function () {
      var check = tasks[i].innerText;
      todoList[i].outerHTML = `<form action="" class="todo-form">
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
        });
      }
    });
  }
});
