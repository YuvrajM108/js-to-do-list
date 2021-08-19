import './style.css';
import {completionMarker} from './completion.js';

class Task {
  constructor(description, index, completed = false) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

  static myTasks = [new Task('Complete Homework', 1), new Task('Wash Dishes', 2),
    new Task('Clean Living Room', 3)];
}

if (localStorage.length > 0) {
  Task.myTasks = JSON.parse(localStorage.myTasks);
}

export function sortTasks(tArr, n) {
  let i;
  let key;
  let j;
  for (i = 1; i < n; i += 1) {
    key = tArr[i];
    j = i - 1;
    while (j >= 0 && tArr[j].index > key.index) {
      tArr[j + 1] = tArr[j];
      j -= 1;
    }
    tArr[j + 1] = key;
  }
  return tArr;
};

const displayTasks = () => {
  const toDoList = document.getElementById('todo-list');
  const sortedTasks = sortTasks(Task.myTasks, Task.myTasks.length);
  if (toDoList.childElementCount < (sortedTasks.length + 1)) {
    for (let i = 0; i < sortedTasks.length; i += 1) {
      const li = document.createElement('li');
      li.setAttribute('class', 'task');
      if (sortedTasks[i].completed) {
        li.innerHTML = `<input type='checkbox' id='${sortedTasks[i].index}' checked>
        <h4 class='task-desc'>${sortedTasks[i].description}</h4>`;
        li.classList.add('completed');
      }
      else {
        li.innerHTML = `<input type='checkbox' id='${sortedTasks[i].index}'>
        <h4 class='task-desc'>${sortedTasks[i].description}</h4>`;
      }
      toDoList.appendChild(li);
      const checkbox = document.getElementById(`${sortedTasks[i].index}`);
      checkbox.addEventListener('change', () => completionMarker(sortedTasks[i].index, i));
    }
  }
};

document.addEventListener('DOMContentLoaded', displayTasks());

export { Task };
