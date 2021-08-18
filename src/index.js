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

const sortTasks = (tasks) => {
  for (let i = 0; i < tasks.length; i += 1) {
    for (let j = 1; i < tasks.length; j += 1) {
      if (tasks[j].index > tasks[j + 1].index) {
        let secondTask = tasks[j];
        tasks[j] = tasks[j + 1];
        tasks[j + 1] = secondTask;
      }
    }
  }
  return tasks;
};

const displayTasks = () => {
  const toDoList = document.getElementById('todo-list');
  // let sortedTasks = sortTasks(Task.myTasks);
  let sortedTasks = Task.myTasks;
  for (let i = 0; i < sortedTasks.length; i += 1) {
    let li = document.createElement('li');
    li.innerHTML = `${sortedTasks[i].description}`;
    toDoList.appendChild(li);
  }
};

window.onload = displayTasks();
