const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const restartButton = document.querySelector(".btn-restart");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");

//arrows 
const arrowUp = document.querySelector('.c-up');
const arrowDown = document.querySelector('.c-down');
const arrowLeft = document.querySelector('.c-left');
const arrowRight = document.querySelector('.c-right');

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

let direction = "right";

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        block.innerHTML = `${row}-${col}`;
        blocks[`${row}-${col}`] = block;
    }
}

arrowUp.addEventListener('click',()=>{
     direction = "up";
}) 
arrowDown.addEventListener('click',()=>{
     direction = "down";
}) 
arrowLeft.addEventListener('click',()=>{
     direction = "left";
}) 
arrowRight.addEventListener('click',()=>{
     direction = "right";
}) 

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

        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";

        return;
    }

    if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols),
        };
        blocks[`${food.x}-${food.y}`].classList.add("food");
        snake.unshift(head);
    }

    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });
    snake.unshift(head);
    snake.pop();
    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    });
}

// intervalId = setInterval(() => {
//     render();
// }, 200);

startButton.addEventListener("click", () => {
    modal.style.display = "none";
    intervalId = setInterval(() => {
        render();
    }, 300);
});

restartButton.addEventListener("click", () => {
    restartGame();
});

function restartGame(params) {
    direction = "right";
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    modal.style.display = "none";
    snake = [{ x: 1, y: 3 }];
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols),
    };
    intervalId = setInterval(() => {
        render();
    }, 300);
}

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
