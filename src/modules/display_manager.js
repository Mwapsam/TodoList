export default class DisplayManager {
  static displayTask = (parent, task) => {
    const taskDiv = DisplayManager.createHtml(parent, 'div', 'task');
    taskDiv.setAttribute('draggable', 'true');
    taskDiv.setAttribute('data-effectallowed', 'move');
    taskDiv.id = `task_${task.index}`;
    const taskInput = DisplayManager.createHtml(taskDiv, 'div', 'task_input');
    const input = DisplayManager.createHtml(taskInput, 'input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', `tasK_${task.index}`);
    DisplayManager.createHtml(taskInput, 'label', '', task.description).setAttribute('for', `tasK_${task.index}`);
    DisplayManager.createHtml(taskDiv, 'i', 'fas fa-ellipsis-v');
  };

  static createHtml = (parent, tag, className, content = null) => {
    const element = document.createElement(tag);
    element.className = className;
    element.innerHTML = content;
    parent.appendChild(element);
    return element;
  };
}
