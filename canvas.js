// 画面の位置を割合で表示する

let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

// 今回は画面を3:4として生成する
const WINDOW_WIDTH = 480,WINDOW_HEIGHT = 360;

function createWindow(x,y,w,h){
    context.beginPath();
    context.rect(x, y, w, h);
    context.stroke();
}

function createCircle(x, y, radius){
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI,true);
    context.stroke();
}

function drawFightScene(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    createWindow(0,0, WINDOW_WIDTH,WINDOW_HEIGHT);
    let status_window_x = 0;
    let status_window_y = 0;
    let status_window_w = WINDOW_WIDTH * 0.25;
    let status_window_h = WINDOW_HEIGHT * 0.22;

    // 上のほう
    let status_content = [
        {'name':'kaya','HP':200000,'MP':4000,'Lv':4},
        {'name':'kudo','HP':200,'MP':4000,'Lv':400},
        {'name':'miku','HP':2,'MP':400,'Lv':4},
        {'name':'tojo','HP':20000,'MP':400,'Lv':4}
    ];
    const START_STATUS_ROW_HEIGHT = WINDOW_HEIGHT * 0.041;
    const INTERVALS_OF_STATUS_ROW_HEIGHT = WINDOW_HEIGHT * 0.04;
    const STATUS_LIST = ['name','HP','MP','Lv'];
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            context.fillText(STATUS_LIST[j]+ ':' + status_content[i][STATUS_LIST[j]],status_window_x + (status_window_w *0.33), START_STATUS_ROW_HEIGHT +  j*INTERVALS_OF_STATUS_ROW_HEIGHT , WINDOW_WIDTH * 0.25);
        }
    createWindow(status_window_x,status_window_y,status_window_w,status_window_h);
        status_window_x += status_window_w;
    }

    // 下の方
    const COMMAND_LINE_HEIGHT = WINDOW_HEIGHT * 0.25;
    const START_COMMAND_LINE_HEIGHT = WINDOW_HEIGHT * 0.75;
    createWindow(0, START_COMMAND_LINE_HEIGHT, WINDOW_WIDTH,COMMAND_LINE_HEIGHT);
    createWindow(0, START_COMMAND_LINE_HEIGHT, WINDOW_WIDTH * 0.25 ,COMMAND_LINE_HEIGHT);
    let fight_command = ['たたかう', 'まほう' , 'どうぐ', 'にげる'];
    let magic_list = ['DUMAPIC','HARITO','KATINO','MOGREF','MERITO','MORLIS','SOPIC','CALIFIC'];

    // 戦闘コマンド表示
    for(let i = 0; i < 4; i++){
        context.fillText(fight_command[i],WINDOW_WIDTH * 0.05,WINDOW_HEIGHT * 0.8+ (15*i) , WINDOW_WIDTH *0.25);
    }
    // 魔法を選んだ時の表示
    const ONE_ROW_COUNT = 3;
    const INTERVAL_OF_MAGIC_LIST_WORD_WIDTH = WINDOW_WIDTH * 0.25;
    const INTERVAL_OF_MAGIC_LIST_WORD_HEIGHT = WINDOW_HEIGHT * 0.05;
    const START_MAGIC_LIST_WORD_WIDTH = WINDOW_WIDTH * 0.30;
    const START_MAGIC_LIST_WORD_HEIGHT = START_COMMAND_LINE_HEIGHT + WINDOW_HEIGHT * 0.05;
    for(let i = 0; i < magic_list.length; i++){
        context.fillText(magic_list[i], START_MAGIC_LIST_WORD_WIDTH + (i%3)*INTERVAL_OF_MAGIC_LIST_WORD_WIDTH, START_MAGIC_LIST_WORD_HEIGHT +(INTERVAL_OF_MAGIC_LIST_WORD_HEIGHT * Math.floor(i / 3)))
    }

    // モンスターっぽい丸を生成する
    createCircle(50, 120, 20);
    createCircle(50, 170, 20);
    createCircle(50, 220, 20);

    for(let i = 0; i < 4; i++){
        createCircle(430, 120 + (i * 40) ,15);
    }
}

function drawArrow(height){
    context.clearRect(2,START_COMMAND_LINE_HEIGHT+2,13,80);
    const LENGTH_OF_A_SIDE = 10;
    const START_ARROW_WIDTH = 5;
    let start_arrow_height = 280 + height;

    // 大きい三角形を書くコード
    let p1 = {x:START_ARROW_WIDTH, y:start_arrow_height};
    let p2 = {x:START_ARROW_WIDTH, y:p1.y + LENGTH_OF_A_SIDE};
    // 正三角形の三平方の定理
    let p3 = {x:START_ARROW_WIDTH+LENGTH_OF_A_SIDE * 0.865, y:p1.y + LENGTH_OF_A_SIDE/2};

    context.beginPath();
    context.moveTo(p1.x,p1.y);
    context.lineTo(p2.x,p2.y);
    context.lineTo(p3.x,p3.y);

    context.closePath();
    context.stroke();
}

document.addEventListener('keydown',moveArrow);

var g_arrow_position = 0;
let g_now_command_number = 0;
const START_COMMAND_LINE_HEIGHT = WINDOW_HEIGHT * 0.75;
const INTERVALS_OF_ARROW_ROW_HEIGHT = Math.ceil(WINDOW_HEIGHT * 0.04);

function moveArrow(e){
    if(g_arrow_position < INTERVALS_OF_ARROW_ROW_HEIGHT*3 &&  e.keyCode == 83){
        g_arrow_position += INTERVALS_OF_ARROW_ROW_HEIGHT;
        g_now_command_number++;
        drawArrow(g_arrow_position);
    }
    if(g_arrow_position > 1 && e.keyCode == 87){
        g_arrow_position -= INTERVALS_OF_ARROW_ROW_HEIGHT;
        g_now_command_number--;
        drawArrow(g_arrow_position);
    }
    let log = document.getElementById('debug');
    log.innerHTML = 'g_arrow_position: ' + g_arrow_position + '<br>g_now_command_number: ' + g_now_command_number;
}



drawFightScene();
drawArrow(0);
