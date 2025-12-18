function openFeatuers() {
    const allElems = document.querySelectorAll(".elem");
    const allfullElemPage = document.querySelectorAll(".fullElem");
    const fulPageBackBtn = document.querySelectorAll(
        ".fullElem .back-container .container"
    );

    allElems.forEach((elem) => {
        elem.addEventListener("click", () => {
            allfullElemPage.forEach((p) => (p.style.display = "none"));
            allfullElemPage[elem.id].style.display = "grid";
        });
    });

    fulPageBackBtn.forEach((back) => {
        back.addEventListener("click", () => {
            allfullElemPage[back.id].style.display = "none";
        });
    });
}
openFeatuers();

// Date featuers
function dateFeatuers() {
    const dayInput = document.querySelector(".date-container .day span");
    const monthInput = document.querySelector(".date-container .month span");
    const dateInput = document.querySelector(".date-container .date span");
    const timeInput = document.querySelector(".date-container .time span");

    dayInput.textContent = new Date().toLocaleDateString("en-US", {
        weekday: "long",
    });
    monthInput.textContent = new Date().toLocaleDateString("en-US", {
        month: "long",
    });
    dateInput.textContent = new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
    timeInput.textContent = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });
}
dateFeatuers();

//Add Task Section
function todoList() {
    const addTaskForm = document.querySelector(".addTask form");
    const addTaskInput = document.querySelector(".addTask form input");
    const addTaskTextarea = document.querySelector(".addTask form textarea");
    const addTaskCheckBox = document.querySelector(".addTask form #check");

    const allTask = document.querySelector(".allTask");

    var currentTask = [];

    if (localStorage.getItem("currentTask")) {
        currentTask = JSON.parse(localStorage.getItem("currentTask"));
    } else {
        console.log("Task list is empty");
    }

    function renderTask() {
        let sum = "";

        currentTask.forEach((val, index) => {
            sum += `<div class="task">
                            <div class="task-container">
                                <h5>${val.task} <span class="${val.imp}">IMP</span></h5>
                                <h6 class="detail">${val.details}</h6>
                            </div>

                            <button id='${index}'>Completed</button>
                        </div>`;
        });

        allTask.innerHTML = sum;

        localStorage.setItem("currentTask", JSON.stringify(currentTask));

        //markCompletedButton

        let markCompletedButton = document.querySelectorAll(".task button");
        markCompletedButton.forEach((btn) => {
            btn.addEventListener("click", () => {
                currentTask.splice(btn.id, 1);
                renderTask();
            });
        });
    }
    renderTask();

    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        currentTask.push({
            task: addTaskInput.value,
            details: addTaskTextarea.value,
            imp: addTaskCheckBox.checked,
        });
        renderTask();

        addTaskInput.value = "";
        addTaskTextarea.value = "";
        addTaskCheckBox.checked = false;
    });
}
todoList();
