import { Component } from "../libs/component";
import { GameObject } from "../libs/gameObject";
import { Tags } from "../libs/tags";
import { getDistance , Vector2} from "../libs/vector";
import { PropBase } from "../props/propBase";

export class CircleColliderComponent extends Component{

    update(delta: number): void {
    }
    public radius: number = 0;
    public parentObject?: GameObject;
    public collideTag: Tags;
    public targetTag: Tags;
    
    constructor(object: GameObject, radius?: number, targetTag: Tags = Tags.None){
        super();
        this.parentObject = object;
        this.collideTag = object.tag;        
        this.radius = radius ?? 0;
        this.targetTag = targetTag;
    }
    
    render(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'green';
        context.beginPath();
        context.arc(this.parentObject!.position.x, this.parentObject!.position.y, this.radius,0, 2*Math.PI);
        context.fill();
        context.stroke();
    }
    checkCollision(collider: CircleColliderComponent){
        let distance = getDistance(this.parentObject!.position, collider.parentObject!.position);
        if(distance <=  this.radius + collider.radius){
          //  
            if((collider.collideTag == this.targetTag) && collider.collideTag != Tags.None){
                console.warn(`my tag is ${this.collideTag} and collided's tag is ${collider.collideTag}`);
                this.parentObject?.onColided(collider.parentObject!);
            }
        }
    };
}