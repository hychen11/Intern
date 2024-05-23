const snakeBody=[
    {x:11,y:11},
    {x:11,y:10},
    {x:11,y:9},
];

//move down
const updateSnake=()=>{
    snakeBody.pop();

    //copy 
    const newHead={...snakeBody[0]};
    const dir=getInputDirection();
    newHead.x+=dir.x;
    newHead.y+=dir.y;

    //FIFO unshift is add into head, and push is add into tail
    snakeBody.unshift(newHead);
};

const growSnake=()=>{
    //copy 
    // const newHead={...snakeBody[0]};
    // const dir=getInputDirection();
    // newHead.x+=dir.x;
    // newHead.y+=dir.y;

    // //FIFO unshift is add into head, and push is add into tail
    // snakeBody.unshift(newHead);
    snakeBody.push({...snakeBody[snakeBody.length - 1]});
};

const snakeOutOfBounds=()=>{
    const head = snakeBody[0];
    if(head.x < 1 || head.x > 21 || head.y < 1 || head.y > 21){
        console.log("snakeOutOfBounds");
        return true;
    }
    return false;
};

const snakeIntersectSelf=()=>{
    const head = snakeBody[0];
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[i].x === head.x && snakeBody[i].y === head.y) {
            console.log("snakeIntersectSelf");
            return true;
        }
    }
    return false;
};


const drawSnake = (gameBoard) => {
    for (let i = 0; i < snakeBody.length; i++) {
      const segment = snakeBody[i];
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.classList.add('snake');
      gameBoard.appendChild(snakeElement);
    }
  };