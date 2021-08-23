import { Task, sortTasks } from './task';

export function AddTask(desc) {
  const tasks = sortTasks(Task.myTasks, Task.myTasks.length);
  let index;
  if (tasks[0]) {
    index = tasks[tasks.length - 1].index + 1;
  } else {
    index = 1;
  }
  const newTask = new Task(desc, index);
  Task.myTasks.push(newTask);
  localStorage.myTasks = JSON.stringify(Task.myTasks);
}

export function removeTask(index) {
  const tasks = sortTasks(Task.myTasks, Task.myTasks.length);
  let removedIdx;
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].index === index) {
      Task.myTasks.splice(i, 1);
      removedIdx = i;
      break;
    }
  }
  for (let j = removedIdx; j < Task.myTasks.length; j += 1) {
    Task.myTasks[j].index -= 1;
  }
  
  localStorage.myTasks = JSON.stringify(Task.myTasks);
}

export function editTaskDesc(idx, desc) {
  for (let i = 0; i < Task.myTasks.length; i += 1) {
    if (Task.myTasks[i].index === idx) {
      Task.myTasks[i].description = desc;
      localStorage.myTasks = JSON.stringify(Task.myTasks);
      break;
    }
  }
}

export function clearCompletedTasks() {
  const completeTasks = Task.myTasks.filter((task) => (task.completed === true));
  for (let i = 0; i < completeTasks.length; i += 1) {
    removeTask(completeTasks[i].index);
  }
}
