import { Vector2 } from "./Vector2";


export class GameObject{
  constructor({position}){
    this.position = position ?? new Vector2(0,0);
    this.children = [];
  }
  //first entry point of the loop
  stepEntry(delta, root){
    //call updates on all children first
    this.children.forEach((child)=>child.stepEntry(delta, root))
    // call implemented step code
    this.step(delta, root)

  }

  step(_delta){

  }

  draw(ctx,x,y){
    const drawPosX = x + this.position.x 
    const drawPosY = y + this.position.y 

    //do the actual rendering of the images
    this.drawImage(ctx,drawPosX,drawPosY);

    //pass on the children
    this.children.forEach((child)=>child.draw(ctx,drawPosX,drawPosY));
  }

  drawImage(ctx,drawPosX,drawPosY){
    //...
  }

  // other game objects are nestable inside this one

  addChild(gameObject){
    this.children.push(gameObject);
  }

  removeChild(gameObject){
    this.children = this.children.filter(g =>{
      return gameObject !==g;
    })
  }

}