import './style.css';

class Task {
  constructor(description, index, completed = false){
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

  static myTasks = [new Task('Complete Homework', 1), new Task('Wash Dishes', 2), 
  new Task('Clean Living Room', 3)];
}

const sortTasks = (tArr, n) => {
  let i, key, j; 
  for (i = 1; i < n; i += 1) { 
    key = tArr[i]; 
    j = i - 1; 
    while (j >= 0 && tArr[j].index > key.index) { 
      tArr[j + 1] = tArr[j]; 
      j = j - 1; 
    } 
    tArr[j + 1] = key; 
  }
  return tArr; 
};

const displayTasks = () => {
  const toDoList = document.getElementById('todo-list');
  let sortedTasks = sortTasks(Task.myTasks, Task.myTasks.length);
  for (let i = 0; i < sortedTasks.length; i += 1) {
    let li = document.createElement('li');
    li.innerHTML = `<input type='checkbox' id='${sortedTasks[i].index}' class='${sortedTasks[i].index}'>
    <h4 class='task-desc'>${sortedTasks[i].description}</h4>`;
    li.setAttribute('class', 'task');
    toDoList.appendChild(li);
  }
};

document.addEventListener('DOMContentLoaded', displayTasks());
