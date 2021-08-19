import './style.css';
import { completionMarker } from './completion';
import { Task, sortTasks } from './task';

if (localStorage.length > 0) {
  Task.myTasks = JSON.parse(localStorage.myTasks);
}

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
      } else {
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
