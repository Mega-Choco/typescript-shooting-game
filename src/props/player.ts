import { CircleColliderComponent } from "../components/colliderComponent";
import { PlayerControllerComponent } from "../components/controllerComponent";
import { GameObject } from "../libs/gameObject";
import { Tags } from "../libs/tags";
import { Vector2 } from "../libs/vector";
import { createObject, gameOver } from "../main";
import { Bullet } from "./bullet";
import { PropBase } from "./propBase";

/// <reference path="../main.ts" />

export class Player extends PropBase{

    public name: string = 'player';
    public speed: number = 240;
    private _playerController: PlayerControllerComponent;
    constructor(position?: Vector2)
    {
        super(position, 5);
        this.tag = Tags.Player;
        this._playerController = new PlayerControllerComponent(this);
        this.coliederComopnent = new CircleColliderComponent(this, 8);
        let image = new Image();
        image.src = '../assets/player.png'
        this.image = image;
    }

    override update(delta: number): void {
        this._playerController.update(delta);
    }

    override render(context: CanvasRenderingContext2D): void {
   
        context.drawImage(this.image!, this.position.x - (64/2), this.position.y - (47/2),64,47 );
        this.coliederComopnent?.render(context);

    }
    onColided(colidedObject:PropBase): void {
        //this.getDamage(5)
    }
    shotBullet(){
       createObject(new Bullet(new Vector2(this.position.x, this.position.y), new Vector2(0,-1),10,Tags.Enemy, 'player_bullet.png'));
   
    }
    dead(): void {
        this.isDeleted = true;
        gameOver();
    }

}