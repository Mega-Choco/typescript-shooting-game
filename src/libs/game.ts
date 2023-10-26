import { GameObject } from "./gameObject";

export interface Game{
    _now: number;
    _then: number;
    _fpsInterval: number;
    _accuTime:number;
    _delta: number;
    _canvas: HTMLCanvasElement | null;
    _ctx: CanvasRenderingContext2D | null;
    _gameOver: boolean;
    _objects: GameObject[];    
    
    init: ()=> void;
    start: () => void;
    loop: ()=> void;
    update: () => void;
    render: () => void;
}