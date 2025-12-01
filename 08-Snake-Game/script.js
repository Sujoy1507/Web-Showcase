const board = document.querySelector(".board");
const blockWidth = 40;
const blockHeight = 40;
const fill = document.querySelector(".fill");

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const blocks = [];
let snake = [{ x: 5, y: 5 }];
let food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
};

let direction = "up";

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        block.innerText = `${row}-${col}`;
        blocks[`${row}-${col}`] = block;
    }
}

function render() {
    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    });
}

setInterval(() => {
    let head = null;

    if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === "down") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction === "up") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }

    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    const foodBlock = blocks[`${food.y}-${food.x}`]; // row-col
    foodBlock.classList.add("food");

    snake.unshift(head);
    snake.pop();

    render();
}, 300);
