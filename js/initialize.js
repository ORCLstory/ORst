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
const key_config = new KeyConfig();
const view = new View();

let system;

let g_draw_character_instance;

let allyList = [];
let enemyList = [];

let request = null;

let waitingFrames;
let loadingFrames;

animationStart();
