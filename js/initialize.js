// 画面の位置を割合で表示する
let bg_canvas = document.getElementById('background-layer'),
    bg_context = bg_canvas.getContext('2d');

let gc_canvas = document.getElementById('game-cursor-layer'),
    gc_context = gc_canvas.getContext('2d');

let txt_canvas = document.getElementById('text-layer'),
    txt_context = txt_canvas.getContext('2d');

let character_canvas = document.getElementById('character-layer'),
    character_context = character_canvas.getContext('2d');

// 今回は画面を3:4として生成する
const WINDOW_WIDTH = 480,WINDOW_HEIGHT = 360;
const wp = new WindowProperty(480, 360);
const battlelog = new BattleLog();
const cursor = new Cursor();
let magic = new Magic();

let g_draw_character_instance;
// 味方の情報を定義
const teo = new AllyStatus('テオ');
const graal = new AllyStatus('グラール');
const lin = new AllyStatus('リン');
const alycia = new AllyStatus('アリシア');

let allyList = [];
allyList.push(teo);
allyList.push(graal);
allyList.push(lin);
allyList.push(alycia);



var iterator = battleSystem();
iterator.next();
drawFirstDicisionPlaceArrow(0);
