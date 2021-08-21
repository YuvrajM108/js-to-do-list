import './style.css';
import { completionMarker } from './completion';
import { Task, sortTasks } from './task';
import { 
  AddTask, clearCompletedTasks, editTaskDesc, removeTask 
} from './tasksList';

if (localStorage.length > 0) {
  Task.myTasks = JSON.parse(localStorage.myTasks);
}

const clearList = () => {
  const toDoList = document.getElementById('todo-list');
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }
};

const displayTasks = () => {
  if (localStorage.length > 0) {
    Task.myTasks = JSON.parse(localStorage.myTasks);
  }
  const toDoList = document.getElementById('todo-list');
  const sortedTasks = sortTasks(Task.myTasks, Task.myTasks.length);
  if (toDoList.childElementCount < (sortedTasks.length)) {
    for (let i = 0; i < sortedTasks.length; i += 1) {
      const li = document.createElement('li');
      li.setAttribute('class', 'task');
      if (sortedTasks[i].completed) {
        li.innerHTML = `<div class='task-name' id='desc${sortedTasks[i].index}'><input type='checkbox' id='${sortedTasks[i].index}' checked>
        <h4 class='task-desc completed'>${sortedTasks[i].description}</h4></div>`;
      } else {
        li.innerHTML = `<div class='task-name' id='desc${sortedTasks[i].index}'><input type='checkbox' id='${sortedTasks[i].index}'>
        <h4 class='task-desc'>${sortedTasks[i].description}</h4></div>`;
      }
      const delIcon = document.createElement('i');
      delIcon.setAttribute('class', 'far fa-trash-alt');
      const delButton = document.createElement('a');
      delButton.setAttribute('class', 'delete-btn');
      delButton.appendChild(delIcon);
      delButton.addEventListener('click', () => {
        removeTask(sortedTasks[i].index);
        clearList();
        displayTasks();
      });
      li.appendChild(delButton);
      toDoList.appendChild(li);
      const checkbox = document.getElementById(`${sortedTasks[i].index}`);
      checkbox.addEventListener('change', () => completionMarker(sortedTasks[i].index, i));
      const taskDescDiv = document.getElementById(`desc${sortedTasks[i].index}`);
      const taskDesc = taskDescDiv.lastChild;
      const editForm = document.createElement('form');
      taskDescDiv.appendChild(editForm);
      editForm.setAttribute('id', `edit-task${sortedTasks[i].index}`);
      editForm.setAttribute('class', 'edit-task');
      editForm.innerHTML = `<input class="edit-task" type="text" id="editDesc${sortedTasks[i].index}" name="description" 
        value="${sortedTasks[i].description}">
      <button type="submit" class="submit-btn" id="submit-edited-task${sortedTasks[i].index}">↩</button>`;
      editForm.style.display = 'none';
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
        if (e.key === 'Enter' && editField.value !== sortedTasks[i].description) {
          editSubmit.click();
        }
      });
      editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (editField.value && editField.value !== sortedTasks[i].description) {
          editTaskDesc(sortedTasks[i].index, editField.value);
          editField.value = '';
          clearList();
          displayTasks();
        }
      });
    }
  }
};

const newTaskSubmit = document.getElementById('submit-new-task');
const newTaskInput = document.getElementById('description');
const newTaskForm = document.getElementById('new-task');

newTaskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && newTaskInput.value) {
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

const clearCompletedLink = document.getElementById('clear-completed-link');

clearCompletedLink.addEventListener('click', () => {
  clearCompletedTasks();
  clearList();
  displayTasks();
});

document.addEventListener('DOMContentLoaded', displayTasks());
