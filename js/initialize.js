// 画面の位置を割合で表示する
let bg_canvas = document.getElementById('background-layer'),
    bg_context = bg_canvas.getContext('2d');

let gc_canvas = document.getElementById('game-cursor-layer'),
    gc_context = gc_canvas.getContext('2d');

let txt_canvas = document.getElementById('text-layer'),
    txt_context = txt_canvas.getContext('2d');

let character_canvas = document.getElementById('character-layer'),
    character_context = character_canvas.getContext('2d');

let command_txt_canvas = document.getElementById('command-text-layer'),
    command_txt_context = command_txt_canvas.getContext('2d');

// 今回は画面を4:3として生成する
const WINDOW_WIDTH = 480,WINDOW_HEIGHT = 360;
const wp = new WindowProperty(480, 360);
const battlelog = new BattleLog();
const cursor = new Cursor();
const dmlp = new DrawMagicListProperty();
//const magic_list = new MagicList();
const key_config = new KeyConfig();

let system;

let g_draw_character_instance;

let allyList = [];
let enemyList = [];
var iterator = battleProcess();

startBattleSystem();
