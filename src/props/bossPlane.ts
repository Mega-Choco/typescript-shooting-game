import { CircleColliderComponent } from "../components/colliderComponent";
import { GameObject } from "../libs/gameObject";
import { Tags } from "../libs/tags";
import { Vector2 } from "../libs/vector";
import { Eenmy } from "./enemyBase";

export class BossPlane extends Eenmy{

    constructor(position: Vector2){
        super(position, 1000);
        this.coliederComopnent = new CircleColliderComponent(this, 20);
        this.name = 'enemy';
    }
    update(delta: number): void {
        //throw new Error("Method not implemented.");
    }
    render(context: CanvasRenderingContext2D): void {
        context.fillStyle = 'yellow';
        context.beginPath();
        context.arc(this.position.x, this.position.y, 20,0, 2*Math.PI);
        context.fill();
        context.stroke();
    }
    onColided(colidedObject: GameObject): void {
        console.log('enemy plane colided!');  
    }
}