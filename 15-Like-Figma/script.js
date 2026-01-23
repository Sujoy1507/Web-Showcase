let storeElements = [];

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
    div.style.border = data.border ? "1px solid white" : "none";
    div.style.zIndex = data.zIndex;
    div.innerText = data.text || "";

    if (data.type === "rectangle") {
        div.classList.add(data.class);
    } else if (data.type === "circle") {
        div.classList.add(data.class);
        div.style.borderRadius = data.borderRadius;
    } else if (data.type === "triangle") {
        div.classList.add(data.class);
        div.style.width = "0";
        div.style.height = "0";
        div.style.background = "transparent";

        div.style.borderLeft = data.borderLeft + "px solid transparent";
        div.style.borderRight = data.borderRight + "px solid transparent";
        div.style.borderBottom = data.borderBottom + "px solid " + data.color;
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

triangleBtn.addEventListener("click", () => {
    const triangleData = {
        id: "el" + Date.now(),
        type: "triangle",
        width: 0,
        height: 0,
        top: canvas.clientHeight / 2,
        left: canvas.clientWidth / 2,
        background: "transparent",
        color: "red",
        border: false,
        text: "",
        isSelected: false,
        class: "triangle-element",
        zIndex: 1,
        rotation: 0,

        borderLeft: 100,
        borderRight: 100,
        borderBottom: 200,
    };
    storeElements.push(triangleData);
    renderElement(triangleData);
});
