let storeElements = [];
let selectedElement = null;

const pencilBtn = document.querySelector(".pencilBtn");
const brushBtn = document.querySelector(".brushBtn");
const rectangleBtn = document.querySelector(".rectangleBtn");
const circleBtn = document.querySelector(".circleBtn");
const triangleBtn = document.querySelector(".triangleBtn");
const textBoxBtn = document.querySelector(".textBoxBtn");
const canvas = document.querySelector("#canvas");

const allTools = [
    pencilBtn,
    brushBtn,
    rectangleBtn,
    circleBtn,
    triangleBtn,
    textBoxBtn,
];

function activateTool(activeBtn) {
    allTools.forEach((btn) => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}

pencilBtn.addEventListener("click", () => activateTool(pencilBtn));
brushBtn.addEventListener("click", () => activateTool(brushBtn));
rectangleBtn.addEventListener("click", () => activateTool(rectangleBtn));
circleBtn.addEventListener("click", () => activateTool(circleBtn));
triangleBtn.addEventListener("click", () => activateTool(triangleBtn));
textBoxBtn.addEventListener("click", () => activateTool(textBoxBtn));

// Rendar Element on the canvas
const renderElement = (data) => {
    let div = document.createElement("div");
    div.dataset.id = data.id;
    div.style.position = "absolute";
    div.style.top = data.top + "px";
    div.style.left = data.left + "px";
    div.style.color = data.color;
    div.style.height = data.height + "px";
    div.style.width = data.width + "px";
    div.style.background = data.background;
    div.style.transform = `rotate(${data.rotation}deg)`;
    div.style.border = data.border ? "1px solid white" : "none";
    div.style.zIndex = data.zIndex;
    div.innerText = data.text || "";

    if (data.type === "rectangle") {
        div.classList.add(data.class);
        div.contentEditable = false;
    } else if (data.type === "circle") {
        div.classList.add(data.class);
        div.contentEditable = false;
        div.style.borderRadius = data.borderRadius;
    } else if (data.type === "text") {
        div.classList.add(data.class);
        div.contentEditable = true;
        div.style.cursor = "text";
    }
    canvas.appendChild(div);
};

// Rectangle Creation
rectangleBtn.addEventListener("click", () => {
    const rectData = {
        id: "el" + Date.now(),
        type: "rectangle",
        width: 200,
        height: 200,
        top: canvas.clientHeight / 2 - 100,
        left: canvas.clientWidth / 2 - 100,
        background: "red",
        color: "black",
        border: true,
        text: "",
        isSelected: false,
        class: "rectangle-element",
        zIndex: 1,
        rotation: 0,
    };

    storeElements.push(rectData);
    renderElement(rectData);
    console.log(storeElements);
});

// Circle Creation
circleBtn.addEventListener("click", () => {
    const circleData = {
        id: "el" + Date.now(),
        type: "circle",
        width: 200,
        height: 200,
        top: canvas.clientHeight / 2 - 100,
        left: canvas.clientWidth / 2 - 100,
        background: "red",
        color: "black",
        border: true,
        text: "",
        isSelected: false,
        class: "circle-element",
        zIndex: 1,
        rotation: 0,
        borderRadius: "50%",
    };

    storeElements.push(circleData);
    renderElement(circleData);
});

textBoxBtn.addEventListener("click", () => {
    const textData = {
        id: "el" + Date.now(),
        type: "text",
        width: 200,
        height: 80,
        top: canvas.clientHeight / 2 - 40,
        left: canvas.clientWidth / 2 - 100,
        background: "rgba(0, 0, 0, 0.1)",
        color: "black",
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

// selectedElement

let selectedDomEl = null;

canvas.addEventListener("click", (event) => {
    const el = event.target.closest("div");
    if (!el) return;

    event.stopPropagation();

    if (selectedDomEl) {
        selectedDomEl.style.outline = "none";
    }

    if (resizeMode) {
        resizeEl = el;
        addResizeHandles(el);
    }

    selectedDomEl = el;

    selectedElement = storeElements.find((item) => item.id === el.dataset.id);

    el.style.outline = "2px dashed black";

    console.log("Selected:", selectedElement);
});

// Move Function

const moveBtn = document.querySelector(".moveBtn");
let moveMode = false;
let activeEl = null;
let offsetX = 0;
let offsetY = 0;
let moveFlag = true;

moveBtn.addEventListener("click", () => {
    if (moveFlag) {
        moveMode = true;
        moveFlag = false;
    } else {
        moveMode = false;
        moveFlag = true;
    }
});
let isDragging = false;

canvas.addEventListener("mousedown", (e) => {
    if (!moveMode) return;
    if (e.target.classList.contains("resize-handle")) return;

    const el = e.target.closest("div");
    if (!el) return;

    activeEl = el;
    isDragging = true;

    const rect = el.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
});

canvas.addEventListener("mousemove", (e) => {
    if (!moveMode || !activeEl || !isDragging) return;

    const canvasRect = canvas.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    let newLeft = e.clientX - canvasRect.left - offsetX;
    let newTop = e.clientY - canvasRect.top - offsetY;

    newLeft = Math.max(0, Math.min(newLeft, canvas.clientWidth - elRect.width));
    newTop = Math.max(0, Math.min(newTop, canvas.clientHeight - elRect.height));

    activeEl.style.left = newLeft + "px";
    activeEl.style.top = newTop + "px";
});

canvas.addEventListener("mouseup", () => {
    activeEl = null;
    isDragging = false;
});

// resize function

// Resize state variables
const resizeBtn = document.querySelector(".resizeBtn");
let resizeMode = false;
let resizeEl = null;
let resizeDir = null;
let startX = 0;
let startY = 0;
let startW = 0;
let startH = 0;
let resizeFlag = true;

resizeBtn.addEventListener("click", () => {
    resizeMode = !resizeMode;

    if (resizeMode) {
        moveMode = false;
        moveFlag = true;
    }

    removeResizeHandles();
});

// create and remove handles

function removeResizeHandles() {
    document.querySelectorAll(".resize-handle").forEach((h) => h.remove());
}

function addResizeHandles(el) {
    removeResizeHandles();

    ["tl", "tr", "bl", "br"].forEach((pos) => {
        const handle = document.createElement("div");
        handle.className = `resize-handle ${pos}`;
        handle.dataset.dir = pos;
        el.appendChild(handle);
    });
}

// start resize
canvas.addEventListener("mousedown", (e) => {
    if (!resizeMode) return;

    const handle = e.target.closest(".resize-handle");
    if (!handle) return;

    resizeEl = handle.parentElement;
    resizeDir = handle.dataset.dir;

    const rect = resizeEl.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startW = rect.width;
    startH = rect.height;

    e.stopPropagation();
});

// resize on mousemove

canvas.addEventListener("mousemove", (e) => {
    if (!resizeEl || !resizeDir) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (resizeDir.includes("r")) {
        resizeEl.style.width = startW + dx + "px";
    }

    if (resizeDir.includes("l")) {
        resizeEl.style.width = startW - dx + "px";
        resizeEl.style.left = resizeEl.offsetLeft + dx + "px";
    }

    if (resizeDir.includes("b")) {
        resizeEl.style.height = startH + dy + "px";
    }

    if (resizeDir.includes("t")) {
        resizeEl.style.height = startH - dy + "px";
        resizeEl.style.top = resizeEl.offsetTop + dy + "px";
    }
});

// stop resize
canvas.addEventListener("mouseup", () => {
    resizeEl = null;
    resizeDir = null;
});
