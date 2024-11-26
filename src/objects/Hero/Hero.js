import { Animations } from "../../Animations";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { GameObject } from "../../GameObject";
import { gridCells, isSpaceFree } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveTowards";
import { DOWN, LEFT, RIGHT, UP } from "../../Input";
import { walls } from "../../levels/level1";
import { resourses } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import { PICK_UP_DOWN, STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./heroAnimations";

export class Hero extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });
    
    const shadow =  new Sprite({
        resource: resourses.images.shadow,
        frameSize: new Vector2(32, 32),
        position: new Vector2(-8,-19),
    })
    this.addChild(shadow)

    this.body = new Sprite({
      resource: resourses.images.hero,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 8,
      frame: 0, // Start from frame 0
      position: new Vector2(-8,-20),
      animations: new Animations({
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        pickUpDown: new FrameIndexPattern(PICK_UP_DOWN),
      }),
    });

    this.addChild(this.body)

    this.facingDirection = DOWN;
    this.destinatioPosition = this.position.duplicate();
  }

  step(delta,root){
    const distance = moveTowards(this, this.destinatioPosition, 1);
  const hasArrived = distance <=1;
  //attempt to move again if the hero is at the position
  if(hasArrived){
    this.tryMove(root)
  }
 }


  tryMove(root) {
    const { input } = root;

    if (!input.direction) {
      if (this.facingDirection === LEFT) {
        this.body.animations.play("standLeft");
      }
      if (this.facingDirection === RIGHT) {
        this.body.animations.play("standRight");
      }
      if (this.facingDirection === UP) {
        this.body.animations.play("standUp");
      }
      if (this.facingDirection === DOWN) {
        this.body.animations.play("standDown");
      }

      return;
    }

    let nextX = this.destinatioPosition.x;
    let nextY = this.destinatioPosition.y;
    const gridSize = 16;

    if (input.direction === DOWN) {
      nextY += gridSize;
      this.body.animations.play("walkDown");
    }
    if (input.direction === UP) {
      nextY -= gridSize;
      this.body.animations.play("walkUp");
    }
    if (input.direction === LEFT) {
      nextX -= gridSize;
      this.body.animations.play("walkLeft");
    }
    if (input.direction === RIGHT) {
      nextX += gridSize;
      this.body.animations.play("walkRight");
    }
    this.facingDirection = input.direction ?? this.facingDirection;

    if (isSpaceFree(walls, nextX, nextY)) {
      this.destinatioPosition.x = nextX;
      this.destinatioPosition.y = nextY;
    }
  }
}