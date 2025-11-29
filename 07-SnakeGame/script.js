const board = document.querySelector(".board");

const blockWidth = 40;
const blockHeight = 40;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let intervalId = null;
let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
};

const blocks = [];
let snake = [{ x: 1, y: 3 }];

let direction = "up";

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        block.innerHTML = `${row}-${col}`;
        blocks[`${row}-${col}`] = block;
    }
}

function render() {
    let head = null;

    blocks[`${food.x}-${food.y}`].classList.add("food");


    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    }

    if (head.x < 0 || head.y < 0 || head.x >= rows || head.y >= cols) {
        clearInterval(intervalId);
    }

    // if(head.x===food.x&&head.y===food.y){

    // }


    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });
    snake.unshift(head);
    snake.pop();
    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    });
}

intervalId = setInterval(() => {
    render();
}, 400);

addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        direction = "up";
    }
    if (event.key === "ArrowDown") {
        direction = "down";
    }
    if (event.key === "ArrowRight") {
        direction = "right";
    }
    if (event.key === "ArrowLeft") {
        direction = "left";
    }
});
