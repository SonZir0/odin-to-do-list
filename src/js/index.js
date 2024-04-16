import 'normalize.css';
import './../css/base.css';
import { initAddListBtn, initShowAllBtn } from './listsPanelDOM.js';
import { addListFormHandler } from './listDialog.js';
import { addTaskFormHandler } from './taskDialog.js';

initAddListBtn();
initShowAllBtn();
addListFormHandler();
addTaskFormHandler();