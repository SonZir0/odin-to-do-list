import plusIcon from './../icons/plus-circle-1427-svgrepo-com.svg';

const tasksPanel = document.querySelector('.tasks');
const newTaskCardBtn = document.createElement('div');
initNewTaskCardBtn(); /* to not recreate the "add new card" panel on each list reload
keep it ready to append */

export function displayTaskList (event) {
    clearTaskPanel();
    tasksPanel.appendChild(newTaskCardBtn);
    console.log(event.target.parentElement.dataset.id);

}

function clearTaskPanel() {
    const allTaskCards = Array.from(tasksPanel.children);
    for (const child of allTaskCards) {
        child.remove();
    }
}

function initNewTaskCardBtn() {
    newTaskCardBtn.classList.add('addNewTask');
    newTaskCardBtn.setAttribute('aria-label', 'Add new task to your list');
    newTaskCardBtn.tabIndex = 0;

    const plusImg = new Image(50, 50);
    plusImg.src = plusIcon;
    newTaskCardBtn.appendChild(plusImg);
}