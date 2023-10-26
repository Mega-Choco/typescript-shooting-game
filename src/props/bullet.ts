import { CircleColliderComponent } from "../components/colliderComponent";
import { GameObject } from "../libs/gameObject";
import { Tags } from "../libs/tags";
import { Vector2 } from "../libs/vector";
import { screenInfo } from "../main";
import { PropBase } from "./propBase";

export class Bullet extends PropBase{

    public _speed: number = 500;
    private damage: number = 0;
    private _direction: Vector2;

    constructor(position?: Vector2, direction: Vector2 = new Vector2() ,damage?:number,targetTag: Tags = Tags.None, imageName: string = 'bullet.png'){
        super();
        this.tag = Tags.None;
        this.position = position??new Vector2(0,0);
        this.coliederComopnent = new CircleColliderComponent(this, 10, targetTag);
        this.damage = damage??0;
        let image = new Image();
        image.src = `../assets/${imageName}`
        this.image = image;
        this._direction = direction;
    }
    
    update(delta: number): void {
        this.position.y +=  (this._speed * delta) * this._direction.y;
        this.position.x += (this._speed * delta) * this._direction.x;
        if(this.position.y >= screenInfo.height + screenInfo.outboundOffset ||
            this.position.y <= 0 - screenInfo.outboundOffset ||
            this.position.x <= 0 - screenInfo.outboundOffset ||
            this.position.x >=  screenInfo.width +screenInfo.outboundOffset){
            this.deleteThis();
        }
        
    }
    render(context: CanvasRenderingContext2D): void {
      
        context.drawImage(this.image!, this.position.x - (25/2), 
        this.position.y - (25/2),25,25 );
   //     this.coliederComopnent?.render(context);
    
    }
    
    override onColided(collided: GameObject): void {
       (collided as PropBase).getDamage(this.damage);
       console.log('bullet hitted! im bullet');
       this.deleteThis();
    }    
}
