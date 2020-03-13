// 画面の位置を割合で表示する
let bg_canvas = document.getElementById('background-layer'),
    bg_context = bg_canvas.getContext('2d');

let gc_canvas = document.getElementById('game-cursor-layer'),
    gc_context = gc_canvas.getContext('2d');

let txt_canvas = document.getElementById('text-layer'),
    txt_context = txt_canvas.getContext('2d');

// 今回は画面を3:4として生成する
const WINDOW_WIDTH = 480,WINDOW_HEIGHT = 360;

// 各種グローバル変数・定数置き場
let g_current_cursor = 'first_decision_place';
var g_arrow_position = 0;
var g_choice_current_enemy  = 0;
let g_current_command_number = 0;
const START_COMMAND_LINE_HEIGHT = WINDOW_HEIGHT * 0.75;

function createWindow(x,y,w,h){
    bg_context.beginPath();
    bg_context.rect(x, y, w, h);
    bg_context.stroke();
}

function createCircle(x, y, radius){
    bg_context.beginPath();
    bg_context.arc(x, y, radius, 0, 2 * Math.PI,true);
    bg_context.stroke();
}

function drawFightScene(){
    bg_context.clearRect(0, 0, bg_canvas.width, bg_canvas.height);
    createWindow(0,0, WINDOW_WIDTH,WINDOW_HEIGHT);
    let status_window_x = 0;
    let status_window_y = 0;
    let status_window_w = WINDOW_WIDTH * 0.25;
    let status_window_h = WINDOW_HEIGHT * 0.22;

    // 上のほう
    let status_content = [
        {'name':'テオ','HP':25,'MP':20,'Lv':1},
        {'name':'グラール','HP':30,'MP':10,'Lv':1},
        {'name':'リン','HP':25,'MP':25,'Lv':1},
        {'name':'アリシア','HP':25,'MP':30,'Lv':1}
    ];
    const START_STATUS_ROW_HEIGHT = WINDOW_HEIGHT * 0.041;
    const INTERVALS_OF_STATUS_ROW_HEIGHT = WINDOW_HEIGHT * 0.04;
    const STATUS_LIST = ['name','HP','MP','Lv'];
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            bg_context.fillText(STATUS_LIST[j]+ ':' + status_content[i][STATUS_LIST[j]],status_window_x + (status_window_w *0.33), START_STATUS_ROW_HEIGHT +  j*INTERVALS_OF_STATUS_ROW_HEIGHT , WINDOW_WIDTH * 0.25);
        }
    createWindow(status_window_x,status_window_y,status_window_w,status_window_h);
        status_window_x += status_window_w;
    }

    // 下の方
    const COMMAND_LINE_HEIGHT = WINDOW_HEIGHT * 0.25;
    createWindow(0, START_COMMAND_LINE_HEIGHT, WINDOW_WIDTH, COMMAND_LINE_HEIGHT);
    createWindow(0, START_COMMAND_LINE_HEIGHT, WINDOW_WIDTH * 0.25, COMMAND_LINE_HEIGHT);
    let fight_command = ['たたかう', 'まほう' , 'どうぐ', 'にげる'];
    let magic_list = ['DUMAPIC','HARITO','KATINO','MOGREF','MERITO','MORLIS','SOPIC','CALIFIC'];

    // 戦闘コマンド表示
    for(let i = 0; i < 4; i++){
        bg_context.fillText(fight_command[i],WINDOW_WIDTH * 0.05,WINDOW_HEIGHT * 0.8+ (15*i) , WINDOW_WIDTH *0.25);
    }
    // 魔法を選んだ時の表示
    const ONE_ROW_COUNT = 3;
    const INTERVAL_OF_MAGIC_LIST_WORD_WIDTH = WINDOW_WIDTH * 0.25;
    const INTERVAL_OF_MAGIC_LIST_WORD_HEIGHT = WINDOW_HEIGHT * 0.05;
    const START_MAGIC_LIST_WORD_WIDTH = WINDOW_WIDTH * 0.30;
    const START_MAGIC_LIST_WORD_HEIGHT = START_COMMAND_LINE_HEIGHT + WINDOW_HEIGHT * 0.05;
    // for(let i = 0; i < magic_list.length; i++){
    //     bg_context.fillText(magic_list[i], START_MAGIC_LIST_WORD_WIDTH + (i%3)*INTERVAL_OF_MAGIC_LIST_WORD_WIDTH, START_MAGIC_LIST_WORD_HEIGHT +(INTERVAL_OF_MAGIC_LIST_WORD_HEIGHT * Math.floor(i / 3)))
    // }

    // モンスターっぽい丸を生成する
    createCircle(50, 120, 20);
    createCircle(50, 170, 20);
    createCircle(50, 220, 20);
    for(let i = 0; i < 4; i++){
        createCircle(430, 120 + (i * 40) ,15);
    }
}

function createTriangle(start_arrow_width,start_arrow_height,length_of_a_side,angle){
    gc_context.beginPath();
    gc_context.moveTo(start_arrow_width, start_arrow_height);

    if (angle === 'left'){
        gc_context.lineTo(start_arrow_width, start_arrow_height + length_of_a_side);
        gc_context.lineTo(start_arrow_width - length_of_a_side * 0.865, start_arrow_height + length_of_a_side / 2);
    }
    else if (angle === 'right') {
        gc_context.lineTo(start_arrow_width, start_arrow_height + length_of_a_side);
        gc_context.lineTo(start_arrow_width + length_of_a_side * 0.865, start_arrow_height + length_of_a_side / 2);
    }
    else if (angle === 'down'){
        gc_context.lineTo(start_arrow_width + length_of_a_side, start_arrow_height);
        gc_context.lineTo(start_arrow_width + length_of_a_side / 2, start_arrow_height + length_of_a_side * 0.865);
    }
    gc_context.closePath();
    gc_context.stroke();
}

function drawFirstDicisionPlaceArrow(height){
    gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    createTriangle(5, 280 + height, 10, 'right');
}

function drawEnemyArrow(height){
    // TODO:マジックナンバーを消す
    gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    createTriangle(90, 112 + height, 10, 'left');
}

document.addEventListener('keydown',controller);


function controller(e){
    let g_log = document.getElementById('debug');
    if (g_current_cursor === 'first_decision_place'){
        const INTERVALS_OF_ARROW_ROW_HEIGHT = Math.ceil(WINDOW_HEIGHT * 0.04);
        // Sキー
        if (g_current_command_number < 3 &&  e.keyCode === 83){
            g_current_command_number++;
            drawFirstDicisionPlaceArrow(g_current_command_number * INTERVALS_OF_ARROW_ROW_HEIGHT);
        }
        // Wキー
        if (g_current_command_number > 0 && e.keyCode === 87){
            g_current_command_number--;
            drawFirstDicisionPlaceArrow(g_current_command_number * INTERVALS_OF_ARROW_ROW_HEIGHT);
        }
        // Dキーまたはエンターキー
        if (e.keyCode === 68 || e.keyCode === 13){
            if (g_current_command_number === 0){
                console.log("敵を選んでね");
                g_current_cursor = 'select_enemy';
                gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
                drawEnemyArrow(0);
            }
            if (g_current_command_number === 1){
                console.log("多分、魔法の画面にいくよ");
            }
        }

        g_log.innerHTML = 'g_arrow_position: ' + g_arrow_position + '<br>g_current_command_number: ' + g_current_command_number;
    }

    else if (g_current_cursor === 'select_enemy'){
        const INTERVALS_OF_ARROW_ROW_HEIGHT = Math.ceil(WINDOW_HEIGHT * 0.138);
        const NUMBER_OF_ENEMYS = 3
        // Sキー
        if (g_choice_current_enemy < NUMBER_OF_ENEMYS - 1 && e.keyCode === 83){
            g_choice_current_enemy++;
            drawEnemyArrow(g_choice_current_enemy * INTERVALS_OF_ARROW_ROW_HEIGHT);
        }
        // Wキー
        if (g_choice_current_enemy > 0 && e.keyCode === 87){
            g_choice_current_enemy--;
            drawEnemyArrow(g_choice_current_enemy * INTERVALS_OF_ARROW_ROW_HEIGHT);
        }
        // Dキーまたはエンターキー
        if (e.keyCode === 68 || e.keyCode === 13){
            g_choice_current_enemy = 0;
            g_current_command_number = 0;
            g_current_cursor = 'first_decision_place';
            gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
            drawFirstDicisionPlaceArrow(0);
            iterator.next();
        }
        // Aキー
        if (e.keyCode === 65){
            g_current_cursor = 'first_decision_place';
            gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
            drawFirstDicisionPlaceArrow(0);
        }
    }
    else if (g_current_cursor === 'read_message'){
        if (e.keyCode === 83 || e.keyCode === 13){
            iterator.next();
        }
    }
}

// 戦闘処理
function* battleSystem(){
    // 味方の情報を定義
    const teo = new AllyStatus('テオ');
    const graal = new AllyStatus('グラール');
    const lin = new AllyStatus('リン');
    const alycia = new AllyStatus('アリシア');

    // 敵の情報を定義
    const slime1 = new EnemyStatus('スライム');
    const slime2 = new EnemyStatus('スライム');
    const slime3 = new EnemyStatus('スライム');

    // 味方の情報をリストに格納
    let allyList = [];
    allyList.push(teo);
    allyList.push(graal);
    allyList.push(lin);
    allyList.push(alycia);

    // 敵の情報をリストに格納
    let enemyList = [];
    enemyList.push(slime1);
    enemyList.push(slime2);
    enemyList.push(slime3);

    // エンカウント時の処理
    let situation = 'encount';
    drawFightScene();
    battleMessage(situation);

    while (true){
        yield 0;
        let commandQueue = [];
        battleMessage('decision', allyList[0]);
        commandQueue.push({'player':allyList[0],'target':g_choice_current_enemy});
        yield 0;
        battleMessage('decision', allyList[1]);
        commandQueue.push({'player':allyList[1],'target':g_choice_current_enemy});
        yield 0;
        battleMessage('decision', allyList[2]);
        commandQueue.push({'player':allyList[2],'target':g_choice_current_enemy});
        yield 0;
        battleMessage('decision', allyList[3]);
        commandQueue.push({'player':allyList[3],'target':g_choice_current_enemy});

        commandQueue.push({'player':enemyList[0],'target':Math.floor(Math.random() * 4)});
        commandQueue.push({'player':enemyList[1],'target':Math.floor(Math.random() * 4)});
        commandQueue.push({'player':enemyList[2],'target':Math.floor(Math.random() * 4)});

        gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        createTriangle(WINDOW_WIDTH * 0.625, WINDOW_HEIGHT * 0.95, 10, 'down');
        g_current_cursor = 'read_message';
        for(let i = 0; i < commandQueue.length; i++){
            if (commandQueue[i].player.team === 'ally'){
                console.log(commandQueue[i].target);
                battleMessage('attack', commandQueue[i].player, enemyList[commandQueue[i].target]);
                yield 0;
            }
            else{
                console.log(commandQueue[i].target);
                battleMessage('attack', commandQueue[i].player, allyList[commandQueue[i].target]);
                yield 0;
            }
        }
        g_current_cursor = 'first_decision_place';
        drawFirstDicisionPlaceArrow(0);
        battleMessage('decision', allyList[0]);
    }
}

function battleMessage(situation) {
    let battleLog = document.getElementById('battleLog');
    console.log(battleLog);

    // エンカウント時の表示メッセージ
    if (situation === 'encount'){
        battleLog.innerHTML += '敵が現れた！<br>';
        createBattleLog('敵が現れた！');
    }
    // 戦闘処理時の表示メッセージ
    else if (situation === 'attack'){
        console.log(arguments[1]);
        battleLog.innerHTML += arguments[1].name + 'が' + arguments[2].name + 'を攻撃した！<br>';
        createBattleLog(arguments[1].name + 'が' + arguments[2].name + 'を攻撃した！');
        let calculateDamage = arguments[1].atk - arguments[2].def;
        if (calculateDamage < 0){
            calculateDamage = 1;
        }
        battleLog.innerHTML += arguments[2].name + 'に' + calculateDamage + 'ダメージ！<br>';
    }

    else if (situation === 'decision'){
        battleLog.innerHTML += arguments[1].name + 'はどうする？<br>';
        createBattleLog(arguments[1].name + 'はどうする？');
    }
}

function createBattleLog(text){
    txt_context.clearRect(0,0,480,360);
    txt_context.font = "15px 'MS ゴシック'";
    txt_context.fillText(text,125,290,200);
}

var iterator = battleSystem();
iterator.next();
drawFirstDicisionPlaceArrow(0);
