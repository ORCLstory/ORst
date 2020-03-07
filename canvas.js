var canvas = document.getElementById('canvas'),
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

function drawCommandWindow(){
}

function drawFightScene(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    createWindow(0,0, WINDOW_WIDTH,WINDOW_HEIGHT);
    var status_window_x = 0;
    var status_window_y = 0;
    var status_window_w = WINDOW_WIDTH/4;
    var status_window_h = WINDOW_HEIGHT/4.5;

    // 上のほう
    var status_content = [
        {"name":"kaya","HP":200000,"MP":4000,"Lv":4},
        {"name":"kudo","HP":200,"MP":4000,"Lv":400},
        {"name":"miku","HP":2,"MP":400,"Lv":4},
        {"name":"tojo","HP":20000,"MP":400,"Lv":4}
    ];

    for(var i = 0; i < 4; i++){
        context.fillText("name:" + status_content[i]["name"],status_window_x + (status_window_w /3), 15 , WINDOW_WIDTH / 4);
        context.fillText("HP:" + status_content[i]["HP"],status_window_x + (status_window_w /2), 30 , WINDOW_WIDTH / 4);
        context.fillText("MP:" + status_content[i]["MP"],status_window_x + (status_window_w /2), 45 , WINDOW_WIDTH / 4);
        context.fillText("Lv:" + status_content[i]["Lv"],status_window_x + (status_window_w /2), 60 , WINDOW_WIDTH / 4);
    createWindow(status_window_x,status_window_y,status_window_w,status_window_h);
        status_window_x += status_window_w;
    }

    // 下の方
    const COMMAND_LINE_RATIO = 4;
    const COMMAND_LINE_HEIGHT = WINDOW_HEIGHT / COMMAND_LINE_RATIO;
    const START_COMMAND_LINE_HEIGHT = COMMAND_LINE_HEIGHT * (COMMAND_LINE_RATIO - 1);
    createWindow(0, START_COMMAND_LINE_HEIGHT, WINDOW_WIDTH,COMMAND_LINE_HEIGHT);
    createWindow(0, START_COMMAND_LINE_HEIGHT, WINDOW_WIDTH / 5 ,COMMAND_LINE_HEIGHT);
    var fight_command = ["たたかう", "まほう" , "どうぐ", "にげる"];
    // TODO:コマンドの左に△を置く

    var magic_list = ["DUMAPIC","HARITO","KATINO","MOGREF","MERITO","MORLIS","SOPIC","CALIFIC"];

    for(var i = 0; i < 4; i++){
        context.fillText(fight_command[i],20,START_COMMAND_LINE_HEIGHT + 20 + (15*i) , WINDOW_WIDTH / 4);
    }
    // 魔法を選んだ時の表示

    const ONE_ROW_COUNT = 3;
    for(var i = 0; i < magic_list.length; i++){
        context.fillText(magic_list[i], 150 + (i%3)*100, START_COMMAND_LINE_HEIGHT + 20 +(15 * Math.floor(i / 3)))
    }

    // モンスターっぽい丸を生成する
    createCircle(50, 120, 20);
    createCircle(50, 170, 20);
    createCircle(50, 220, 20);

    for(var i = 0; i < 4; i++){
        createCircle(430, 120 + (i * 40) ,15);
    }
}

function operatable_arrow(){
    const LENGTH_OF_A_SIDE = 10;
    const START_ARROW_HEIGHT = 280;
    const START_ARROW_WIDTH = 5;

    // 大きい三角形を書くコード
    let p1 = {x:START_ARROW_WIDTH, y:START_ARROW_HEIGHT};
    let p2 = {x:START_ARROW_WIDTH, y:p1.y + LENGTH_OF_A_SIDE};
    let p3 = {x:START_ARROW_WIDTH+LENGTH_OF_A_SIDE/2*1.73, y:p1.y + LENGTH_OF_A_SIDE/2};

    context.beginPath();
    context.moveTo(p1.x,p1.y);
    context.lineTo(p2.x,p2.y);
    context.lineTo(p3.x,p3.y);

    context.closePath();
    context.stroke();
}

drawFightScene();
operatable_arrow();
