import { Component } from "../libs/component";
import { screenInfo } from "../main";
import { Player } from "../props/player";

export class PlayerControllerComponent extends Component {
    private _isUpPressed = false;
    private _isDownPressed = false;
    private _isLeftPressed = false;
    private _isRightPressed = false;
    private _isSiftPressed = false;
    private _isZPressed = false;
    private _slowDrainage: number = .5;
    private _player: Player;
    private _fireRate: number = 0.3;
    private _fireDelayCounter: number = 0;

    private _isShootable = true;

    constructor(player: Player) {
        super();
        this._player = player;

        console.log('input updated!');
        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case 'ArrowUp':
                    {
                        this._isUpPressed = false;
                        break;
                    }
                case 'ArrowDown':
                    {
                        this._isDownPressed = false;
                        break;
                    }
                case 'ArrowLeft': {
                    this._isLeftPressed = false;
                    break;
                }
                case 'ArrowRight': {
                    this._isRightPressed = false;
                    break;
                }
                case 'ShiftLeft': {
                    this._isSiftPressed = false;
                    break;
                }
                case 'KeyZ':
                    {
                        this._isZPressed = false;
                        break;
                    }
            }
        });

        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowUp':
                    {
                        this._isUpPressed = true;
                        break;
                    }
                case 'ArrowDown':
                    {
                        this._isDownPressed = true;
                        break;
                    }
                case 'ArrowLeft': {
                    this._isLeftPressed = true;
                    break;
                }
                case 'ArrowRight': {
                    this._isRightPressed = true;
                    break;
                }
                case 'ShiftLeft': {
                    console.log('shift code!');
                    this._isSiftPressed = true;
                    break;
                }
                case 'KeyZ':
                    {
                        this._isZPressed = true;
                        break;
                    }
            }
        });
    }
    override update(delta: number): void {
        let moveYPos: number = 0;
        let moveXPos: number = 0;
        let playersSpeed: number = (this._player.speed * (this._isSiftPressed ? this._slowDrainage : 1)) * delta;
        if (this._isUpPressed) {
            moveYPos = playersSpeed * -1;
        }
        if (this._isDownPressed) {
            moveYPos = playersSpeed;
        }
        if (this._isRightPressed) {
            moveXPos = playersSpeed;
        }
        if (this._isLeftPressed) {
            moveXPos = playersSpeed * -1;
        }

        this._player.position.x += moveXPos;
        this._player.position.y += moveYPos;
        if (this._player.position.x < 0) {
            console.warn('x 한계 돌파');
            this._player.position.x = 0
        }

        if (this._player.position.x > screenInfo.width) {
            console.warn('x 한계 돌파');
            this._player.position.x = screenInfo.width;
        }

        if (this._player.position.y < 0) {
            console.warn('y 한계 돌파');

            this._player.position.y = 0;
        }

        if (this._player.position.y > screenInfo.height) {
            console.warn('y 한계 돌파');

            this._player.position.y = screenInfo.height;
        }

        if (this._fireDelayCounter > 0) {
            this._fireDelayCounter -= delta;
            this._isShootable = false;
        }
        else {
            // let supportValue = this._fireDelayCounter * -1;
            // this._fireDelayCounter = supportValue;
            this._fireDelayCounter = 0;
            this._isShootable = true;
        }
        if (this._isZPressed && this._isShootable) {

            this._player.shotBullet();
            this._fireDelayCounter = this._fireRate;
        }

    }
}