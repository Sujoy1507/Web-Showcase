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

//Weather function

function weatherFunctionality() {
    const timeDetail = document.querySelector(".time-detail");
    const tempDetails = document.querySelector(".temp-details");
    const tempValue = document.querySelector(".temp-details span");

    const humidity = document.querySelector(".humidity span");
    const precipitation = document.querySelector(".precipitation");
    const wind = document.querySelector(".wind span");

    const cityInput = document.querySelector(".city");
    const stateText = document.querySelector(".state");
    const countryText = document.querySelector(".country");

    const searchBtn = document.querySelector(".header2 button");

    let timeDetailTimeSet = null;
    timeDetailTimeSet = setInterval(() => {
        const now = new Date();

        const yyyy = now.getFullYear();
        const mmth = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");

        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");

        timeDetail.textContent = `${yyyy}-${mmth}-${dd} ${hh}:${mm}:${ss}`;
    }, 1000);

    let city = "kolkata";

    const apiKey = `b126310c87fd4ceca1655720252012`;
    async function weatherApiCall() {
        let responce = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );

        let raw = await responce.json();
        wind.textContent = raw.current.wind_kph;
        tempValue.textContent = raw.current.temp_c;
        stateText.textContent = raw.location.region;
        countryText.textContent = raw.location.country;
        humidity.textContent = raw.current.humidity;
        precipitation.textContent = raw.current.condition.text;

        if (cityInput.value) {
            timeDetailTimeSet = null;
        } else {
            timeDetail.textContent = raw.location.localTime;
        }
    }
    weatherApiCall();

    searchBtn.addEventListener("click", () => {
        city = cityInput.value;
        weatherApiCall();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            city = cityInput.value;
            weatherApiCall();
        }
    });
}

weatherFunctionality();

let theme = document.querySelector(".theme");
let rootElement = document.documentElement;

let counter = 0;
theme.addEventListener("click", () => {
    counter++;
    if (counter === 1) {
        rootElement.style.setProperty("--pri", "#36622B");
        rootElement.style.setProperty("--sec", "#729D39");
        rootElement.style.setProperty("--tri1", "#C6E377");
        rootElement.style.setProperty("--tri2", "#FBFAD3");
        rootElement.style.setProperty("--tri3", "#F6B1CE");
        rootElement.style.setProperty("--tri4", "#F7E396");
    } else if (counter === 2) {
        rootElement.style.setProperty("--pri", "#cdb4db");
        rootElement.style.setProperty("--sec", "#ffc8dd");
        rootElement.style.setProperty("--tri1", "#ffafcc");
        rootElement.style.setProperty("--tri2", "#bde0fe");
        rootElement.style.setProperty("--tri3", "#a2d2ff");
        rootElement.style.setProperty("--tri4", "#F7E396");
    } else if (counter === 3) {
        rootElement.style.setProperty("--pri", "#6b705c");
        rootElement.style.setProperty("--sec", "#cb997e");
        rootElement.style.setProperty("--tri1", "#a5a58d");
        rootElement.style.setProperty("--tri2", "#ffe8d6");
        rootElement.style.setProperty("--tri3", "#ddbea9");
        rootElement.style.setProperty("--tri4", "#a5a58d");
    } else if (counter === 4) {
        rootElement.style.setProperty("--pri", "#0f172a");
        rootElement.style.setProperty("--sec", "#22d3ee");
        rootElement.style.setProperty("--tri1", "#67e8f9");
        rootElement.style.setProperty("--tri2", "#164e63");
        rootElement.style.setProperty("--tri3", "#06b6d4");
        rootElement.style.setProperty("--tri4", "#0ea5e9");
    } else if (counter === 5) {
        rootElement.style.setProperty("--pri", "#064e3b");
        rootElement.style.setProperty("--sec", "#10b981");
        rootElement.style.setProperty("--tri1", "#34d399");
        rootElement.style.setProperty("--tri2", "#d1fae5");
        rootElement.style.setProperty("--tri3", "#6ee7b7");
        rootElement.style.setProperty("--tri4", "#047857");
    } else if (counter === 6) {
        rootElement.style.setProperty("--pri", "#7c2d12");
        rootElement.style.setProperty("--sec", "#f97316");
        rootElement.style.setProperty("--tri1", "#fb923c");
        rootElement.style.setProperty("--tri2", "#fed7aa");
        rootElement.style.setProperty("--tri3", "#fdba74");
        rootElement.style.setProperty("--tri4", "#ea580c");
    } else if (counter === 7) {
        rootElement.style.setProperty("--pri", "#1e3a8a");
        rootElement.style.setProperty("--sec", "#3b82f6");
        rootElement.style.setProperty("--tri1", "#60a5fa");
        rootElement.style.setProperty("--tri2", "#bfdbfe");
        rootElement.style.setProperty("--tri3", "#93c5fd");
        rootElement.style.setProperty("--tri4", "#1d4ed8");
    } else if (counter === 8) {
        rootElement.style.setProperty("--pri", "#3c096c");
        rootElement.style.setProperty("--sec", "#7b2cbf");
        rootElement.style.setProperty("--tri1", "#9d4edd");
        rootElement.style.setProperty("--tri2", "#e0aaff");
        rootElement.style.setProperty("--tri3", "#c77dff");
        rootElement.style.setProperty("--tri4", "#5a189a");
    } else if (counter === 9) {
        rootElement.style.setProperty("--pri", "#6d6875");
        rootElement.style.setProperty("--sec", "#b5838d");
        rootElement.style.setProperty("--tri1", "#e5989b");
        rootElement.style.setProperty("--tri2", "#ffb4a2");
        rootElement.style.setProperty("--tri3", "#ffcdb2");
        rootElement.style.setProperty("--tri4", "#9d8189");
    } else if (counter === 10) {
        rootElement.style.setProperty("--pri", "#432818");
        rootElement.style.setProperty("--sec", "#99582a");
        rootElement.style.setProperty("--tri1", "#bb9457");
        rootElement.style.setProperty("--tri2", "#ffe6a7");
        rootElement.style.setProperty("--tri3", "#ddb892");
        rootElement.style.setProperty("--tri4", "#6f1d1b");
    } else if (counter === 11) {
        rootElement.style.setProperty("--pri", "#134e4a");
        rootElement.style.setProperty("--sec", "#2dd4bf");
        rootElement.style.setProperty("--tri1", "#5eead4");
        rootElement.style.setProperty("--tri2", "#ccfbf1");
        rootElement.style.setProperty("--tri3", "#99f6e4");
        rootElement.style.setProperty("--tri4", "#0f766e");
    } else if (counter === 12) {
        rootElement.style.setProperty("--pri", "#2b0f3f");
        rootElement.style.setProperty("--sec", "#ff2e88");
        rootElement.style.setProperty("--tri1", "#ff5da2");
        rootElement.style.setProperty("--tri2", "#ffd6e8");
        rootElement.style.setProperty("--tri3", "#ff8dc7");
        rootElement.style.setProperty("--tri4", "#c9184a");

        counter = 0;
    }
});

const input = document.querySelector(".add-goal input");
const addBtn = document.querySelector(".add-goal button");
const grid = document.querySelector(".goals-grid");

const STORAGE_KEY = "daily_goals";

let goals = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

/* ---------- save ---------- */
function saveGoals() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

/* ---------- render ---------- */
function renderGoals() {
    grid.innerHTML = "";

    goals.forEach((goal, index) => {
        const goalDiv = document.createElement("div");
        goalDiv.classList.add("goal");
        if (goal.done) goalDiv.classList.add("done");

        goalDiv.innerHTML = `
            <span>${goal.text}</span>
            <div class="actions">
                <button class="complete">✓</button>
                <button class="delete">✕</button>
            </div>
        `;

        /* complete */
        goalDiv.querySelector(".complete").addEventListener("click", () => {
            goals[index].done = !goals[index].done;
            saveGoals();
            renderGoals();
        });

        /* delete */
        goalDiv.querySelector(".delete").addEventListener("click", () => {
            goals.splice(index, 1);
            saveGoals();
            renderGoals();
        });

        grid.appendChild(goalDiv);
    });
}

/* ---------- add ---------- */
addBtn.addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) return;

    goals.push({
        text: value,
        done: false,
    });

    input.value = "";
    saveGoals();
    renderGoals();
});

/* ---------- enter key ---------- */
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addBtn.click();
});

/* ---------- load on refresh ---------- */
renderGoals();
