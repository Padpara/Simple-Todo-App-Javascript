//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Events Listener
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//FUNCTIONS
function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();

  //create todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  //create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  const todoToLocal = {
    content: todoInput.value,
    status: 'uncompleted',
  };
  saveLocalTodos(todoToLocal);

  //create button check
  const completedButton = document.createElement('button');
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  //create button trash
  const trashButton = document.createElement('button');
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  //append todoDiv to todoList (UL)
  todoList.appendChild(todoDiv);

  todoInput.value = '';
}

function deleteCheck(event) {
  const item = event.target;

  //delete todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');

    removeLocalTodos(todo);

    //event listener that wait until css animation/transition ended.
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  // check mark todo
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
    checkLocalTodos(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  // console.log(todos);
  // console.log(e.target.value);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'none';
        } else {
          todo.style.display = 'flex';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //check it todos already exists
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  //check it todos already exists
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    //create todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo.content;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    //create button check
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //create button trash
    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    if (todo.status === 'completed') {
      todoDiv.classList.add('completed');
    }
    //append todoDiv to todoList (UL)
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // console.log(todo.children[0].innerText);
  const todoIndex = todo.children[0].innerText;

  const index = returnIndex(todos, todoIndex);
  console.log(index);
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function checkLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  console.log(todos);
  console.log(todoIndex);

  const index = returnIndex(todos, todoIndex);
  console.log(index);
  // todos[index][1] = 'completed';
  if (todos[index].status === 'uncompleted') {
    todos[index].status = 'completed';
  } else {
    todos[index].status = 'uncompleted';
  }

  localStorage.setItem('todos', JSON.stringify(todos));
}

function returnIndex(arr, content) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].content === content) {
      return i;
    }
  }
  return -1;
}
