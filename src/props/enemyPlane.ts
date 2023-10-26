import { CircleColliderComponent } from "../components/colliderComponent";
import { GameObject } from "../libs/gameObject";
import { Tags } from "../libs/tags";
import { Vector2 } from "../libs/vector";
import { createObject, emenyDestroyed } from "../main";
import { Bullet } from "./bullet";
import { Eenmy } from "./enemyBase";

export class EnemyPlane extends Eenmy{
    isRage: boolean = false;
    moveRange: number = 150;
    moveXMax: number = 0;
    moveXMin: number = 0;
    direction: number = 1;
    speed: number = 75;
    rageFireRage = 1.3;
    constructor(position: Vector2){
        super(position, 300, Math.random() * 3);
        this.coliederComopnent = new CircleColliderComponent(this, 10);
        this.name = 'enemy';
    }
   
    update(delta: number): void {
       super.update(delta); 
       if(this.hp <= 180&& this.isRage === false){
            this.isRage = true;
            this._fireRate = this.rageFireRage;
            this.moveXMax = this.position.x + (this.moveRange/2)
            this.moveXMin = this.position.x - (this.moveRange/2);
       }
        
       if(this.isRage){
            this.position.x += (this.speed * delta ) * this.direction;
            if(this.position.x >= this.moveXMax){
                this.position.x = this.moveXMax;
                this.direction *=-1;
            }
            if(this.position.x <= this.moveXMin){
                this.position.x = this.moveXMin;
                this.direction *= -1;
            }
       }
    }  
    render(context: CanvasRenderingContext2D): void {
        if(this.isRage){
            context.fillStyle = 'red';
        }
        else{
            context.fillStyle = 'blue';
        }
        context.beginPath();
        context.arc(this.position.x, this.position.y, 15,0, 2*Math.PI);
        context.fill();
        context.stroke();
    }
    onColided(colidedObject: GameObject): void {
        console.log('enemy plane colided!');  
    }

    override shotBullet(): void {
        this.fireCircle();
    }

    private fireCircle(){
        let inx = 18;
        for(var index =0; index < inx; index++){
            let dir: Vector2 = new Vector2(Math.cos(Math.PI * 2 * index/inx),
            Math.sin(Math.PI * 2 * index / inx)); 
            let bullet = new Bullet(new Vector2(this.position.x, this.position.y), dir, 1,Tags.Player, 'enemy_bullet.png');
            bullet._speed = 100;
            createObject(bullet);
        }
    }
     override dead(): void {
        super.dead();
        emenyDestroyed()
    }
    
}