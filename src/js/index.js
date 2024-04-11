import 'normalize.css';
import './../css/base.css';
import { initAddListBtn } from './listsPanelDOM.js';
import { addListFormHandler } from './listDialog.js';
import { addTaskFormHandler } from './taskDialog.js';

initAddListBtn();
addListFormHandler();
addTaskFormHandler();