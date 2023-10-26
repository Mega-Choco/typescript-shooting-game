import { Vector2 } from "./vector";
import {Tags} from '../libs/tags';
export abstract class GameObject{
    public name: string = 'object';
    public position: Vector2 = new Vector2();
    public isDeleted = false;
    public isDisabled = false;
    public tag: Tags = Tags.None;

    constructor(position?: Vector2){
        this.position = position ?? new Vector2();
    }
    
    disableThis(){
        this.isDisabled = true;
    }

    deleteThis(){
        this.isDeleted = true;
    }

    abstract update(delta: number):void;
    abstract render(context: CanvasRenderingContext2D):void;
    abstract onColided(colidedObject:GameObject): void;
    abstract checkCollision(colidedObject:GameObject): void;

}