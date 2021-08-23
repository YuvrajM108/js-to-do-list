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
}

class Task {
  constructor(description, index, completed = false) {
    this.description = description;
    this.index = index;
    this.completed = completed;
  }

  static AddTask(desc) {
    const tasks = sortTasks(this.myTasks, this.myTasks.length);
    let index;
    if (tasks[0]) {
      index = tasks[tasks.length - 1].index + 1;
    } else {
      index = 1;
    }
    const newTask = new Task(desc, index);
    this.myTasks.push(newTask);
    localStorage.myTasks = JSON.stringify(this.myTasks);
  }

  static removeTask(index) {
    const tasks = sortTasks(this.myTasks, this.myTasks.length);
    let removedIdx;
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].index === index) {
        this.myTasks.splice(i, 1);
        removedIdx = i;
        break;
      }
    }
    for (let j = removedIdx; j < this.myTasks.length; j += 1) {
      this.myTasks[j].index -= 1;
    }

    localStorage.myTasks = JSON.stringify(this.myTasks);
  }

  static editTaskDesc(idx, desc) {
    for (let i = 0; i < this.myTasks.length; i += 1) {
      if (this.myTasks[i].index === idx) {
        this.myTasks[i].description = desc;
        localStorage.myTasks = JSON.stringify(this.myTasks);
        break;
      }
    }
  }

  static clearCompletedTasks() {
    const completeTasks = this.myTasks.filter((task) => (task.completed === true));
    for (let i = 0; i < completeTasks.length; i += 1) {
      this.removeTask(completeTasks[i].index);
    }
  }

  static myTasks = [];
}

export { Task };
