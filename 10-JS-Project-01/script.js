function openFeatures() {
    let allElem = document.querySelectorAll(".elem");
    let allElemPage = document.querySelectorAll(".allElems");
    let fullElemPage = document.querySelectorAll(".fullElem");
    let fullElemPageBackBtn = document.querySelectorAll(
        ".fullElem .back-container .back"
    );

    allElem.forEach((elem) => {
        elem.addEventListener("click", (val) => {
            fullElemPage[elem.id].style.display = "block";
            allElemPage.style.display = "none";
        });
    });
    fullElemPageBackBtn.forEach((back) => {
        back.addEventListener("click", () => {
            fullElemPage[back.id].style.display = "none";
            allElemPage.style.display = "flex";
        });
    });
}

openFeatures();

function timeFeature() {
    const month = document.querySelector(".month span");
    const date = document.querySelector(".date span");

    date.innerText = new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
    month.innerText = new Date().toLocaleString("en-IN", { month: "long" });
}

timeFeature();

const form = document.querySelector(".addTask form");
const taskInput = document.querySelector(".addTask form #task-input");
const taskDetailInput = document.querySelector(".addTask form textarea");
const taskCheckBox = document.querySelector(".addTask form #check");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log(taskInput.value);
    console.log(taskDetailInput.value);

    console.log(taskCheckBox.checked);
});
