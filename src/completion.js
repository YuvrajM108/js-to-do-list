import { Task, sortTasks } from './index';

export function completionMarker(cboxId, tIdx) {
  const tasks = sortTasks(Task.myTasks);
  const cbox = document.getElementById(`${cboxId}`);
  if (cbox.checked) {
    cbox.parentElement.classList.add('completed');
    tasks[tIdx].completed = true;
    localStorage.myTasks = JSON.stringify(Task.myTasks);
  } else {
    cbox.parentElement.classList.remove('completed');
    tasks[tIdx].completed = false;
    localStorage.myTasks = JSON.stringify(Task.myTasks);
  }
}