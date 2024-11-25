import { GameLoop } from './src/GameLoop';
import { resourses } from './src/Resource';
import { Sprite } from './src/Sprite';
import { Vector2 } from './src/Vector2';
import './style.css';

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
});

const heroPos = new Vector2(16 * 6, 16 * 5);

const shadow = new Sprite({
  resource: resourses.images.shadow,
  frameSize: new Vector2(32, 32),
});

const update = () => {

  hero.frame +=1 //(hero.frame + 1) % (hero.hFrames * hero.vFrames); // Increment and wrap frame
  //heroPos.x+=1
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);

  const heroOffset = new Vector2(-8, -21);
  const heroPosX = heroPos.x + heroOffset.x;
  const heroPosY = heroPos.y + 1 + heroOffset.y;

  shadow.drawImage(ctx, heroPosX, heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY); // Use hero instead of heroSprite
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
