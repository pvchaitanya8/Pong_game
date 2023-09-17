const leftPaddle = document.getElementById('left-paddle');
const rightPaddle = document.getElementById('right-paddle');
const ball = document.getElementById('ball');
const gameContainer = document.querySelector('.game-container');

const paddleSpeed = 5;
const ballSpeedX = 5;
const ballSpeedY = 2;
const paddleHeight = 100;
const paddleWidth = 20;
const ballSize = 20;

let leftPaddleY = gameContainer.clientHeight / 2 - paddleHeight / 2;
let rightPaddleY = gameContainer.clientHeight / 2 - paddleHeight / 2;
let ballX = gameContainer.clientWidth / 2 - ballSize / 2;
let ballY = gameContainer.clientHeight / 2 - ballSize / 2;
let ballSpeedXDirection = 1;
let ballSpeedYDirection = 1;

const keys = {};

// Handle keydown and keyup events for smoother movement
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function updateGame() {
    // Update ball position
    ballX += ballSpeedX * ballSpeedXDirection;
    ballY += ballSpeedY * ballSpeedYDirection;

    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY >= gameContainer.clientHeight - ballSize) {
        ballSpeedYDirection *= -1;
    }

    // Ball collision with paddles
    if (
        (ballX <= paddleWidth &&
            ballY >= leftPaddleY &&
            ballY <= leftPaddleY + paddleHeight) ||
        (ballX + ballSize >= gameContainer.clientWidth - paddleWidth &&
            ballY >= rightPaddleY &&
            ballY <= rightPaddleY + paddleHeight)
    ) {
        ballSpeedXDirection *= -1;
    }

    // Ball out of bounds
    if (ballX <= 0 || ballX + ballSize >= gameContainer.clientWidth) {
        // Reset ball position
        ballX = gameContainer.clientWidth / 2 - ballSize / 2;
        ballY = gameContainer.clientHeight / 2 - ballSize / 2;
        ballSpeedXDirection *= -1;
    }

    // Move paddles based on key input
    if (keys['ArrowUp'] && rightPaddleY > 0) {
        rightPaddleY -= paddleSpeed;
    } else if (
        keys['ArrowDown'] &&
        rightPaddleY + paddleHeight < gameContainer.clientHeight
    ) {
        rightPaddleY += paddleSpeed;
    }

    if (keys['w'] && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed;
    } else if (keys['s'] && leftPaddleY + paddleHeight < gameContainer.clientHeight) {
        leftPaddleY += paddleSpeed;
    }

    // Update paddle positions
    leftPaddle.style.top = leftPaddleY + 'px';
    rightPaddle.style.top = rightPaddleY + 'px';
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    requestAnimationFrame(updateGame);
}

// Start the game loop
updateGame();
