const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let dragElement = null;
const columns = [todo, progress, done];

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

        columns.forEach((col) => {
            const task = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            count.textContent = task.length;
        });
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

    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
    <h2>${taskTitle}</h2>
                        <p>
                            ${taskDescription}
                        </p>
                        <button>Delete</button>`;

    todo.appendChild(div);

    columns.forEach((col) => {
            const task = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            count.textContent = task.length;
        });
    div.addEventListener("drag", (event) => {
        dragElement = div;
    });

    modal.classList.toggle("active");
});
