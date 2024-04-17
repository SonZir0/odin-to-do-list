import 'normalize.css';
import './../css/base.css';
import { initAddListBtn, initShowAllBtn } from './listsPanelDOM.js';
import { addListFormHandler } from './listDialog.js';
import { addTaskFormHandler } from './taskDialog.js';
import { checkStorageAndLoadData } from './allTaskLists.js';

initAddListBtn();
initShowAllBtn();
addListFormHandler();
addTaskFormHandler();

checkStorageAndLoadData();