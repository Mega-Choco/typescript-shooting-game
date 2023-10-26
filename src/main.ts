import { Game } from './libs/game';
import { GameObject } from './libs/gameObject';
import { ScreenSetting } from './libs/screen';
import { Vector2 } from './libs/vector';
import { EnemyPlane } from './props/enemyPlane';
import { Player } from './props/player'

const gameStartListner = (e: KeyboardEvent)=> {
    switch (e.code) {
        case 'KeyZ':
            {
                game.start();
                break;
            }
    }
};


const FPS = 60;
export let screenInfo = new ScreenSetting(640, 480);
let _player: Player;
let _clear = false;
const game: Game = {

    // initialize basic properties for running game
    _now: 0,
    _then: 0,
    _delta: 0,
    _fpsInterval: 0,
    _accuTime: 0,
    _canvas: null,
    _ctx: null,
    _objects: [],
    _gameOver: false,

    // setup before running game
    init: () => {

        // initialize screen to DOM
        let body = window.document.querySelector('body');
        console.log(body);
        let domCanvas = document.createElement('canvas');
        console.log('make canvas element');
        domCanvas.id = 'screen';
        domCanvas.width = screenInfo.width;
        domCanvas.height = screenInfo.height;
        domCanvas.style.border = "2px red solid";
        domCanvas.style.backgroundColor = 'black';
        body?.appendChild(domCanvas);


        // Get canvas element and context for rendering
        game._canvas = <HTMLCanvasElement>document.getElementById("screen");
        game._ctx = game._canvas.getContext("2d");
        game._ctx!.imageSmoothingEnabled = false;
        showGameReady();

    },
    start: () => {
        game._fpsInterval = 1000 / FPS;
        game._then = performance.now();
        document.removeEventListener('keydown', gameStartListner);
        gamePlaySetting();
        game.loop();
    },
    loop: () => {
        if (!game._gameOver) {
            game._now = performance.now();
            game._delta = (game._now - game._then);
            game._then = game._now;

            game._accuTime += game._delta;

            if (game._fpsInterval <= game._accuTime) {
                game._delta = game._accuTime / 1000;
                game._accuTime = 0;
                game.update();
                game.render();
                requestAnimationFrame(game.loop);
                return;
            }
            requestAnimationFrame(game.loop);
            return;
        }else{
            showGameOver(_clear);
        }
    },
    update: () => {
        game._objects.forEach(obj => {
            obj.update(game._delta);
        });

        game._objects.forEach(obj => {
            game._objects.forEach(tobj => {
                if (obj != tobj) {
                    obj.checkCollision(tobj);
                }
            })
        })

        game._objects = game._objects.filter(item => item.isDeleted === false);
        //console.log(game._objects.length);
    },
    render: () => {
        game._ctx?.clearRect(0, 0, game._canvas!.width, game._canvas!.height);

        game._objects.forEach(obj => {
            obj.render(game._ctx!);
        });
        drawUI(game._ctx!);
    }
}
game.init();

function spawnPlayer() {
    let player = new Player(new Vector2(game._canvas!.width / 2, 400));
    _player = player;
    createObject(player);

}

let registeredEmeny: number = 0;
function gamePlaySetting() {

    spawnPlayer();
    let pos: Vector2 = new Vector2(screenInfo.width / 2, 400);

    let chunk = screenInfo.width / 5;

    for (var j = 1; j <= 2; j++) {
        for (var i = 2; i <= 3; i++) {
            createObject(new EnemyPlane(new Vector2(chunk * i + (Math.random()* 70), 50 * j + (Math.random()*30))));
            registeredEmeny +=1;
        }
    }
}

export function createObject(object: GameObject) {
    game._objects.push(object);
}

function drawUI(context: CanvasRenderingContext2D) {
    let playersLife: number = 0;

    let heart = '';
    context.font = '26px serif';
    context.fillStyle = "#ffffff";

    if (playersLife != undefined) {
        for (let i = 0; i < _player.hp; i++) {
            heart += '❤️';
        }
    }
    context.fillText(`LIFE: ${heart}`, 0, screenInfo.height - 30);

}

export function gameOver() {
    game._gameOver = true;
}

function showGameOver(isCleared: boolean = false){
    game._ctx!.clearRect(0, 0, game._canvas!.width, game._canvas!.height);
    game._ctx!.font = '36px serif';
    game._ctx!.fillStyle = "#ffffff";
    game._ctx!.fillText(`${!isCleared ? 'GAME OVER!' : 'GAME CLEAR!'}`, 50, screenInfo.height / 2);
    game._ctx!.fillText('press [R] to restart.',50, screenInfo.height / 2 + 50)

    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            
            case 'KeyR':
                {
                    window.location.reload();
                    break;
                }
        }
    });
}


export function emenyDestroyed(){
    registeredEmeny -=1;
    console.log('destoryed! alive is '+ registeredEmeny);
    if(registeredEmeny === 0){
        _clear = true;
        gameOver();
    }
}

function showGameReady(){
    game._ctx!.clearRect(0, 0, game._canvas!.width, game._canvas!.height);
    game._ctx!.font = '36px serif';
    game._ctx!.fillStyle = "#ffffff";
    game._ctx!.fillText('press [Z] to start.', 50, screenInfo.height / 2);
    game._ctx!.fillText('이동: 방향키', 50, screenInfo.height / 2 + 100);
    game._ctx!.fillText('Z: 발사, Shift: 저속모드', 50, screenInfo.height / 2 + 150);
    document.addEventListener('keydown', gameStartListner);
}
