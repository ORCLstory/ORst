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

function viewMagicList(first, last){
    txt_context.clearRect(wp.command_line_window.x, wp.command_line_window.y, wp.command_line_window.w, wp.command_line_window.h);
    txt_context.font = "15px 'MS ゴシック'";
    let all_magic_list_length = magic_list.allMagicList.length;
    // 実際にある魔法のリストより後の要素は参照しない
    if (all_magic_list_length < last){
        last = all_magic_list_length;
    }
    let magic_list_length = last - first;
    let magic_list_coordinate = dmlp.drawMagicListCoordinate(magic_list_length);
    for(let i = 0; i < magic_list_length; i++){
        txt_context.fillText(magic_list.allMagicList[i + first].name,magic_list_coordinate[i]["x"], magic_list_coordinate[i]["y"], 300);
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
