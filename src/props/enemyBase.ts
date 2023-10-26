import { GameObject } from "../libs/gameObject";
import { Tags } from "../libs/tags";
import { Vector2 } from "../libs/vector";
import { PropBase } from "./propBase";

export abstract class Eenmy extends PropBase{

    protected _fireRate: number = 2.3;
    private _fireDelayCounter: number = 0;
    private _isShootable: boolean = true;

    constructor(position?: Vector2, hp?: number, fireRate:number = 0){
        super(position, hp);
        this.tag = Tags.Enemy;
    }
    override update(delta: number) {
        if (this._fireDelayCounter > 0) {
            this._fireDelayCounter -= delta;
            this._isShootable = false;
        }
        else {
            this._fireDelayCounter = 0;
            this._isShootable = true;
        }

        if (this._isShootable) {
            this.shotBullet();
            this._fireDelayCounter = this._fireRate;
        }
    }
    shotBullet(){

    }

}