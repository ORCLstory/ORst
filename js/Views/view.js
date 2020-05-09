class View{
    constructor(){
        this.img_src = [];
        this.next_scene;
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
        bg_context.rect(0, 0, wp.width, wp.height);
        bg_context.fillStyle = 'rgba(0, 0, 0, 1)';
        bg_context.fill();
    }
    loadAsyncData(){
        if(this.next_scene === 'fight_scene'){
            loadAsyncDataFromGoogleSpreadsheet();
        }
        else if(this.next_scene === 'title_scene'){
            loadTitleImage();
        }
        else if(this.next_scene === 'map_scene'){
            loadMapImage();
        }
    }

    loadImage(src, context, x, y, w, h){
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.img_src.push({
                    obj:img,
                    context:context,
                    x:x,
                    y:y,
                    w:w,
                    h:h
                });
                resolve(img);
            }
            img.onerror = (e) => reject(e);
            img.src = src;
        })
    }

    showAllImage(){
        for(let i = 0; i < this.img_src.length; i++){
            let img_dict = this.img_src[i];
            img_dict.context.drawImage(img_dict.obj, img_dict.x, img_dict.y, img_dict.w, img_dict.h);
        }
        this.img_src = [];
    }

    loadingScene(){
        let radius = 100;
        // 表示する光る球体の数
        let light_circle_count = 18;
        let interval_of_light_circle_angle = 360 / light_circle_count;
        for(let i = 0; i < light_circle_count; i++){
            let angle = 20 * i;
            let x = radius * Math.sin(Math.PI * angle / 180);
            let y = radius * Math.cos(Math.PI * angle / 180);
            let opacity;

            // 光る球体が一周する周期をframe単位で指定します。
            // let cycle = 30なら、30frameで一周します。
            let cycle = 30;

            let point_x =  loadingFrames % cycle;
            let light_angle;
            let angle_per_frame = 360 / cycle;
            // sin関数は90度の時に1の頂点を持ち、270度の時に-1の頂点をもつ。
            // 増加関数の際は、そのまま適応し、減少関数の際は反転させて180を足したいため、
            // sin関数が90度から270度までの間は、数字を反転させた上で180度を足している。
            //light_angleが180 ~ 359度
            if(loadingFrames % cycle >= (cycle * 0.25) && loadingFrames % cycle < (cycle * 0.75)){
                light_angle = 180 + 180 - (Math.sin(Math.PI * (angle_per_frame * loadingFrames) / 180) + 1) * 90;
            }
            //light_angleが0 ~ 179度
            else{
                light_angle = (Math.sin(Math.PI * (angle_per_frame * loadingFrames) / 180) + 1) * 90;
            }
            // 回す方向を反転させます
            light_angle = 360 - light_angle;

            // 光る円の数が18であれば、0-17までを返す
            let light_angle_element = Math.floor(light_angle / interval_of_light_circle_angle);

            if(light_angle_element === i % 18){
                opacity = 1;
            }
            else if(light_angle_element === (i - 1) % 18){
                opacity = 0.9;
            }
            else if(light_angle_element === (i - 2) % 18){
                opacity = 0.8;
            }
            else if(light_angle_element === (i - 3) % 18){
                opacity = 0.7;
            }
            else if(light_angle_element === (i - 4) % 18){
                opacity = 0.6;
            }
            else{
                opacity = 0.5;
            }
            this.createCircleWithOpacity(x + wp.width / 2, y + wp.height /2, opacity);
        }
        animation_context.fillStyle = 'rgba(255, 255, 255, 1)';
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
    mapScene(){
        map.create();
        this.showAllImage();
    }


    fightScene(){
        this.initialize();
        this.showAllImage();
        drawFirstDicisionPlaceArrow(0);
        showStatus(allyList);
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

    titleScene(){
        bg_context.clearRect(0, 0, bg_canvas.width, bg_canvas.height);
        this.showAllImage();
        createWindow(0,0, wp.width,wp.height);
        createWindow(wp.width * 0.3, wp.height * 0.6, wp.width * 0.4, wp.height * 0.3);
        let command_list = ['はじめから','つづきから','こんふぃぐ'];
        command_txt_context.font = "15px 'normal'";
        for(let i = 0; i < command_list.length; i++){
            command_txt_context.fillText(command_list[i],wp.width * 0.4,wp.height * 0.7 + (i * 20),200);
        }
    }

    pressEnter(){
        console.log(cursor.current_cursor);
        txt_context.fillText("PRESS ENTER", wp.width * 0.4, wp.height * 0.7);
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

