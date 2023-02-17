var lists = [];
var liveTaskId = -1;
var liveListId = -1;
let dialogVisibility = 0;
window.addEventListener("load", init);
function init() {
    UpdateDate();
    // loadLists();
}

function addTask() {
    let task = {
        taskId: 0,
        taskTitle: null,
        isImportant: false,
        isCompleted: false,
        creationDate: new Date(),
        repeatDate: null,
        reminderTime: null,
        dueDate: null,
        steps: []
    };
    let taskTitle = document.querySelector("#task-input").value;
    if (taskTitle.trim() != "") {
        task.taskTitle = taskTitle;
        task.isImportant = false;
        task.isCompleted = false;
        task.creationDate = new Date();
        for (let l of lists) {
            if (l.listName == document.getElementById("list-heading-title").innerHTML) {
                l.tasks.push(task);
                task.taskId = l.tasks.length;
            }
        }
        loadTasks();
    } else {
        swal("Title Empty", "please Enter the title of task", "warning");
    }
}

function loadTasks() {
    let taskList = document.getElementById("task-list");
    // while (taskList.hasChildNodes()) {
    //     taskList.removeChild(taskList.firstChild);
    // }
    taskList.innerHTML = '';
    for (let l of lists) {
        if (l.listName == document.getElementById("list-heading-title").innerHTML) {
            for (let task of l.tasks) {
                let taskList = document.getElementById("task-list");
                let textNode = document.createTextNode(task.taskTitle);
                let textSpan = document.createElement("span");
                textSpan.appendChild(textNode);
                textSpan.className = "list-item-text";
                textSpan.onclick = function () {
                    liveTaskId = task.taskId;
                    liveListId = l.listId;
                    showStepMenu(task);
                };
                let listItem = document.createElement("li");
                let span = document.createElement("span");
                let star;
                if (task.isImportant == true) {
                    star = document.createTextNode("\u2605");
                } else {
                    star = document.createTextNode("\u2606");
                }
                span.onclick = function () { important(task); };
                let checkBox = document.createElement("span");
                checkBox.setAttribute("id", "complete");
                if (task.isCompleted == true) {
                    checkSign = document.createTextNode("check_circle");
                    checkBox.className = "material-symbols-outlined complete";
                    checkBox.appendChild(checkSign)
                    checkBox.onclick = function () { complete(task); };
                } else {
                    checkSign = document.createTextNode("radio_button_unchecked");
                    checkBox.className = "material-symbols-outlined complete";
                    checkBox.appendChild(checkSign);
                    checkBox.onclick = function () { complete(task); };
                    listItem.style.textDecoration = "none";
                }
                span.appendChild(star);
                span.className = "impt";
                listItem.appendChild(checkBox);
                listItem.appendChild(textSpan);
                listItem.appendChild(span);
                listItem.setAttribute("class", "task");
                taskList.appendChild(listItem);
            }
        }
    }
}

document.getElementById("search-icon").addEventListener("click", function showSearchBox() {
    let searchBox = document.getElementById("hidden-text-box");
    searchBox.setAttribute("id", "text-box");
    document.getElementById("hidden-cross").setAttribute("id", "cross");
});

document.getElementById("hidden-cross").addEventListener("click", function hideTextBox() {
    document.getElementById("text-box").setAttribute("id", "hidden-text-box");
    document.getElementById("cross").setAttribute("id", "hidden-cross");
});


function complete(task) {
    let beepSound = new Audio("ping-82822.mp3");
    if (task.isCompleted == true) {
        task.isCompleted = false;
    } else {
        task.isCompleted = true;
    }
    beepSound.play();
    loadTasks();
}

document.getElementById("add-button").addEventListener("click", function () {
    addTask();
});

document.getElementById("task-input").addEventListener("keydown", function (event) {
    if (event.key == "Enter" && document.getElementById("task-input").value.trim() != "") {
        addTask();
    }
});



function important(task) {
    let beepSound = new Audio("beep-6-96243.mp3");
    if (task.isImportant == true) {
        task.isImportant = false;
        beepSound.play();
    } else {
        task.isImportant = true;
        beepSound.play();
    }
    loadTasks();
}

document.getElementById("important-tasks").addEventListener("click", function () {
    let taskList = document.getElementById("task-list");
    while (taskList.hasChildNodes()) {
        taskList.removeChild(taskList.firstChild);
    }
    for (let list of lists) {
        if (list.listName == document.getElementById("list-heading-title").innerHTML) {
            for (task of list.tasks) {
                if (task.isImportant == true) {
                    let taskList = document.getElementById("task-list");
                    let textNode = document.createTextNode(task.taskTitle);
                    let listItem = document.createElement("li");
                    let span = document.createElement("span");
                    let star = document.createTextNode("\u2605");
                    span.onclick = function () { important(task); };
                    let checkBox = document.createElement("span");
                    checkBox.setAttribute("id", "complete");
                    if (task.isCompleted == true) {
                        checkSign = document.createTextNode("check_circle");
                        checkBox.className = "material-symbols-outlined complete";
                        checkBox.appendChild(checkSign)
                        checkBox.onclick = function () { complete(task); };
                    } else {
                        checkSign = document.createTextNode("radio_button_unchecked");
                        checkBox.className = "material-symbols-outlined complete";
                        checkBox.appendChild(checkSign);
                        checkBox.onclick = function () { complete(task); };
                        listItem.style.textDecoration = "none";
                    }
                    span.appendChild(star);
                    span.className = "impt";
                    listItem.appendChild(checkBox);
                    listItem.appendChild(textNode);
                    listItem.appendChild(span);
                    listItem.setAttribute("class", "task");
                    taskList.appendChild(listItem);
                }
            }
        }
    }
});
function a() {

}
document.getElementById("list-input").addEventListener("keydown", function (event) {
    let list = {
        listName: null,
        listId: 0,
        createdAt: new Date(),
        tasks: []
    }
    let listName = document.getElementById("list-input").value.trim();
    if (event.key == "Enter" && listName.trim() != "") {
        for (let list of lists) {
            if (list.listName == listName) {
                alert("Two lists can not be with same name");
                exit();
            }
        }
        let taskListName = document.querySelector("#list-names ul");
        let listItem = document.createElement("li");
        let outerDiv = document.createElement("div");
        list.listId = lists.length + 1;
        list.listName = listName;
        list.createdAt = new Date();
        lists.push(list);
        outerDiv.className = "left-item";
        let listIcon = document.createElement("div");
        listIcon.className = "material-symbols-outlined";
        listIcon.innerHTML = "toc";
        let title = document.createTextNode(listName);
        let span = document.createElement("span");
        span.appendChild(title);
        outerDiv.appendChild(listIcon);
        outerDiv.appendChild(span);
        listItem.appendChild(outerDiv);
        listItem.onclick = function () { selectList(list.listName); };
        document.getElementById("list-heading-icon").innerHTML = "toc";
        document.getElementById("list-heading-title").innerHTML = listName;
        taskListName.appendChild(listItem);
    }
});

function UpdateDate() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    document.getElementById("today").innerHTML = " " + daysOfWeek[today.getDay()] + " " + months[month] + " " + day + ", " + year;
}

function selectList(listName) {
    document.getElementById("list-heading-title").innerHTML = listName;
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = '';
    loadTasks();
}

function showStepMenu(task) {
    console.log(task);
    let rightSide = document.getElementById("right-side");
    rightSide.className = "right-side-small";
    document.getElementById("stepsMenu").className = "visible-steps-menu";
    let selectedElement = document.querySelector(".selected-task");
    selectedElement.innerHTML = '';
    let checkBox = document.createElement("span");
    checkBox.className = "material-symbols-outlined";
    if (task.isCompleted == true) {
        checkSign = document.createTextNode("check_circle");
        checkBox.className = "material-symbols-outlined important";
    } else {
        checkSign = document.createTextNode("radio_button_unchecked");
        checkBox.className = "material-symbols-outlined important";
        checkBox.appendChild(checkSign);
    }
    let star = document.createElement("span");
    if (task.isImportant == true) {
        star.appendChild(document.createTextNode("\u2605"));
    } else {
        star.appendChild(document.createTextNode("\u2606"));
    }
    star.onclick = function () { important(task); };
    checkBox.appendChild(checkSign)
    checkBox.onclick = function () { complete(task); };
    let taskTitle = document.createElement("span");
    taskTitle.innerHTML = task.taskTitle;
    selectedElement.appendChild(checkBox);
    selectedElement.appendChild(taskTitle);
    selectedElement.appendChild(star);
    const inputElement = document.querySelector('.step-input input');
    inputElement.addEventListener('keydown', addSteps);
    loadSteps(task);
}

function addSteps(event) {
    if (event.keyCode === 13) {
        for (let list of lists) {
            if (list.listId == liveListId) {
                for (let task of list.tasks){
                    if (task.taskId == liveTaskId) {
                        step = {
                            stepName: null,
                            isCompleted: false
                        }
                        let input = document.querySelector('.step-input input');
                        step.stepName = input.value;
                        task.steps.push(step);
                        console.log(task.steps);
                        input.value='';
                        loadSteps(task);
                    }
                }
            }
        }
        
    }
}

function loadSteps(task) {
    let stepList = document.getElementById("stepList");
    stepList.innerHTML = '';
    for (let step of task.steps) {
        let listItem = document.createElement("li");
        listItem.className = "step";
        let stepName = step.stepName;
        listItem.appendChild(document.createTextNode(stepName));
        stepList.appendChild(listItem);
    }
}

document.querySelector(".hide-delete span:nth-of-type(1)").addEventListener("click", function () {
    document.querySelector(".right-side-small").classList = "right-side";
    document.getElementById("stepsMenu").className = "hidden-steps-menu";
});

document.querySelector(".hide-delete span:nth-of-type(2)").addEventListener("click", function () {
    for(let list of lists){
        if(list.listId == liveListId){
            let index = list.tasks.findIndex(task => task.taskId === liveTaskId);
            list.tasks.splice(index,1);
            loadTasks();
            document.querySelector(".right-side-small").classList = "right-side";
            document.getElementById("stepsMenu").className = "hidden-steps-menu";

        }
    }

});


// let checkBox = document.querySelector(".selected-task span:nth-of-type(2)");

