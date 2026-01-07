let taskData = {};

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let dragElement = null;
const columns = [todo, progress, done];

const addTask = (title, desc, column) => {
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
                    <h2>${title}</h2>
                    <p>${desc} </p>
                    <button>Delete</button>`;

    column.appendChild(div);

    div.addEventListener("drag", (e) => {
        dragElement = div;
    });

    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    });

    return div;
};

const updateTaskCount = () => {
    columns.forEach((col) => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        taskData[col.id] = Array.from(tasks).map((t) => {
            return {
                title: t.querySelector("h2").innerHTML,
                desc: t.querySelector("p").innerHTML,
            };
        });
        localStorage.setItem("tasks", JSON.stringify(taskData));

        //just add if (count)  you can remove this
        if (count) count.textContent = tasks.length;
    });
};

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));
    console.log(data);
    for (const col in data) {
        const column = document.querySelector(`#${col}`);

        data[col].forEach((task) => {
            addTask(task.title, task.desc, column);
        });

        updateTaskCount();
    }
}

const tasks = document.querySelectorAll(".task");
tasks.forEach((task) => {
    task.addEventListener("drag", (event) => {
        dragElement = task;
    });
});

const dragAddEventOnColmn = (column) => {
    // Adding hover-over class to each class for animation
    column.addEventListener("dragenter", (event) => {
        event.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", (event) => {
        event.preventDefault();
        column.classList.remove("hover-over");
    });

    // Make it Elegible for Drop
    column.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    // Drop Event
    column.addEventListener("drop", (event) => {
        event.preventDefault();

        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount();
    });
};

dragAddEventOnColmn(todo);
dragAddEventOnColmn(progress);
dragAddEventOnColmn(done);

// Modal related Logic
const toggleModalBTN = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const bg = document.querySelector(".modal .bg");
const addTaskBTN = document.querySelector("#add-new-task");

toggleModalBTN.addEventListener("click", () => {
    modal.classList.toggle("active");
});

bg.addEventListener("click", () => {
    modal.classList.toggle("active");
});

addTaskBTN.addEventListener("click", () => {
    const taskDescription = document.querySelector("#task-desc-input").value;
    const taskTitle = document.querySelector("#task-title-input").value;

    addTask(taskTitle, taskDescription, todo);

    updateTaskCount();

    modal.classList.toggle("active");

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";
});
