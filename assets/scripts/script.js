const formBtn = document.querySelector(".section-todo-creation--form-btn");
const formInput = document.querySelector(".section-todo-creation--form-input");
const todoList = document.querySelector(".section-todo-production--list");
const emptyTodoListText = document.querySelector('.empty-todo-list-text');

const createNewTodoElement = (text) => {
  const newLi = document.createElement("li");
  newLi.classList.add("section-todo-production--list-item");

  const newDiv1 = document.createElement("div");
  const newDiv2 = document.createElement("div");
  const newH2 = document.createElement("h2");
  const newBtn1 = document.createElement("button");
  const newBtn2 = document.createElement("button");
  const newImgX = document.createElement('img');
  const newImgCheckMark = document.createElement('img');

  newDiv1.classList.add("section-todo-production--list-item-text");
  newDiv2.classList.add("section-todo-production--list-item-btns");
  newBtn1.classList.add('delete-btn');
  newBtn2.classList.add('done-btn');

  newImgX.src = './assets/images/x.png';
  newImgX.width = '24';
  newImgCheckMark.src = './assets/images/check-mark.png';
  newImgCheckMark.width = '30 ';

  newH2.append(text);
  newBtn1.append(newImgX);
  newBtn2.append(newImgCheckMark);
  newDiv1.append(newH2);
  newDiv2.append(newBtn1, newBtn2);
  newLi.append(newDiv1, newDiv2);
  todoList.append(newLi);
  
  newLi.scrollIntoView();
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

formBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (!formInput.value) return;
  const todoText = formInput.value;
  emptyTodoListText.classList.add('invisible');
  createNewTodoElement(todoText);
  formInput.value = "";
  addDeleteTodoOption();
  addDoneTodoOption();
});
