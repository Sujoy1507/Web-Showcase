function openFeatuers() {
    const mainSection = document.querySelector(".main-section");

    const allElems = document.querySelectorAll(".elem");
    const allfullElemPage = document.querySelectorAll(".fullElem");
    const fulPageBackBtn = document.querySelectorAll(
        ".fullElem .back-container .container"
    );

    allElems.forEach((elem) => {
        elem.addEventListener("click", () => {
            mainSection.style.display = "none";
            allfullElemPage.forEach((p) => (p.style.display = "none"));
            allfullElemPage[elem.id].style.display = "grid";
        });
    });

    fulPageBackBtn.forEach((back) => {
        back.addEventListener("click", () => {
            mainSection.style.display = "block";
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

// Daily planner
function dailyPlanner() {
    const dayPlanner = document.querySelector(".day-planner");
    let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

    let hours = Array.from(
        { length: 18 },
        (elem, index) => `${6 + index}:00-${7 + index}:00`
    );

    let wholeDaySum = "";
    hours.forEach((elem, index) => {
        let savedData = dayPlanData[index] || "";
        wholeDaySum += `<div class="day-planner-time">
                        <p>${elem}</p>
                        <input id='${index}' type="text" placeholder="..." value=${savedData}>
                    </div>`;
    });

    dayPlanner.innerHTML = wholeDaySum;

    const dayPlannerInput = document.querySelectorAll(".day-planner input");

    dayPlannerInput.forEach((elem) => {
        elem.addEventListener("input", () => {
            dayPlanData[elem.id] = elem.value;
            localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
        });
    });
}

dailyPlanner();

// Motivational Quoat

function motivationalQuote() {
    let motivationQuoat = document.querySelector(".motivation-2 h1");
    let motivationAuthor = document.querySelector(".motivation-3 h2");

    async function featchQuoat() {
        let responce = await fetch(`https://dummyjson.com/quotes/random`);
        let data = await responce.json();

        motivationQuoat.textContent = data.quote;
        motivationAuthor.textContent = data.author;
    }

    featchQuoat();
}
motivationalQuote();

//Pomodoro Timer
function pomodoroTimerTimer() {
    let timer = document.querySelector(".pomo-timer h1");
    let startTimer = document.querySelector(".pomo-timer .start-timer");
    let pauseTimer = document.querySelector(".pomo-timer .pause-timer");
    let resetTimer = document.querySelector(".pomo-timer .reset-timer");
    let session = document.querySelector(".pomo-timer .session");

    let isWorkSetion = true;

    let totalSecond = 25 * 60;

    function updateTimer() {
        let minutes = Math.floor(totalSecond / 60);
        let seconds = totalSecond % 60;

        timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
            seconds
        ).padStart("2", "0")}`;
    }
    updateTimer();

    let intervalId = null;

    function startTimerTimer() {
        clearInterval(intervalId);

        if (isWorkSetion) {
            session.innerHTML = "Work Session";
            session.style.backgroundColor = `var(--green)`;

            intervalId = setInterval(() => {
                if (totalSecond > 0) {
                    totalSecond--;
                    updateTimer();
                } else {
                    isWorkSetion = false;
                    clearInterval(intervalId);
                    timer.innerText = "05:00";
                    session.innerHTML = "Break";
                    totalSecond = 5 * 60;
                    session.style.backgroundColor = `var(--blue)`;
                }
            }, 1000);
        } else {
            session.innerHTML = "Break";
            session.style.backgroundColor = `var(--blue)`;

            intervalId = setInterval(() => {
                if (totalSecond > 0) {
                    totalSecond--;
                    updateTimer();
                } else {
                    isWorkSetion = true;
                    clearInterval(intervalId);
                    timer.innerText = "25:00";
                    session.innerHTML = "Work Session";
                    totalSecond = 25 * 60;
                    session.style.backgroundColor = `var(--green)`;
                }
            }, 1000);
        }
    }

    function pauseTimerTimer() {
        clearInterval(intervalId);
    }

    function resetTimerTimer() {
        clearInterval(intervalId);
        totalSecond = 25 * 60;
        updateTimer();
    }

    pauseTimer.addEventListener("click", pauseTimerTimer);
    startTimer.addEventListener("click", () => {
        clearInterval(intervalId);
        updateTimer();
        startTimerTimer();
    });
    resetTimer.addEventListener("click", resetTimerTimer);
}

pomodoroTimerTimer();

const city = "kolkata";
const apiKey = `b126310c87fd4ceca1655720252012`;
async function weatherApiCall() {
    let responce = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    let raw =await responce.json()
    let temp = raw.current.temp_c
    let wind = raw.current.wind_kph
    console.log(raw);
}
weatherApiCall();
