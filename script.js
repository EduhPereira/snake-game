const canvas = document.getElementById('snake');
const context = canvas.getContext('2d');

easyBtn = document.getElementById('easy');
normalBtn = document.getElementById('normal');
hardBtn = document.getElementById('hard');

const score = document.getElementById('score');

let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right';
let food = {
    x: Math.floor(Math.random() * 15 + 1 ) * box,
    y: Math.floor(Math.random() * 15 + 1 ) * box
}
let scoreValue = 0;

const createBG = () => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

const createSnake = () => {
    for(i = 0; i < snake.length; i++){
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

const createFood = () => {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', updateDirection);

function updateDirection (event) {
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

const startGame = () => {

    if(snake[0].x == 16 * box && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y == 16 * box && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(startGame);
            alert(`GAME OVER \nSua Pontuação : ${scoreValue}`);
            document.location.reload(true);
        }
    }

    createBG();
    createFood();
    createSnake();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction === 'right') snakeX += box;
    if(direction === 'left') snakeX -= box;
    if(direction === 'up') snakeY -= box;
    if(direction === 'down') snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        scoreValue++;
        score.innerText = scoreValue;
        food.x = Math.floor(Math.random() * 15 + 1 ) * box;
        food.y = Math.floor(Math.random() * 15 + 1 ) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

// let game = setInterval(startGame, 100);

easyBtn.addEventListener('click', () => {let game = setInterval(startGame, 180);});

normalBtn.addEventListener('click', () => {let game = setInterval(startGame, 120);});

hardBtn.addEventListener('click', () => {let game = setInterval(startGame, 60);});