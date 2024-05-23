const GRID_SIZE=21;
let food={x:10,y:16};

//move down
const updateFood=()=>{
    if(onSnake(food)){
        growSnake();
        food=getNewFoodPosition();
    }
};

const onSnake=(position)=>{
    for (let segment of snakeBody) {
        if (segment.x === position.x && segment.y === position.y) {
            return true;
        }
    }
    return false;
};

const getNewFoodPosition=()=>{
    let newFoodPosition=randomGridPosition();
    while (onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
};

const randomGridPosition = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE) + 1,
      y: Math.floor(Math.random() * GRID_SIZE) + 1,
    };
  };
  

// Don't change me!
const drawFood = (gameBoard) => {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
  };
  