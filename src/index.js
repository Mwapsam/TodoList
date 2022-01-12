import './style.css';
import Task from './modules/task.js';
import DisplayManager from './modules/display_manager.js';

function hasClass(el, className) {
  if (el.classList) return el.classList.contains(className);
  else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
}

const selector = (element) => document.querySelector(element);

let tasks = [new Task(1, 'one', 'ok'), new Task(2, 'two', 'ok'), new Task(4, 'four', 'ok'), new Task(3, 'three', 'ok'), new Task(5, 'five', 'ok')];

tasks = tasks.sort((a, b) => a.index - b.index);

//tasks.forEach((task) => DisplayManager.displayTask(selector('.tasks'), task));

let two = selector('#two');
two.addEventListener('dragstart', dragStartEvent);
two.addEventListener('dragend', dragEndEvent);

let three = selector('#three');
three.addEventListener('dragstart', dragStartEvent);
three.addEventListener('dragend', dragEndEvent);

let one = selector('#one');
one.addEventListener('dragstart', dragStartEvent);
one.addEventListener('dragend', dragEndEvent);

let four = selector('#four');
four.addEventListener('dragstart', dragStartEvent);
four.addEventListener('dragend', dragEndEvent);

let five = selector('#five');
five.addEventListener('dragstart', dragStartEvent);
five.addEventListener('dragend', dragEndEvent);

/*let depotT = selector('.tasks');
depotT.addEventListener('dragenter', dragEnterEvent);
depotT.addEventListener('dragleave', dragLeaveEvent);
depotT.addEventListener('dragover', dragOverEvent);
depotT.addEventListener('drop', dropEvent);
*/
//
let p = selector('.test');

p.addEventListener('dragstart', dragStartEvent);
p.addEventListener('dragend', dragEndEvent);

function dragStartEvent(evt) {
  //console.log('dragStartEvent', evt.target.id);
  addClass(evt.target, 'dragStart');
  let dt = evt.dataTransfer;
  //console.log(this);
  dt.setData('tex/html', evt.target.id);
}

function dragStartEvent2(evt) {
  evt.preventDefault();
  evt.stopPropagation();
}

function dragEndEvent(evt) {
  removeClass(evt.target, 'dragStart');
}

document.querySelectorAll('.task').forEach((d) => {
  //d.addEventListener('dragstart', dragStartEvent2, false, false, false, false, false);
});

/*document.querySelectorAll('.depot').forEach((depot) => {
  depot.addEventListener('dragenter', dragEnterEvent, false, false, false, false, false);
  depot.addEventListener('dragleave', dragLeaveEvent, false, false, false, false, false);
  depot.addEventListener('dragover', dragOverEvent, false, false, false, false, false);
  depot.addEventListener('drop', dropEvent, false, false, false, false, false);
});*/

let dep = document.querySelector('.depot');
dep.addEventListener('dragenter', dragEnterEvent, false, false, false, false, false);
dep.addEventListener('dragleave', dragLeaveEvent, false, false, false, false, false);
dep.addEventListener('dragover', dragOverEvent, false, false, false, false, false);
dep.addEventListener('drop', dropEvent, false, false, false, false, false);

let dernierElementParcouru;
function dragEnterEvent(evt) {
  /*console.log('-------------dragSurvol-------------');
  console.log(this);
  console.log(evt);
  console.log('-------------dragSurvol-------------');
  */
  addClass(evt.target, 'dragSurvol');
}

function dragLeaveEvent(evt) {
  if (evt.target == dernierElementParcouru) {
    //e.stopPropagation();
    //e.preventDefault();
    /*if (evt.currentTarget.contains(evt.relatedTarget)) {
      return;
    }*/
  }
  removeClass(evt.target, 'dragSurvol');
}

function dragOverEvent(evt) {
  //console.log(evt.target);
  if (hasClass(evt.target, 'task')) {
    dernierElementParcouru = evt.target;
  }
  evt.preventDefault();
}

function dropEvent(evt) {
  if (evt.currentTarget.contains(evt.relatedTarget)) {
    return;
  }
  if (evt.target.id == 'depot') {
    console.log('CAS E');
  } else {
    //let element = selector('#' + evt.target.id);
    let dt = evt.dataTransfer;
    let elementADeplacer = selector('#' + dt.getData('tex/html'));
    let items = document.querySelectorAll('.task');

    if (elementADeplacer.dataset.position - dernierElementParcouru.dataset.position == 1) {
      // inversion
      //console.log('CAS A');
      let old = elementADeplacer.dataset.position;
      dernierElementParcouru.before(elementADeplacer);
      elementADeplacer.dataset.position = dernierElementParcouru.dataset.position;
      dernierElementParcouru.dataset.position = old;
    } else if (elementADeplacer.dataset.position - dernierElementParcouru.dataset.position == -1) {
      // inversion
      //console.log('CAS B');

      dernierElementParcouru.after(elementADeplacer);
      let old = elementADeplacer.dataset.position;
      elementADeplacer.dataset.position = dernierElementParcouru.dataset.position;
      dernierElementParcouru.dataset.position = old;
    } else if (elementADeplacer.dataset.position - dernierElementParcouru.dataset.position > 1) {
      //console.log('CAS C');

      let min = dernierElementParcouru.dataset.position;
      let max = elementADeplacer.dataset.position;

      dernierElementParcouru.before(elementADeplacer);

      for (let i = 0; i < items.length; i++) {
        let e = items[i];
        let position = e.dataset.position;

        if (min <= position && position <= max) {
          if (e.id == elementADeplacer.id) {
            e.dataset.position = min;
          } else {
            let w = Number.parseInt(position) + 1;
            e.dataset.position = w;
          }
        }
      }
    } else if (elementADeplacer.dataset.position - dernierElementParcouru.dataset.position < 1) {
      //console.log('CAS D');

      let max = dernierElementParcouru.dataset.position;
      let min = elementADeplacer.dataset.position;

      dernierElementParcouru.after(elementADeplacer);

      for (let i = 0; i < items.length; i++) {
        let e = items[i];
        let position = e.dataset.position;

        if (min <= position && position <= max) {
          if (e.id == elementADeplacer.id) {
            e.dataset.position = max;
          } else {
            let w = Number.parseInt(position) - 1;
            e.dataset.position = w;
          }
        }
      }
    }

    removeClass(dernierElementParcouru, 'dragSurvol');
  }
}
