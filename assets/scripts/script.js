const formBtn = document.querySelector(".section-todo-creation--form-btn");
const formInput = document.querySelector(".section-todo-creation--form-input");
const todoList = document.querySelector(".section-todo-production--list");
const emptyTodoListText = document.querySelector('.empty-todo-list-text');
const todosFilter = document.querySelector('.section-todo-production--form-select');

const createNewTodoElement = (text) => {
  const newLi = document.createElement("li");
  const newDivWithText = document.createElement("div");
  const newDivWithBtns = document.createElement("div");
  const newH2 = document.createElement("h2");
  const newDeleteBtn = document.createElement("button");
  const newDoneBtn = document.createElement("button");
  const newImgX = document.createElement('img');
  const newImgCheckMark = document.createElement('img');

  newLi.classList.add("section-todo-production--list-item");
  newDivWithText.classList.add("section-todo-production--list-item-text");
  newDivWithBtns.classList.add("section-todo-production--list-item-btns");
  newDeleteBtn.classList.add('delete-btn');
  newDoneBtn.classList.add('done-btn');

  newImgX.src = './assets/images/x.svg';
  newImgX.width = '24';
  newImgX.alt = 'x';
  newImgCheckMark.src = './assets/images/check-mark.svg';
  newImgCheckMark.width = '24';
  newImgCheckMark.alt = 'check-mark';

  newH2.append(text);
  newDeleteBtn.append(newImgX);
  newDoneBtn.append(newImgCheckMark);
  newDivWithText.append(newH2);
  newDivWithBtns.append(newDeleteBtn, newDoneBtn);
  newLi.append(newDivWithText, newDivWithBtns);
  todoList.append(newLi);

  newLi.scrollIntoView();

  setTimeout(() => {
    newLi.classList.add('show-todo');
  }, 0);
};

const checkTodosAmount = () => {
    const todos = document.querySelectorAll('.section-todo-production--list-item');
    if (todos.length === 0) emptyTodoListText.classList.remove('invisible');
};

const addDeleteTodoOption = () => {
  const todoListDeleteBtns = document.querySelectorAll(".delete-btn");
  for (let i = 0; i < todoListDeleteBtns.length; i++) {
    todoListDeleteBtns[i].addEventListener('click', function() {
        this.parentNode.parentNode.classList.add('removed-todo');
        setTimeout(() => {
          this.parentNode.parentNode.remove();
          checkTodosAmount();
        }, 700);
    });
  }
};

const addDoneTodoOption = () => {
  const todoListDoneBtns = document.querySelectorAll(".done-btn");
  for (let i = 0; i < todoListDoneBtns.length; i++) {
    todoListDoneBtns[i].addEventListener('click', function() {
        this.parentNode.parentNode.classList.add('finished-todo');
    });
  }
};

function filterTodos(event) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
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

formBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!formInput.value) return;
  const todoText = formInput.value;
  formInput.value = "";
  emptyTodoListText.classList.add('invisible');
  createNewTodoElement(todoText);
  addDeleteTodoOption();
  addDoneTodoOption();
});

todosFilter.addEventListener('change', filterTodos);


