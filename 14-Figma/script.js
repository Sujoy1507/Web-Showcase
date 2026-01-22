const menuForMobileOpenClose = () => {
    const menuBtn = document.querySelector(".menu-icon #menu-btn");
    const menuForMobile = document.querySelector(".menu-btn");

    let flag = true;
    menuBtn.addEventListener("click", () => {
        if (flag === true) {
            menuForMobile.style.height = "fit-content";
            flag = false;
        } else {
            menuForMobile.style.height = 0;
            flag = true;
        }
    });
};
menuForMobileOpenClose();

const loginPageOpenClose = () => {
    const loginPage = document.querySelector(".login-popup");
    const getStart = document.querySelectorAll(".get-start");
    const loginWindow = document.querySelector(".login-window");
    const menuForMobile = document.querySelector(".menu-btn");

    getStart.forEach((btn) => {
        btn.addEventListener("click", () => {
            loginPage.style.display = "block";
            menuForMobile.style.height = 0;
        });
    });

    loginPage.addEventListener("click", () => {
        loginPage.style.display = "none";
    });

    loginWindow.addEventListener("click", (e) => {
        e.stopPropagation();
    });
};

loginPageOpenClose();

const firstPageToSecondPage = () => {
    const loginDone = document.querySelector(".next");
    const firstPage = document.querySelector(".first-page");
    const secondPage = document.querySelector(".secondPage-container");
    const userNameInput = document.querySelector(".login-window input");
    const userName = document.querySelector(".username");
    const nameFirst = document.querySelector(".name-first");

    loginDone.addEventListener("click", () => {
        secondPage.style.display = "flex";
        firstPage.style.display = "none";
        nameFirst.textContent = userNameInput.value[0];
        userName.textContent = userNameInput.value;
    });

    //Second paga Work

    const userSideMenubtn = document.querySelector("#user-sidebar-menu-btn");
    const userSideMenu = document.querySelector(".user-menu-side-bar");

    let flag = true;
    userSideMenubtn.addEventListener("click", () => {
        if (flag) {
            userSideMenu.style.display = "block";

            flag = false;
        } else {
            userSideMenu.style.display = "none";
            flag = true;
        }
    });
};

firstPageToSecondPage();

// Add button toggle
const addElementBtn = document.querySelector("#add");
const expand = document.querySelector(".expand");

let isOpen = false;
addElementBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    expand.style.display = isOpen ? "block" : "none";
});

// Canvas & Buttons
const canvas = document.querySelector(".workspace #canvas .canvas");
const rectangleBtn = document.querySelector(".expand .rect");
const textBtn = document.querySelector(".expand .textbox");

let storeElements = [];

const renderElement = (data) => {
    let div = document.getElementById(data.id);

    if (!div) {
        div = document.createElement("div");
        div.id = data.id;
        div.classList.add("canvas-element", data.class);
        // div.className = "canvas-element";
        div.style.position = "absolute";
        canvas.appendChild(div);
    }

    div.style.width = data.width + "px";
    div.style.height = data.height + "px";
    div.style.top = data.top + "px";
    div.style.left = data.left + "px";
    div.style.background = data.background;
    div.style.color = data.color;
    div.style.border = data.border ? "1px solid white" : "none";
    div.innerText = data.text || "";

    if (data.type === "text") {
        div.contentEditable = true;
    } else {
        div.contentEditable = false;
    }
};

// Add Rectangle
rectangleBtn.addEventListener("click", () => {
    const rectData = {
        id: "el" + Date.now(),
        type: "rectangle",
        width: 200,
        height: 200,
        top: canvas.clientHeight / 2 - 100,
        left: canvas.clientWidth / 2 - 100,
        background: "red",
        color: "white",
        border: true,
        text: "",
        isSelected: false,
        class: "rectangle-element",
    };

    storeElements.push(rectData);
    renderElement(rectData);
});

// Add Text Box
textBtn.addEventListener("click", () => {
    const textData = {
        id: "el" + Date.now(),
        type: "text",
        width: 200,
        height: 80,
        top: canvas.clientHeight / 2 - 40,
        left: canvas.clientWidth / 2 - 100,
        background: "transparent",
        color: "white",
        border: true,
        text: "Edit me",
        isSelected: false,
        class: "text-element",
    };

    storeElements.push(textData);
    renderElement(textData);
});

let selectedElementId = null;

canvas.addEventListener("click", (event) => {
    const element = event.target.closest(".canvas-element");
    if (element) {
        selectedElementId = element.id;
    } else {
        selectedElementId = null;
    }
    updateSelection();
});


function updateSelection() {
    storeElements.forEach(item => {
        const div = document.getElementById(item.id);
        if (!div) return;

        if (item.id === selectedElementId) {
            div.style.outline = "2px solid blue";
        } else {
            div.style.outline = "none";
        }
    });
}


// draging Function

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

function enableDragging() {
    canvas.addEventListener("mousedown", (event) => {
        const element = event.target.closest(".canvas-element");
        if (!element) return;

        selectedElementId = element.id;
        isDragging = true;

        const rect = element.getBoundingClientRect();
        dragOffsetX = event.clientX - rect.left;
        dragOffsetY = event.clientY - rect.top;
    });

    canvas.addEventListener("mousemove", (event) => {
        if (!isDragging || !selectedElementId) return;

        const element = document.getElementById(selectedElementId);
        if (!element) return;

        const canvasRect = canvas.getBoundingClientRect();

        let newLeft = event.clientX - canvasRect.left - dragOffsetX;
        let newTop = event.clientY - canvasRect.top - dragOffsetY;

        const maxLeft = canvas.clientWidth - element.offsetWidth;
        const maxTop = canvas.clientHeight - element.offsetHeight;

        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        element.style.left = newLeft + "px";
        element.style.top = newTop + "px";

        const data = storeElements.find(el => el.id === selectedElementId);
        if (data) {
            data.left = newLeft;
            data.top = newTop;
        }
    });

    canvas.addEventListener("mouseup", () => {
        isDragging = false;
    });

    canvas.addEventListener("mouseleave", () => {
        isDragging = false;
    });
}


enableDragging();
