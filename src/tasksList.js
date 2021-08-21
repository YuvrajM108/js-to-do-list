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
  let remTasks;
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].index === index) {
      if (i === tasks.length - 1) {
        remTasks = Task.myTasks.splice(i, 1);
      } else {
        remTasks = Task.myTasks.splice(i, (tasks.length - (i + 1)));
      }
      break;
    }
  }
  remTasks.splice(0, 1);
  if (remTasks.length > 0) {
    for (let j = 0; j < remTasks.length; j += 1) {
      remTasks[j].index -= 1;
    }
    Task.myTasks.concat(remTasks);
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
  const completeTasks = Task.myTasks.filter(checkCompletion);
  for (let i = 0; i < completeTasks.length; i += 1) {
    removeTask(completeTasks[i].index);
  }
}

function checkCompletion(task) {
  return task.completed;
}
