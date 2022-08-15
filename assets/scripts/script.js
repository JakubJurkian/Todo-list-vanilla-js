const formInput = document.querySelector(".section-todo-creation--form-input");
const formBtn = document.querySelector(".section-todo-creation--form-btn");
const todosFilter = document.querySelector(".section-todo-filter--form-select");
const todoList = document.querySelector(".section-todo-production--list");
const emptyTodoListText = document.querySelector(".empty-todo-list-text");
const errorParagraph = document.querySelector(".empty-input");
const todoAlreadyExistsParagraph = document.querySelector(".already-exists-todo");

if (!localStorage.todos) {
  localStorage.setItem("todos", "[]");
}

const createNewTodoElement = async(text) => {
  const newLi = document.createElement("li");
  const newDivWithText = document.createElement("div");
  const newDivWithBtns = document.createElement("div");
  const newH2 = document.createElement("h2");
  const newDeleteBtn = document.createElement("button");
  const newDoneBtn = document.createElement("button");
  const newImgX = document.createElement("img");
  const newImgCheckMark = document.createElement("img");

  newLi.classList.add("section-todo-production--list-item");
  newDivWithText.classList.add("section-todo-production--list-item-text");
  newDivWithBtns.classList.add("section-todo-production--list-item-btns");
  newDeleteBtn.classList.add("delete-btn");
  newDoneBtn.classList.add("done-btn");

  newImgX.src = "./assets/images/x.svg";
  newImgX.width = "24";
  newImgX.alt = "x";
  newImgCheckMark.src = "./assets/images/check-mark.svg";
  newImgCheckMark.width = "24";
  newImgCheckMark.alt = "check-mark";

  newH2.append(text);
  newDeleteBtn.append(newImgX);
  newDoneBtn.append(newImgCheckMark);
  newDivWithText.append(newH2);
  newDivWithBtns.append(newDeleteBtn, newDoneBtn);
  newLi.append(newDivWithText, newDivWithBtns);
  todoList.append(newLi);

  newLi.scrollIntoView();
  newLi.classList.add("show-todo");

  localStorage.setItem("todos", JSON.stringify([...JSON.parse(localStorage.getItem("todos") || "[]"), { text: text, done: false }]));
};

function loadTodos() {
  if (JSON.parse(localStorage.getItem('todos') === '[]')) return;
  emptyTodoListText.classList.add("invisible");
  let todos = Array.from(JSON.parse(localStorage.getItem('todos')));

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.classList.add(`section-todo-production--list-item`, todo.done ? 'finished-todo' : 'l', 'show-todo');
    li.innerHTML = `
    <div class="section-todo-production--list-item-text">
      <h2>${todo.text}</h2>
    </div>
    <div class="section-todo-production--list-item-btns">
      <button class="delete-btn"><img src="./assets/images/x.svg" alt="x" width="24" /></button>
      <button class="done-btn"><img src="./assets/images/check-mark.svg" alt="check-mark" width="24" /></button>
    </div>`;
    todoList.append(li);
  });
  addDoneTodoOption();
  addDeleteTodoOption();
}

const loading = (miliseconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
};

const checkTodosAmount = () => {
  const todos = document.querySelectorAll(".section-todo-production--list-item");
  if (todos.length === 0) emptyTodoListText.classList.remove("invisible");
};

const addDeleteTodoOption = () => {
  const todoListDeleteBtns = document.querySelectorAll(".delete-btn");

  for (let i = 0; i < todoListDeleteBtns.length; i++) {
    todoListDeleteBtns[i].addEventListener("click", async function () {
      this.parentNode.parentNode.classList.add("removed-todo");

      const todos = Array.from(JSON.parse(localStorage.getItem("todos")));
      const todoText = this.parentNode.parentNode.children[0].children[0].textContent;
      todos.forEach(function(todo) {
        if (todo.text === todoText) {
          todos.splice(todos.indexOf(todo), 1);
        }
      });
      localStorage.setItem("todos", JSON.stringify(todos));

      await loading(600);
      this.parentNode.parentNode.remove();
      checkTodosAmount();
    });
  }
};

const addDoneTodoOption = () => {
  const todoListDoneBtns = document.querySelectorAll(".done-btn");
  
  for (let i = 0; i < todoListDoneBtns.length; i++) {
    todoListDoneBtns[i].addEventListener("click", function () {
      this.parentNode.parentNode.classList.add("finished-todo");
      const todoText = this.parentNode.parentNode.children[0].children[0].textContent;
      let todos = Array.from(JSON.parse(localStorage.getItem("todos")));
      todos.forEach(todo => {
        if (todo.text === todoText) todo.done = true;
      });
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  }
};

function filterTodos(event) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    if (todo.nodeName === "LI") {
      switch (event.target.value) {
        case "all-todos":
          todo.style.display = "flex";
          break;
        case "done-todos":
          if (todo.classList.contains("finished-todo")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;

        case "undone-todos":
          if (todo.classList.contains("finished-todo")) {
            todo.style.display = "none";
          } else {
            todo.style.display = "flex";
          }
          break;
      }
    }
  });
}

formBtn.addEventListener("click", async(event) => {
  event.preventDefault();
  if (!formInput.value.trim()) {
    errorParagraph.classList.add("error-text");
    await loading(0);
    errorParagraph.classList.add('show');
    if (todoAlreadyExistsParagraph.classList.contains("error-text")) {
      todoAlreadyExistsParagraph.classList.remove("error-text");
      todoAlreadyExistsParagraph.classList.remove('show');
    }
    return;
  }

  const todoText = formInput.value;
  formInput.value = "";

  let todos = Array.from(JSON.parse(localStorage.getItem("todos")));
  let todoExists = null;
  
  todos.forEach(todo => {
    if (todo.text === todoText) todoExists = true;
  });

  if(todoExists) {
    todoAlreadyExistsParagraph.classList.add("error-text");
    await loading(0);
    todoAlreadyExistsParagraph.classList.add('show');
    return;
  }

  emptyTodoListText.classList.add("invisible");
  createNewTodoElement(todoText);
  addDeleteTodoOption();
  addDoneTodoOption();
});

formInput.addEventListener("input", async() => {
  if (errorParagraph.classList.contains("error-text")) {
    errorParagraph.classList.remove('show');
    await loading(300);
    errorParagraph.classList.remove("error-text");
  }
  if (todoAlreadyExistsParagraph.classList.contains("error-text")) {
    todoAlreadyExistsParagraph.classList.remove('show');
    await loading(300);
    todoAlreadyExistsParagraph.classList.remove("error-text");
  }
});

todosFilter.addEventListener("change", filterTodos);

window.addEventListener('load', loadTodos);