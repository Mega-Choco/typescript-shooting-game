import { CircleColliderComponent } from "../components/colliderComponent";
import { GameObject } from "../libs/gameObject";
import { Vector2 } from "../libs/vector";

export abstract class PropBase extends GameObject{
    public hp: number = 0; 
    public coliederComopnent?: CircleColliderComponent;
    public image?: HTMLImageElement;

    constructor(position?: Vector2, hp?: number){
        super(position);
        this.hp = hp ?? 0;
        
    }

    getDamage(damage: number){
        this.hp -= damage;
        console.log(`${this.name}: 아야! ${damage} 만큼 데미지 입음!`);
        if(this.hp<=0){
            this.dead();
        }
    }
    override render(context: CanvasRenderingContext2D): void {
        this.coliederComopnent?.render(context);
    }

    override checkCollision(colidedObject:GameObject): void {
        this.coliederComopnent?.checkCollision((colidedObject as PropBase)!.coliederComopnent!);    
    }

    dead(){
        this.isDeleted = true;
        console.log(`${this.name}: 난 죽었어...`);
    }
}