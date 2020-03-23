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

// 各種グローバル変数・定数置き場
let g_current_cursor = 'first_decision_place';
let g_arrow_position = 0;
let g_choice_current_enemy  = 0;
let g_current_command_number = 0;
let g_current_select_character = 0;

let g_draw_character_instance;

function createWindow(x,y,w,h){
    bg_context.beginPath();
    bg_context.rect(x, y, w, h);
    bg_context.stroke();
}

function createCircle(x, y, radius){
    character_context.beginPath();
    character_context.arc(x, y, radius, 0, 2 * Math.PI,true);
    character_context.stroke();
}

function drawFightScene(){
    bg_context.clearRect(0, 0, bg_canvas.width, bg_canvas.height);
    createWindow(0,0, wp.width,wp.height);
    // ステータスの枠の生成
    for(let i = 0; i < 4; i++){
    createWindow(wp.status_window.x + (wp.status_window.w * i), wp.status_window.y, wp.status_window.w, wp.status_window.h);
    }

    // コマンドラインの枠全体の描画
    createWindow(wp.command_line_window.x, wp.command_line_window.y, wp.command_line_window.w, wp.command_line_window.h);
    // fightコマンドの枠の描画
    createWindow(wp.fight_command_window.x,wp.fight_command_window.y,wp.fight_command_window.w, wp.fight_command_window.h);
    let fight_command = ['たたかう', 'まほう' , 'どうぐ', 'にげる'];

    // 戦闘コマンド表示
    for(let i = 0; i < 4; i++){
        bg_context.fillText(fight_command[i],wp.fight_command_txt.x,wp.fight_command_txt.y + (wp.fight_command_txt.intervals *i) , wp.fight_command_window.w);
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

function drawEnemyArrow(width, height){
    // TODO:マジックナンバーを消す
    gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    createTriangle(width + 40, height - 5, 10, 'left');
}

document.addEventListener('keydown',controller);


function controller(e){
    const key_config = new KeyConfig();
    let g_log = document.getElementById('debug');
    if (g_current_cursor === 'first_decision_place'){
        const INTERVALS_OF_ARROW_ROW_HEIGHT = Math.ceil(WINDOW_HEIGHT * 0.04);
        // Sキー
        if (g_current_command_number < 3 &&  e.keyCode === key_config.down){
            g_current_command_number++;
            drawFirstDicisionPlaceArrow(g_current_command_number * INTERVALS_OF_ARROW_ROW_HEIGHT);
        }
        // Wキー
        if (g_current_command_number > 0 && e.keyCode === key_config.up){
            g_current_command_number--;
            drawFirstDicisionPlaceArrow(g_current_command_number * INTERVALS_OF_ARROW_ROW_HEIGHT);
        }
        // Dキーまたはエンターキー
        if (e.keyCode === key_config.right || e.keyCode === key_config.enter){
            if (g_current_command_number === 0){
                g_current_cursor = 'select_enemy';
                gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
                let current_enemy_points = g_draw_character_instance.enemy_points[g_choice_current_enemy];
                drawEnemyArrow(current_enemy_points.x,current_enemy_points.y);
            }
            if (g_current_command_number === 1){
                console.log("多分、魔法の画面にいくよ");
            }
            if (g_current_command_number === 2){
                console.log("多分、道具の画面にいくよ");
            }
            if (g_current_command_number === 3){
                console.log("多分、逃げられるよ");
            }
        }
        // Aキー
        if (e.keyCode === key_config.left || e.keyCode === key_config.back){
            g_current_select_character--;
            iterator.next();
        }


        g_log.innerHTML = 'g_arrow_position: ' + g_arrow_position + '<br>g_current_command_number: ' + g_current_command_number;
    }

    else if (g_current_cursor === 'select_enemy'){
        const INTERVALS_OF_ARROW_ROW_HEIGHT = Math.ceil(WINDOW_HEIGHT * 0.138);
        let NUMBER_OF_ENEMYS = g_draw_character_instance.enemy_points.length;

        // Sキー
        if (g_choice_current_enemy < NUMBER_OF_ENEMYS - 1 && e.keyCode === key_config.down){
            console.log(g_draw_character_instance);
            g_choice_current_enemy++;
            let current_enemy_points = g_draw_character_instance.enemy_points[g_choice_current_enemy];
            drawEnemyArrow(current_enemy_points.x,current_enemy_points.y);
        }
        // Wキー
        if (g_choice_current_enemy > 0 && e.keyCode === key_config.up){
            console.log(g_draw_character_instance);
            g_choice_current_enemy--;
            let current_enemy_points = g_draw_character_instance.enemy_points[g_choice_current_enemy];
            drawEnemyArrow(current_enemy_points.x,current_enemy_points.y);
        }
        // Dキーまたはエンターキー
        if (e.keyCode === key_config.right || e.keyCode === key_config.enter){
            g_current_command_number = 0;
            g_current_cursor = 'first_decision_place';
            gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
            drawFirstDicisionPlaceArrow(0);
            //tmp
            g_current_select_character++;
            iterator.next();
            g_choice_current_enemy = 0;
        }
        // Aキー
        if (e.keyCode === key_config.left || e.keyCode === key_config.back){
            g_current_cursor = 'first_decision_place';
            gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
            drawFirstDicisionPlaceArrow(0);
        }
    }
    else if (g_current_cursor === 'read_message'){
        if (e.keyCode === key_config.down || e.keyCode === key_config.enter){
            iterator.next();
        }
    }
}

function showStatus(ally_status_list){
    // 上のほう
    txt_context.clearRect(wp.status_window.x, wp.status_window.y, wp.width, wp.status_window.h);
    txt_context.font = "10px 'normal'";

    let status_content = [];
    for ( let i = 0; i < ally_status_list.length; i++){
        status_content[i] = {};
        status_content[i]["name"] = ally_status_list[i].name;
        status_content[i]["HP"] = ally_status_list[i].now_hp;
        status_content[i]["MP"] = ally_status_list[i].now_mp;
        status_content[i]["Lv"] = ally_status_list[i].lv;
    }

    const STATUS_LIST = ['name','HP','MP','Lv'];
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            txt_context.fillText(STATUS_LIST[j]+ ':' + status_content[i][STATUS_LIST[j]], wp.start_status_row.x + (i * wp.status_window.w), wp.start_status_row.y +  j * wp.intervals_of_status_row_height, wp.status_window.w);
        }
    }
}

// 戦闘処理
function* battleSystem(){
    const battlelog = new BattleLog();

    // 味方の情報を定義
    const teo = new AllyStatus('テオ');
    const graal = new AllyStatus('グラール');
    const lin = new AllyStatus('リン');
    const alycia = new AllyStatus('アリシア');

    // 敵の情報を定義
    const slime1 = new EnemyStatus('スライム1');
    const slime2 = new EnemyStatus('スライム2');
    const slime3 = new EnemyStatus('スライム3');

    // 味方の情報をリストに格納
    let allyList = [];
    allyList.push(teo);
    allyList.push(graal);
    allyList.push(lin);
    allyList.push(alycia);
    // tmp
    showStatus(allyList);

    // 敵の情報をリストに格納
    let enemyList = [];
    enemyList.push(slime1);
    enemyList.push(slime2);
    enemyList.push(slime3);

    // エンカウント時の処理
    drawFightScene();
    battlelog.encount();

    //敵と味方を出す
    g_draw_character_instance = new DrawCharacter();
    g_draw_character_instance.enemy(enemyList);
    g_draw_character_instance.ally(allyList);

    while (true){
        let commandQueue = [];

        // 行動可能な味方をリストに格納
        let actionableAllyList = allyList.filter(target => target.status.some(status => status === 'alive'));
        // 行動可能な敵をリストに格納
        let actionableEnemyList = enemyList.filter(target => target.status.some(status => status === 'alive'));

        // 全滅しているかどうかを判定
        if (actionableAllyList.length === 0){
            battlelog.defeat();
            g_current_cursor = 'end';
            yield 0;
        }
        else if (actionableEnemyList.length === 0){
            battlelog.victory();
            g_current_cursor = 'end';
            yield 0;
        }

        g_current_select_character = 0;
        // 味方が攻撃対象を選択
        while (true){
            battlelog.decision(actionableAllyList[g_current_select_character]);
            let current_select_character = g_current_select_character;
            yield 0;
            // もし増えてたら決定してるよ
            if (current_select_character < g_current_select_character){
                commandQueue.push({'player':actionableAllyList[current_select_character],'target':enemyList[g_choice_current_enemy]});
            }
            // もし増えてたら決定してるよ
            else if ( current_select_character > g_current_select_character) {
                commandQueue.pop();
            }
            if (g_current_select_character >= actionableAllyList.length){
                console.log(g_current_select_character);
                break;
            }
        }
        console.log(commandQueue);

        // 敵AIの攻撃対象選択
        for (let i = 0; i < actionableEnemyList.length; i++){
            commandQueue.push({'player':actionableEnemyList[i],'target':actionableAllyList[select_target(actionableAllyList)]});
        }

        // コマンド入力終了時の処理
        gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        g_current_cursor = 'read_message';
        // battle_logを初期化
        battle_log_list = [];

        for(let i = 0; i < commandQueue.length; i++){

            // プレイヤーが行動不能な場合、処理を行わず次のプレイヤーに行動させる
            if (commandQueue[i].player.status.some(status => status === 'dead')){
                continue;
            // 対象が選択不能な場合、対象を変える
            }else if(commandQueue[i].target.status.some(status => status === 'dead')){
                console.log('変更前:', commandQueue[i].target);
                if (commandQueue[i].player.team === 'ally'){
                    actionableEnemyList = enemyList.filter(target => target.status.some(status => status === 'alive'));
                    commandQueue[i].target = actionableEnemyList[select_target(actionableEnemyList)];
                }
                else {
                    actionableAllyList = allyList.filter(target => target.status.some(status => status === 'alive'));
                    commandQueue[i].target = actionableAllyList[select_target(actionableAllyList)];
                }
                console.log('変更後:', commandQueue[i].target);
            }

            damage = calcurateDamage(commandQueue[i].player, commandQueue[i].target);
            actionableEnemyList = enemyList.filter(target => target.status.some(status => status === 'alive'));
            g_draw_character_instance.enemy(actionableEnemyList);
            g_draw_character_instance.ally(allyList);
            commandQueue[i].target.dealDamage = damage;
            if (commandQueue[i].target.status.some(status => status === 'dead')){
                battlelog.attack(commandQueue[i].player, commandQueue[i].target, damage, 'dead');
            }
            else {
                battlelog.attack(commandQueue[i].player, commandQueue[i].target, damage, null);
            }
            showStatus(allyList);
            actionableEnemyList = enemyList.filter(target => target.status.some(status => status === 'alive'));
            g_draw_character_instance.enemy(actionableEnemyList);
            g_draw_character_instance.ally(allyList);
            
            // 全滅しているかどうかを判定
            if (actionableAllyList.length === 0){
                battlelog.defeat();
                g_current_cursor = 'end';
                yield 0;
            }
            else if (actionableEnemyList.length === 0){
                battlelog.victory();
                g_current_cursor = 'end';
                yield 0;
            }

            yield 0;
        }

        g_current_cursor = 'first_decision_place';
        drawFirstDicisionPlaceArrow(0);
    }
}

function calcurateDamage(attacker, defender){
    let damage = (attacker.atk - defender.def);
    if (damage <= 0){
        damage = 1;
    }
    else {
        damage += Math.floor(Math.random() * (damage / 2));
    }
    return damage;
}

function select_target(targetList){
    return Math.floor(Math.random() * targetList.length);
}

var iterator = battleSystem();
iterator.next();
drawFirstDicisionPlaceArrow(0);
