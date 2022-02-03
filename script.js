"use strict";
const input = document.querySelector(".input");
const plusBtn = document.querySelector(".plusBtn");
const todos = document.querySelector(".todos");
const eingabe = document.querySelector(".eingabe-todo");
const clearAll = document.querySelector(".clearAll");
const filterOption = document.querySelector(".filter-todo");

const allTodos = JSON.parse(localStorage.getItem("allTodos"));

let index = 0;

if (allTodos) {
  allTodos.forEach((todo) => addTodo(todo)); // für local storage
}

eingabe.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
}); //damit man enter drücken kann

plusBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  index++;
  let todoText = input.value;

  if (index > 1) {
    clearAll.classList.remove("hidden");
  }

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    // wird nur ausgeführt wenn ein Text eingegeben wird
    const todoEl = document.createElement("li");
    const trashEl = document.createElement("div");
    todoEl.classList.add("todo");

    if (todo && todo.green) {
      todoEl.classList.add("green");
    }

    // console.log(todo);

    // für local storage,damit grüne Untermalung bleibt

    todoEl.innerHTML = `<div>${todoText}</div><div class="circlebox"><div><i class="far fa-check-circle"></i><i class="fas fa-trash delete"></i></div>`;

    todos.appendChild(todoEl);
    todos.appendChild(trashEl);

    input.value = "";

    updateLS();

    const checkBtn = todoEl.querySelector(".fa-check-circle");
    const deleteBtn = todoEl.querySelector(".fa-trash");

    deleteBtn.addEventListener("click", () => {
      todoEl.remove();

      index--;
      if (index <= 1) {
        clearAll.classList.add("hidden");
      }
      updateLS();
    });

    checkBtn.addEventListener("click", () => {
      todoEl.classList.toggle("green");

      updateLS();
    });

    clearAll.addEventListener("click", () => {
      todoEl.remove();

      index = 0;
      if (index <= 1) {
        clearAll.classList.add("hidden");
      }
      console.log(index);
      updateLS();
    });
  }
}

filterOption.addEventListener("click", filterTodo);

function filterTodo(e) {
  const todosChild = todos.childNodes;
  todosChild.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("green")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("green")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function updateLS() {
  const todosEl = document.querySelectorAll("li");

  const allTodos = [];

  todosEl.forEach((todoEl) => {
    allTodos.push({
      text: todoEl.innerText, // wenn innerHTML wäre, dann kommen auch die icons wieder dazu
      green: todoEl.classList.contains("green"),
    });
  });

  localStorage.setItem("allTodos", JSON.stringify(allTodos));
}
