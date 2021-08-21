import './style.css';
import { completionMarker } from './completion';
import { Task, sortTasks } from './task';
import { AddTask, editTaskDesc, removeTask } from './tasksList';
import DeleteIcon from './delete-icon.png'

if (localStorage.length > 0) {
  Task.myTasks = JSON.parse(localStorage.myTasks);
}

const displayTasks = () => {
  const toDoList = document.getElementById('todo-list');
  const sortedTasks = sortTasks(Task.myTasks, Task.myTasks.length);
  if (toDoList.childElementCount < (sortedTasks.length)) {
    for (let i = 0; i < sortedTasks.length; i += 1) {
      const li = document.createElement('li');
      li.setAttribute('class', 'task');
      if (sortedTasks[i].completed) {
        li.innerHTML = `<div class='task-name' id='desc${sortedTasks[i].index}'><input type='checkbox' id='${sortedTasks[i].index}' checked>
        <h4 class='task-desc'>${sortedTasks[i].description}</h4></div>`;
        li.classList.add('completed');
      } else {
        li.innerHTML = `<div class='task-name' id='desc${sortedTasks[i].index}'><input type='checkbox' id='${sortedTasks[i].index}'>
        <h4 class='task-desc'>${sortedTasks[i].description}</h4></div>`;
      }
      const delIcon = new Image(50, 50) ;
      delIcon.src = DeleteIcon;
      delIcon.addEventListener('click', () => removeTask(sortedTasks[i].index));
      li.appendChild(delIcon);
      toDoList.appendChild(li);
      const checkbox = document.getElementById(`${sortedTasks[i].index}`);
      checkbox.addEventListener('change', () => completionMarker(sortedTasks[i].index, i));
      const taskDescDiv = document.getElementById(`desc${sortedTasks[i].index}`);
      const taskDesc = taskDescDiv.lastChild;
      const editForm = document.createElement('form');
      editForm.setAttribute('id', `edit-task${sortedTasks[i].index}`);
      editForm.setAttribute('class', 'edit-task')
      editForm.innerHTML = `<input class="edit-task" type="text" id="editDesc${sortedTasks[i].index}" name="description" 
        value="${sortedTasks[i].description}">
      <button type="submit" class="submit-btn" id="submit-edited-task${sortedTasks[i].index}">↩</button>`;
      editForm.style.display = 'none';
      taskDescDiv.appendChild(editForm);
      const editField = editForm.firstChild;
      const editSubmit = document.getElementById(`submit-edited-task${sortedTasks[i].index}`);
      editForm.addEventListener('focusout', (event) => {
        event.preventDefault();
        editForm.style.display = 'none';
        taskDesc.style.display = 'block';
      });
      taskDesc.addEventListener('click', (event) => {
        event.preventDefault();
        editForm.style.display = 'block';
        editField.focus();
        taskDesc.style.display = 'none';
      });
      editField.addEventListener('keypress', (e) => {
        if ('Enter' === e.key && editField.value) {
          editSubmit.click();
        }
      });
      editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (editField.value) {
          editTaskDesc(sortedTasks[i].index, editField.value);
          editField.value = '';
          clearList();
          displayTasks();
        }
      });
    }
  }
};

let newTaskSubmit = document.getElementById('submit-new-task');
let newTaskInput = document.getElementById('description');
let newTaskForm = document.getElementById('new-task');

const clearList = () => {
  const toDoList = document.getElementById('todo-list');
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }
}

newTaskInput.addEventListener('keypress', (e) => {
  if ('Enter' === e.key && newTaskInput.value) {
    newTaskSubmit.click();
  }
});

newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (newTaskInput.value) {
    AddTask(newTaskInput.value);
    newTaskInput.value = '';
    clearList();
    displayTasks();
  }
});

document.addEventListener('DOMContentLoaded', displayTasks());
