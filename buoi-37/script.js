const tasksApi = `https://c9mjzh-3000.csb.app/task-list`;
const completedApi = `https://c9mjzh-3000.csb.app/completed-todo`;
const todoList = document.querySelector(".todo-list");
const completedList = document.querySelector(".completed-list");

const completedListBtn = document.querySelector(".completed-todos");
completedListBtn.addEventListener("click", () => {
  completedListBtn.classList.toggle("blur");
  completedList.classList.toggle("ghost");
});
const showTasks = async () => {
  const response = await fetch(tasksApi);
  const tasks = await response.json();
  renderTask(tasks);
};
showTasks();
const renderTask = (tasks) => {
  todoList.innerHTML = `
${tasks
  .map(
    ({ id, name }) => `
    <div class="todo-item">
      <span class="task-name">${name}</span>
      <div class="action-btn">
          <i data-id="${id}" data-type="delete" class="fa-solid fa-trash-can delete"></i>
          <i data-id="${id}" data-type="edit" class="fa-solid fa-pen-to-square edit"></i>
          <i data-id="${id}" data-type="move" class="fa-solid fa-check-to-slot move check"></i>
      </div>
    </div>
`
  )
  .join("")}
`;
  todoList.addEventListener("click", (e) => {
    if (e.target.dataset.type === "delete" && e.target.dataset.id) {
      if (confirm("Bạn có chắc chắn?")) {
        const taskId = e.target.dataset.id;
        deleteTask(taskId);
      }
    }
    if (e.target.dataset.type === "edit" && e.target.dataset.id) {
      todoBox.dataset.type = "edit";
      const taskId = e.target.dataset.id;
      (async (id) => {
        const response = await fetch(tasksApi + `/${id}`, {
          method: "GET",
        });
        const task = await response.json();
        todoInput.value = task.name;
        todoBox.classList.remove("ghost");
      })(taskId);
    }
  });
};

const deleteTask = async (id) => {
  const response = await fetch(tasksApi + `/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    showTasks();
  }
};

const editTask = async (id) => {
  if (todoBox.dataset.type === "edit") {
  }
};

const showCompletedTodo = async () => {
  const response = await fetch(completedApi);
  const tasks = await response.json();
  completedListBtn.children[0].innerText = tasks.length;
  renderCompletedTodo(tasks);
};
showCompletedTodo();
const renderCompletedTodo = (tasks) => {
  completedList.innerHTML = `
${tasks
  .map(
    ({ id, name }) => `
    <div class="todo-item">
      <span class="task-name">${name}</span>
      <div class="action-btn">
          <i data-id="${id}" data-type="delete" class="fa-solid fa-trash-can delete"></i>
          <i data-id="${id}" data-type="edit" class="fa-solid fa-pen-to-square edit"></i>
          <i data-id="${id}" data-type="move" class="fa-solid fa-check-to-slot move checked"></i>
      </div>
    </div>
`
  )
  .join("")}
`;
  completedList.addEventListener("click", (e) => {
    if (e.target.dataset.type === "delete" && e.target.dataset.id) {
      if (confirm("Bạn có chắc chắn?")) {
        const todoId = e.target.dataset.id;
        deleteTodo(todoId);
      }
    }
    if (e.target.dataset.type === "edit" && e.target.dataset.id) {
      todoBox.classList.remove("ghost");
      todoBox.dataset.type = "edit";
    }
  });
};
const deleteTodo = async (id) => {
  const response = await fetch(completedApi + `/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    showCompletedTodo();
  }
};

const addTodoBtn = document.querySelector(".add-todo");
const cancelBtn = document.querySelector(".cancel");
const saveBtn = document.querySelector(".save");
const todoBox = document.querySelector(".add-todo-box");
const todoInput = todoBox.querySelector("input");
addTodoBtn.addEventListener("click", () => {
  todoBox.classList.remove("ghost");
  todoBox.dataset.type = "add";
});
cancelBtn.addEventListener("click", () => {
  todoBox.classList.add("ghost");
});

saveBtn.addEventListener("click", () => {
  if (todoBox.dataset.type === "add") {
    const newTask = todoInput.value;
    if (newTask) {
      addTask(newTask);
    }
    todoBox.classList.add("ghost");
    todoInput.value = "";
  }
  if (todoBox.dataset.type === "edit") {
  }
});

const addTask = async (data) => {
  let newData = {
    name: data,
  };
  const response = await fetch(tasksApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  if (response.ok) {
    showTasks();
  }
};
