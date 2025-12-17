function openFeatuers() {
    const allElems = document.querySelectorAll(".elem");
    const allfullElemPage = document.querySelectorAll(".fullElem");
    const fulPageBackBtn = document.querySelectorAll(
        ".fullElem .back-container .container"
    );

    allElems.forEach((elem) => {
        elem.addEventListener("click", () => {
            allfullElemPage[elem.id].style.display = "block";
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
