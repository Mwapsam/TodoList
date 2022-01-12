import './style.css';
import TasksManager from './modules/tasks_manager.js';
import DisplayManager from './modules/display_manager.js';

const selector = (element) => document.querySelector(element);
const selectorAll = (element) => document.querySelectorAll(element);
const input = selector('input');
const manager = new TasksManager();

const updateTask = (event, index) => {
  if (event.key === 'Enter') {
    manager.updateTask(index, selector(`.task_${index}`).value, selector(`.task_${index}_checkbox`).checked);
    selector('.add_task input').focus();
  }
};

const updateStatus = (index) => {
  manager.updateStatus(index, selector(`.task_${index}_checkbox`).checked);
  selector(`.task[data-id='${index}'] .input_task`).classList.toggle('completed');
};

const display = () => {
  DisplayManager.reset(selector('.tasks'));

  manager.getTasks().forEach((task) => DisplayManager.displayTask(selector('.tasks'), task));

  selectorAll('.fa-trash').forEach((e) =>
    e.addEventListener('click', () => {
      deleteTask(e.dataset.id);
    })
  );

  selectorAll('.input_task').forEach((e) =>
    e.addEventListener('keyup', (event) => {
      updateTask(event, e.dataset.id);
    })
  );

  selectorAll(`.checkbox_task`).forEach((e) =>
    e.addEventListener('change', () => {
      updateStatus(e.dataset.id);
    })
  );
};
const deleteTask = (index) => {
  manager.deleteTask(index);
  display();
};

input.addEventListener('keyup', ({ key }) => {
  if (key === 'Enter') {
    const task = manager.addTask(input.value);
    DisplayManager.displayTask(selector('.tasks'), task);
    input.value = '';

    selector(`#task_${task.index}`).addEventListener('click', () => {
      deleteTask(task.index);
    });

    selector(`#input_task_${task.index}`).addEventListener('keyup', (event) => {
      updateTask(event, task.index);
    });

    selector(`#checkbox_task_${task.index}`).addEventListener('change', () => {
      updateStatus(task.index);
    });

    selector(`#input_task_${task.index}`).focus();
  }
});

selector('.footer').addEventListener('click', () => {
  manager.clearCompleted();
  display();
});
