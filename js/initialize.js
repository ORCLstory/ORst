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
const dmlp = new DrawMagicListProperty();
const magic = new Magic();

let g_draw_character_instance;

let allyList = [];

async function startBattle(){
    // 味方の情報を定義
    const teo    = new AllyStatus('テオ');
    const graal  = new AllyStatus('グラール');
    const lin    = new AllyStatus('リン');
    const alycia = new AllyStatus('アリシア');
    
    // スプレッドシートから情報を非同期で取得するため、await文を使用
    // AllyStatus.setStatusの引数はレベル
    await teo.setStatus(3);
    await graal.setStatus(1);
    await lin.setStatus(1);
    await alycia.setStatus(1);

    allyList.push(teo);
    allyList.push(graal);
    allyList.push(lin);
    allyList.push(alycia);

    console.log(allyList);

    var iterator = battleSystem();
    iterator.next();
    drawFirstDicisionPlaceArrow(0);
}

startBattle();
