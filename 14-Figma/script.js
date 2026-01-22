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
    div.style.zIndex = data.zIndex;
    div.style.left = data.left + "px";
    div.style.background = data.background;
    div.style.color = data.color;
    div.style.border = data.border ? "1px solid white" : "none";
    div.innerText = data.text || "";
    div.style.transform = `rotate(${data.rotation}deg)`;

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
        zIndex: 1,
        rotation: 0,
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
        zIndex: 1,
        rotation: 0,
    };

    storeElements.push(textData);
    renderElement(textData);
});

let selectedElementId = null;

function updateSelection() {
    storeElements.forEach((item) => {
        const div = document.getElementById(item.id);
        if (!div) return;

        div.querySelectorAll(".resize-handle").forEach(h => h.remove());
        div.querySelectorAll(".rotate-handle").forEach(h => h.remove());

        if (item.id === selectedElementId) {
            div.style.outline = "2px solid blue";
            item.zIndex = 100;
            addResizeHandles(div);
            addRotateHandle(div);
        } else {
            div.style.outline = "none";
            item.zIndex = 1;
        }
    });
}


// draging Function

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

// Draging Function
function enableDragging() {
    canvas.addEventListener("mousedown", (event) => {
        const element = event.target.closest(".canvas-element");
        if (!element) return;
        if (event.target.closest(".resize-handle")) return;
        if (event.target.closest(".rotate-handle")) return;

        selectedElementId = element.id;
        updateSelection();

        isDragging = true;

        const rect = element.getBoundingClientRect();
        dragOffsetX = event.clientX - rect.left;
        dragOffsetY = event.clientY - rect.top;
    });

    canvas.addEventListener("mousemove", (event) => {
        if (isRotating) return;
        if (isResizing) return;
        if (!isDragging) return;

        const element = document.getElementById(selectedElementId);
        if (!element) return;

        const canvasRect = canvas.getBoundingClientRect();

        let left = event.clientX - canvasRect.left - dragOffsetX;
        let top = event.clientY - canvasRect.top - dragOffsetY;

        if (left < 0) left = 0;
        if (top < 0) top = 0;

        const maxLeft = canvas.clientWidth - element.offsetWidth;
        const maxTop = canvas.clientHeight - element.offsetHeight;

        if (left > maxLeft) left = maxLeft;
        if (top > maxTop) top = maxTop;

        element.style.left = left + "px";
        element.style.top = top + "px";

        const data = storeElements.find((el) => el.id === selectedElementId);
        if (data) {
            data.left = left;
            data.top = top;
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

// Resize function

let isResizing = false;
let resizeDir = null;

let startX = 0;
let startY = 0;
let startWidth = 0;
let startHeight = 0;
let startTop = 0;
let startLeft = 0;

const MIN_WIDTH = 50;
const MIN_HEIGHT = 40;

// Resize handel add

function addResizeHandles(element) {
    element.querySelectorAll(".resize-handle").forEach((h) => h.remove());

    const positions = ["tl", "tr", "bl", "br"];

    positions.forEach((pos) => {
        const handle = document.createElement("div");
        handle.className = "resize-handle";
        handle.dataset.resize = pos;
        handle.style.position = "absolute";
        handle.style.width = "10px";
        handle.style.height = "10px";
        handle.style.background = "white";
        handle.style.border = "1px solid black";

        if (pos === "tl") {
            handle.style.top = "-5px";
            handle.style.left = "-5px";
        }
        if (pos === "tr") {
            handle.style.top = "-5px";
            handle.style.right = "-5px";
        }
        if (pos === "bl") {
            handle.style.bottom = "-5px";
            handle.style.left = "-5px";
        }
        if (pos === "br") {
            handle.style.bottom = "-5px";
            handle.style.right = "-5px";
        }

        element.appendChild(handle);
    });
}

// Mouse down for resize

canvas.addEventListener("mousedown", (event) => {
    const handle = event.target.closest(".resize-handle");
    if (!handle) return;

    const element = handle.parentElement;
    selectedElementId = element.id;

    isResizing = true;
    resizeDir = handle.dataset.resize;

    startX = event.clientX;
    startY = event.clientY;

    startWidth = element.offsetWidth;
    startHeight = element.offsetHeight;
    startTop = element.offsetTop;
    startLeft = element.offsetLeft;

    event.stopPropagation();
});

// Mouse move resize logic

canvas.addEventListener("mousemove", (event) => {
    if (!isResizing) return;

    const element = document.getElementById(selectedElementId);
    if (!element) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    let width = startWidth;
    let height = startHeight;
    let top = startTop;
    let left = startLeft;

    if (resizeDir === "br") {
        width += dx;
        height += dy;
    }

    if (resizeDir === "bl") {
        width -= dx;
        height += dy;
        left += dx;
    }

    if (resizeDir === "tr") {
        width += dx;
        height -= dy;
        top += dy;
    }

    if (resizeDir === "tl") {
        width -= dx;
        height -= dy;
        left += dx;
        top += dy;
    }

    if (width < MIN_WIDTH) width = MIN_WIDTH;
    if (height < MIN_HEIGHT) height = MIN_HEIGHT;

    element.style.width = width + "px";
    element.style.height = height + "px";
    element.style.top = top + "px";
    element.style.left = left + "px";

    const data = storeElements.find((el) => el.id === selectedElementId);
    if (data) {
        data.width = width;
        data.height = height;
        data.top = top;
        data.left = left;
    }
});

// Mouse up stop resize

canvas.addEventListener("mouseup", () => {
    isResizing = false;
    resizeDir = null;
});

// Rotation Logic

// Add rotate handle
function addRotateHandle(element) {
    element.querySelectorAll(".rotate-handle").forEach((h) => h.remove());

    const handle = document.createElement("div");
    handle.className = "rotate-handle";

    handle.style.position = "absolute";
    handle.style.width = "12px";
    handle.style.height = "12px";
    handle.style.background = "yellow";
    handle.style.borderRadius = "50%";
    handle.style.top = "-25px";
    handle.style.left = "50%";
    handle.style.transform = "translateX(-50%)";
    handle.style.cursor = "grab";

    element.appendChild(handle);
}

// rotate state variables

let isRotating = false;
let startAngle = 0;
let startRotation = 0;

// Mouse down on rotate handle event
canvas.addEventListener("mousedown", (event) => {
    const handle = event.target.closest(".rotate-handle");
    if (!handle) return;

    const element = handle.parentElement;
    selectedElementId = element.id;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    startAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX);

    const data = storeElements.find((el) => el.id === selectedElementId);
    startRotation = data ? data.rotation : 0;

    isRotating = true;
    event.stopPropagation();
});

// Mouse move rotation logic

canvas.addEventListener("mousemove", (event) => {
    if (!isRotating) return;

    const element = document.getElementById(selectedElementId);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const currentAngle = Math.atan2(
        event.clientY - centerY,
        event.clientX - centerX,
    );

    const angleDiff = currentAngle - startAngle;
    const deg = startRotation + angleDiff * (180 / Math.PI);

    element.style.transform = `rotate(${deg}deg)`;

    const data = storeElements.find((el) => el.id === selectedElementId);
    if (data) {
        data.rotation = deg;
    }
});

canvas.addEventListener("mouseup", () => {
    isRotating = false;
});
