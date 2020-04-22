class View{
    constructor(){
    }
    initialize(){
        // すべてのcanvasを初期化する。バルス！
        bg_context.clearRect(0, 0, wp.width, wp.height);
        animation_context.clearRect(0, 0, wp.width, wp.height);
        gc_context.clearRect(0, 0, wp.width, wp.height);
        txt_context.clearRect(0, 0, wp.width, wp.height);
        command_txt_context.clearRect(0, 0, wp.width, wp.height);
        icon_context.clearRect(0, 0, wp.width, wp.height);
        character_context.clearRect(0, 0, wp.width, wp.height);
    }
    blackScreen(){
        this.initialize();
        bg_context.rect(0, 0, wp.width, wp.height);
        bg_context.fill();
    }
    loadingScene(){
        let radius = 100;
        //for(let i = 18; i > 0; i--){
        for(let i = 0; i < 18; i++){
            let angle = 20 * i;
            let x = radius * Math.sin(Math.PI * angle / 180);
            let y = radius * Math.cos(Math.PI * angle / 180);
            let opacity;
            if((loadingFrames/1) % 18 === 18 - i){
                opacity = 1;
            }
            else if((loadingFrames/1) % 18 === 17 - i){
                opacity = 0.9;
            }
            else if((loadingFrames/1) % 18 === 16 - i){
                opacity = 0.8;
            }
            else if((loadingFrames/1) % 18 === 15 - i){
                opacity = 0.7;
            }
            else if((loadingFrames/3) % 18 === i + 4){
                opacity = 0.6;
            }
            else{
                opacity = 0.5;
            }
            this.createCircleWithOpacity(x + wp.width / 2, y + wp.height /2, opacity);
        }
        animation_context.font = "24px 'normal'";
        animation_context.fillText("now loading",wp.width * 0.36 , wp.height * 0.52, 200);

    }
    createCircleWithOpacity(x, y, opacity){
        animation_context.beginPath();
        animation_context.moveTo(x,y);
        animation_context.arc(x, y, 10, 0, 360/180 * Math.PI, false);
        animation_context.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
        animation_context.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
        animation_context.fill();
    }

    fightScene(){
        this.initialize();
        drawFirstDicisionPlaceArrow(0);
        showStatus(allyList);
        let image = new Image();
        image.src = 'img/bg_combat.png';
        let teo_image = new Image();
        teo_image.src = 'img/teo_kao.png'
        teo_image.onload = function(e){
            icon_context.drawImage(teo_image, 0, 0, 50, 80);
        };
        image.onload = function(e) {
            bg_context.drawImage(image, 0, 0, wp.width, wp.height);
            createWindow(0,0, wp.width,wp.height);
            // ステータスの枠の生成
            for(let i = 0; i < 4; i++){
            createWindow(wp.status_window.x + (wp.status_window.w * i), wp.status_window.y, wp.status_window.w, wp.status_window.h, 'white');
            }

            // コマンドラインの枠全体の描画
            createWindow(wp.command_line_window.x, wp.command_line_window.y, wp.command_line_window.w, wp.command_line_window.h, 'white');
            // fightコマンドの枠の描画
            createWindow(wp.fight_command_window.x,wp.fight_command_window.y,wp.fight_command_window.w, wp.fight_command_window.h);
            let fight_command = ['たたかう', 'まほう' , 'どうぐ', 'にげる'];

            // 戦闘コマンド表示
            for(let i = 0; i < 4; i++){
                command_txt_context.font = "12px 'normal'";
                command_txt_context.fillText(fight_command[i],wp.fight_command_txt.x,wp.fight_command_txt.y + (wp.fight_command_txt.intervals *i) , wp.fight_command_window.w);
            }
        }
    }

    titleScene(){
        bg_context.clearRect(0, 0, bg_canvas.width, bg_canvas.height);
        command_txt_context.font = "12px 'normal'";
        command_txt_context.fillText("おらすとだよー",200,200,200);
    }
}
function createWindow(x,y,w,h){
    bg_context.beginPath();
    bg_context.rect(x, y, w, h);
    if ( arguments[4] === 'white'){
        bg_context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        bg_context.fill();
    }
    bg_context.stroke();
}

function createCircle(x, y, radius){
    character_context.beginPath();
    character_context.arc(x, y, radius, 0, 2 * Math.PI,true);
    character_context.stroke();
}


function viewMagicList(first, last){
    txt_context.clearRect(wp.command_line_window.x, wp.command_line_window.y, wp.command_line_window.w, wp.command_line_window.h);
    txt_context.font = "15px 'MS ゴシック'";
    let all_magic_list = allyList[cursor.current_select_character].characterMagicList;
    let all_magic_list_length = all_magic_list.length;
    // 実際にある魔法のリストより後の要素は参照しない
    if (all_magic_list_length < last){
        last = all_magic_list_length;
    }
    let magic_list_length = last - first;
    let magic_list_coordinate = dmlp.drawMagicListCoordinate(magic_list_length);
    for(let i = 0; i < magic_list_length; i++){
        txt_context.fillText(all_magic_list[i + first].name,magic_list_coordinate[i]["x"], magic_list_coordinate[i]["y"], 70);
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
            if(j === 0){
                txt_context.fillText(status_content[i][STATUS_LIST[j]], wp.start_status_row.x + (i * wp.status_window.w), wp.start_status_row.y +  j * wp.intervals_of_status_row_height, wp.status_window.w);
            }else{
                txt_context.fillText(STATUS_LIST[j]+ ':' + status_content[i][STATUS_LIST[j]], wp.start_status_row.x + (i * wp.status_window.w), wp.start_status_row.y +  j * wp.intervals_of_status_row_height, wp.status_window.w);
            }
        }
    }
}
