const SNAKE_SPEED = 5;

const gameBoard = document.getElementById('game-board');

// delay-> ms
let gameOver=false;

const main= ()=>{
    // window.requestAnimationFrame(main);
    update();
    draw();
    if(gameOver){
        alert("Game Over");
        clearInterval(gameLoop);
    }
};
//window.requestAnimationFrame(main); will create a loop!
// window.requestAnimationFrame(main);
// let intervalID = setInterval(function, delay, arg1, arg2, ...);
let gameLoop=setInterval(main,1000/SNAKE_SPEED);


const update= ()=>{
    console.log("Updating");
    updateSnake();
    updateFood();
    gameOver=checkGameOver();
};

const checkGameOver= ()=>{
    return snakeOutOfBounds()||snakeIntersectSelf();
};

const draw = () => {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
	drawFood(gameBoard);
  };
  