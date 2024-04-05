import 'normalize.css';
import './../css/base.css';
import cogIcon from './../icons/cog-svgrepo-com.svg';
import plusIcon from './../icons/plus-circle-1427-svgrepo-com.svg';
import './listDialog.js';
import { newListDialog } from './listDialog.js';
//import './taskDialog.js';

// move elsewhere later, needed for styling/testing
const optionsBtnsArr = Array.from(document.querySelectorAll('ul button+button'));
for (const btn of optionsBtnsArr) {
    const optionsIcon = new Image(35, 35);
    optionsIcon.src = cogIcon;
    optionsIcon.setAttribute('aria-label','Edit');
    btn.appendChild(optionsIcon);
}

// move elsewhere later, needed for styling/testing
const taskGroups = document.querySelector('.taskGroups');
const newGroupBtn = document.createElement('button');
const addIcon = new Image(35, 35);
addIcon.src = plusIcon;
newGroupBtn.appendChild(addIcon);
newGroupBtn.classList.add('addNewList');
newGroupBtn.setAttribute('aria-label','Add new task list');
taskGroups.appendChild(newGroupBtn);

newGroupBtn.addEventListener("click", (event) => {
    newListDialog.showModal();
});