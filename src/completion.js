import { Task, sortTasks } from './task';

export function completionMarker(cboxId, tIdx) {
  const tasks = sortTasks(Task.myTasks);
  const cbox = document.getElementById(`${cboxId}`);
  const desc = cbox.parentElement.getElementsByTagName('h4')[0];
  if (cbox.checked) {
    desc.classList.add('completed');
    tasks[tIdx].completed = true;
    localStorage.myTasks = JSON.stringify(Task.myTasks);
  } else {
    desc.classList.remove('completed');
    tasks[tIdx].completed = false;
    localStorage.myTasks = JSON.stringify(Task.myTasks);
  }
}