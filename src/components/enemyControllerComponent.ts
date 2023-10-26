import { Component } from "../libs/component";

export class PlayerControllerComponent extends Component {

    private _fireRate: number = 0.035;
    private _fireDelayCounter: number = 0;
    
    update(delta: number): void {
        throw new Error("Method not implemented.");
    }
}