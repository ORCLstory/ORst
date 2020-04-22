// 画面の位置を割合で表示する
let bg_canvas = document.getElementById('background-layer'),
    bg_context = bg_canvas.getContext('2d');

let animation_canvas = document.getElementById('animation-layer'),
    animation_context = animation_canvas.getContext('2d');

let gc_canvas = document.getElementById('game-cursor-layer'),
    gc_context = gc_canvas.getContext('2d');

let txt_canvas = document.getElementById('text-layer'),
    txt_context = txt_canvas.getContext('2d');

let character_canvas = document.getElementById('character-layer'),
    character_context = character_canvas.getContext('2d');

let command_txt_canvas = document.getElementById('command-text-layer'),
    command_txt_context = command_txt_canvas.getContext('2d');

let icon_canvas = document.getElementById('icon-layer'),
    icon_context = icon_canvas.getContext('2d');

// 今回は画面を4:3として生成する
const WINDOW_WIDTH = 480,WINDOW_HEIGHT = 360;
const wp = new WindowProperty(480, 360);
const battlelog = new BattleLog();
const cursor = new Cursor();
const dmlp = new DrawMagicListProperty();
//const magic_list = new MagicList();
const key_config = new KeyConfig();
const view = new View();

let system;

let g_draw_character_instance;

let allyList = [];
let enemyList = [];

let request = null;

let waitingFrames;
let loadingFrames;

function start(){
    mode = 'normal';

    let iterator = gameProcess();
    let frame = 0;

    waitingFrames = 0;
    loadingFrames = 0;

    function update(){
        request = null;
        let r;
        switch (mode) {

            case 'waitKey':
                break;

            case 'loading':
                loadingFrames++;
                view.blackScreen();
                view.loadingScene();
                break;

            case 'require_loading':
                loadAsyncDataFromGoogleSpreadsheet();
                mode = 'loading';
                break;

            case 'waitFrame':
                waitingFrames--;
                if (waitingFrames <= 0){
                    mode = 'normal';
                }
                break;
            case 'defeat':
                break;

            default:
                console.log("normal!");
                r = iterator.next();
                if(r.value) mode = r.value;
        }
        frame++;
        // rが定義されていないか、処理が終わっていない場合、次のframeのアニメーションを実行する
        if(!(r && r.done)){
            request = requestAnimationFrame(update);
        }
    }
    request = requestAnimationFrame(update);
}
start();
