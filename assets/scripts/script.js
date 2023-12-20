const formInput = document.querySelector(".section-todo-creation--form-input");
const formBtn = document.querySelector(".section-todo-creation--form-btn");
const todosFilter = document.querySelector(".section-todo-filter--form-select");
const todoList = document.querySelector(".section-todo-production--list");
const emptyTodoListElement = document.querySelector(".empty-todo-list-element");
const errorParagraph = document.querySelector(".empty-input");
const todoAlreadyExistsParagraph = document.querySelector(".already-exists-todo");

if (!localStorage.todos) {
  localStorage.setItem("todos", "[]");
}

const createNewTodoElement = async(text) => {
  const newLi = document.createElement("li");
  const newDivForText = document.createElement("div");
  const newDivForBtns = document.createElement("div");
  const newH2 = document.createElement("h2");
  const newDeleteBtn = document.createElement("button");
  const newDoneBtn = document.createElement("button");
  const newImgX = document.createElement("img");
  const newImgCheckMark = document.createElement("img");

  newLi.classList.add("section-todo-production--list-item");
  newDivForText.classList.add("section-todo-production--list-item-text");
  newDivForBtns.classList.add("section-todo-production--list-item-btns");
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
  newDivForText.append(newH2);
  newDivForBtns.append(newDeleteBtn, newDoneBtn);
  newLi.append(newDivForText, newDivForBtns);
  todoList.append(newLi);

  newLi.scrollIntoView();
  newLi.classList.add("show-todo");

  localStorage.setItem("todos", JSON.stringify([...JSON.parse(localStorage.getItem("todos") || "[]"), { text: text, done: false }]));
};

function loadTodos() {
  if (JSON.parse(localStorage.getItem('todos') === '[]')) return;
  emptyTodoListElement.classList.add("invisible");
  let todos = Array.from(JSON.parse(localStorage.getItem('todos')));

  todos.forEach(todo => {
    const li = document.createElement('li');
    //replaced li.innerHTML with the code below: 
    li.classList.add(`section-todo-production--list-item`, todo.done ? 'finished-todo' : 'l', 'show-todo');
    const listItemText = document.createElement('div');
    listItemText.classList.add('section-todo-production--list-item-text');
  
    const h2 = document.createElement('h2');
    h2.textContent = todo.text;
  
    listItemText.appendChild(h2);
    li.appendChild(listItemText);
  
    const listItemBtns = document.createElement('div');
    listItemBtns.classList.add('section-todo-production--list-item-btns');
  
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    const deleteImg = document.createElement('img');
    deleteImg.setAttribute('src', './assets/images/x.svg');
    deleteImg.setAttribute('alt', 'x');
    deleteImg.setAttribute('width', '24');
    deleteBtn.appendChild(deleteImg);
  
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('done-btn');
    const doneImg = document.createElement('img');
    doneImg.setAttribute('src', './assets/images/check-mark.svg');
    doneImg.setAttribute('alt', 'check-mark');
    doneImg.setAttribute('width', '24');
    doneBtn.appendChild(doneImg);
  
    listItemBtns.appendChild(deleteBtn);
    listItemBtns.appendChild(doneBtn);
    li.appendChild(listItemBtns);
  
    todoList.appendChild(li);
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

const checkTodosAmount = async() => {
  const todos = document.querySelectorAll(".section-todo-production--list-item");
  if (todos.length === 0) {
    emptyTodoListElement.classList.add('hide');
    emptyTodoListElement.classList.remove("invisible");
    await loading(200);
    emptyTodoListElement.classList.remove('hide');
  }
  else {
    emptyTodoListElement.classList.remove('hide');
    emptyTodoListElement.classList.add("invisible");
  }
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
    console.log(todo);
    if (todo.nodeName === "LI" ) {
      if(todo.classList.contains('section-todo-production--list-item')) {
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
  if (!emptyTodoListElement.classList.contains('invisible')) {
    emptyTodoListElement.classList.add('remove-opacity');
    await loading(300);
    emptyTodoListElement.classList.remove('remove-opacity');
    emptyTodoListElement.classList.add("invisible");
  }

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