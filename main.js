import { GameLoop } from "./src/GameLoop";
import { gridCells, isSpaceFree } from "./src/helpers/grid";
import { moveTowards } from "./src/helpers/moveTowards";
import { DOWN, Input, LEFT, RIGHT, UP } from "./src/Input";
import { walls } from "./src/levels/level1";
import { resourses } from "./src/Resource";
import { Sprite } from "./src/Sprite";
import { Vector2 } from "./src/Vector2";
import "./style.css";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resourses.images.sky,
  frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
  resource: resourses.images.ground,
  frameSize: new Vector2(320, 180),
});

const hero = new Sprite({
  resource: resourses.images.hero,
  frameSize: new Vector2(32, 32),
  hFrames: 3,
  vFrames: 8,
  frame: 0, // Start from frame 0
  position: new Vector2(gridCells(6), gridCells(5)),
});

const heroDestinationPosition = hero.position.duplicate();

const input = new Input();

const shadow = new Sprite({
  resource: resourses.images.shadow,
  frameSize: new Vector2(32, 32),
});

const update = () => {
  const distance = moveTowards(hero, heroDestinationPosition, 1);
  const hasArrived = distance <=1;
  //attempt to move again if the hero is at the position
  if(hasArrived){
    tryMove()
  }
};

const tryMove = () => {
  if (!input.direction){
    return;
  }

  let nextX = heroDestinationPosition.x
  let nextY = heroDestinationPosition.y
  const gridSize = 16; 

  if (input.direction === DOWN) {
    nextY += gridSize;
    hero.frame = 0;
  }
  if (input.direction === UP) {
    nextY -= gridSize;
    hero.frame = 6;
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;
    hero.frame = 9;
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;
    hero.frame = 3;
  }
  
  if(isSpaceFree(walls, nextX, nextY)){
    heroDestinationPosition.x = nextX
    heroDestinationPosition.y = nextY
  }
  
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  const heroOffset = new Vector2(-8, -21);
  const heroPosX = hero.position.x + heroOffset.x;
  const heroPosY = hero.position.y + 1 + heroOffset.y;

  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY); // Use hero instead of heroSprite
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
