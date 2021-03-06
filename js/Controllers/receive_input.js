// modeがwaitKey時の条件分けを処理する
document.addEventListener('keydown',controller);


function controller(e){
    if (cursor.current_cursor === 'first_decision_place'){
        firstDecisionPlace(e);
    }

    else if (cursor.current_cursor === 'select_enemy'){
        selectEnemy(e);
    }
    else if (cursor.current_cursor === 'select_ally'){
        selectAlly(e);
    }

    else if (cursor.current_cursor === 'select_magic') {
        selectMagic(e);
    }

    else if (cursor.current_cursor === 'read_message'){
        readMessage(e);
    }
    else if (cursor.current_cursor === 'title_menu'){
        titleMenu(e);
    }
    else if (cursor.current_cursor === 'press_enter'){
        pressEnter(e);
     }
     else if (cursor.current_cursor === 'move_map'){
         moveMap(e);
     }
    else if (cursor.current_cursor === 'end_of_battle'){
        endOfBattle(e);
    }
}

function firstDecisionPlace(e){
    const INTERVALS_OF_ARROW_ROW_HEIGHT = Math.ceil(WINDOW_HEIGHT * 0.04);
    // Sキー
    if (cursor.current_command_number < 3 &&  e.keyCode === key_config.down){
        cursor.current_command_number++;
        drawFirstDicisionPlaceArrow(cursor.current_command_number * INTERVALS_OF_ARROW_ROW_HEIGHT);
    }
    // Wキー
    if (cursor.current_command_number > 0 && e.keyCode === key_config.up){
        cursor.current_command_number--;
        drawFirstDicisionPlaceArrow(cursor.current_command_number * INTERVALS_OF_ARROW_ROW_HEIGHT);
    }
    // Dキーまたはエンターキー
    if (e.keyCode === key_config.right || e.keyCode === key_config.enter){
        if (cursor.current_command_number === 0){
            cursor.current_cursor = 'select_enemy';
            gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
            let current_enemy_points = g_draw_character_instance.enemy_points[cursor.choice_current_enemy];
            drawEnemyArrow(current_enemy_points.x,current_enemy_points.y);
        }
        if (cursor.current_command_number === 1){
            console.log('多分、魔法の画面にいくよ');
            cursor.current_cursor = 'select_magic';
            // 0番目の要素から8番目の要素までの魔法を表示する
            viewMagicList(0, 9);
            const points_data = dmlp.draw2dCursorListCoordinate(9);
            let points_coordinate = points_data[0][0];
            drawMagicArrow(points_coordinate['x'],points_coordinate['y']);
        }
        if (cursor.current_command_number === 2){
            console.log('多分、道具の画面にいくよ');
        }
        if (cursor.current_command_number === 3){
            console.log('多分、逃げられるよ');
        }
    }
    // Aキー
    if (e.keyCode === key_config.left || e.keyCode === key_config.back){
        if (cursor.current_select_character > 0){
            cursor.current_select_character--;
        }
        mode = 'normal';
    }
}

function selectEnemy(e){
    let NUMBER_OF_ENEMYS = g_draw_character_instance.enemy_points.length;
    // 下キー
    if (cursor.choice_current_enemy < NUMBER_OF_ENEMYS - 1 && e.keyCode === key_config.down){
        console.log(g_draw_character_instance);
        cursor.choice_current_enemy++;
        let current_enemy_points = g_draw_character_instance.enemy_points[cursor.choice_current_enemy];
        drawEnemyArrow(current_enemy_points.x,current_enemy_points.y);
    }
    // 上キー
    if (cursor.choice_current_enemy > 0 && e.keyCode === key_config.up){
        console.log(g_draw_character_instance);
        cursor.choice_current_enemy--;
        let current_enemy_points = g_draw_character_instance.enemy_points[cursor.choice_current_enemy];
        drawEnemyArrow(current_enemy_points.x,current_enemy_points.y);
    }
    // 決定キー
    if (e.keyCode === key_config.enter){
        cursor.current_cursor = 'first_decision_place';
        cursor.choice_instance = system.actionableEnemyList[cursor.choice_current_enemy];
        gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        drawFirstDicisionPlaceArrow(0);
        cursor.current_select_character++;
        mode = 'normal';
    }
    // キャンセルキー
    if (e.keyCode === key_config.back){
        cursor.current_cursor = 'first_decision_place';
        gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        drawFirstDicisionPlaceArrow(0);
        battlelog.decision(allyList[cursor.current_select_character]);
    }
}

function selectAlly(e){
    let NUMBER_OF_ALLYS = g_draw_character_instance.ally_points.length;
    if (cursor.choice_current_ally < NUMBER_OF_ALLYS -1 && e.keyCode === key_config.down){
        cursor.choice_current_ally++;
        let current_ally_points = g_draw_character_instance.ally_points[cursor.choice_current_ally];
        drawAllyArrow(current_ally_points.x, current_ally_points.y);
    }
    // 上キー
    if (cursor.choice_current_ally > 0 && e.keyCode === key_config.up){
        cursor.choice_current_ally--;
        let current_ally_points = g_draw_character_instance.ally_points[cursor.choice_current_ally];
        drawAllyArrow(current_ally_points.x,current_ally_points.y);
    }
    // 決定キー
    if (e.keyCode === key_config.enter){
        cursor.current_cursor = 'first_decision_place';
        cursor.choice_instance = system.allyList[cursor.choice_current_ally];
        gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        drawFirstDicisionPlaceArrow(0);
        cursor.current_select_character++;
        mode = 'normal';
    }
    // キャンセルキー
    if (e.keyCode === key_config.back){
        cursor.current_cursor = 'first_decision_place';
        gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        drawFirstDicisionPlaceArrow(0);
        battlelog.decision(allyList[cursor.current_select_character]);
    }
}

function selectMagic(e){
    const INTERVALS_OF_ARROW_ROW_HEIGHT = Math.ceil(WINDOW_HEIGHT * 0.081);
    const NUMBER_OF_MAGIC = allyList[cursor.current_select_character].characterMagicList.length;
    const points_data = dmlp.draw2dCursorListCoordinate(9);
    // 下キー
    if (e.keyCode === key_config.down){
        console.log("開始行:" + cursor.first_line_displayed_for_magic);
        // 次の位置にカーソルを合わせた時に魔法の配列は何番目を参照しないといけないか
        let next_magic_point = cursor.current_magic_cursor + 3;
        if (next_magic_point < NUMBER_OF_MAGIC){
            if (cursor.current_select_magic['y'] < 2){
                cursor.current_select_magic['y']++;
                // xy座標を返す
                let points_coordinate = points_data[cursor.current_select_magic['x']][cursor.current_select_magic['y']];
                drawMagicArrow(points_coordinate['x'],points_coordinate['y']);
                console.log(points_coordinate);
            }
            // 下まで矢印が来た場合
            else if(cursor.current_select_magic['y'] >= 2 && NUMBER_OF_MAGIC / 3 - 2 > cursor.first_line_displayed_for_magic){
                cursor.first_line_displayed_for_magic++;
                let start_magic_num = cursor.first_line_displayed_for_magic * 3;
                viewMagicList(start_magic_num, start_magic_num + 9);
            }
        }
    }
    // 上キー
    if (e.keyCode === key_config.up){
        console.log("開始行:" + cursor.first_line_displayed_for_magic);
        if(cursor.current_select_magic['y'] > 0){
            cursor.current_select_magic['y']--;
            // xy座標を返す
            let points_coordinate = points_data[cursor.current_select_magic['x']][cursor.current_select_magic['y']];

            drawMagicArrow(points_coordinate['x'],points_coordinate['y']);
            console.log(points_coordinate);
        }
        else if(cursor.current_select_magic['y'] <= 0 && cursor.first_line_displayed_for_magic > 0){
            cursor.first_line_displayed_for_magic--;
            let start_magic_num = cursor.first_line_displayed_for_magic * 3;
            viewMagicList(start_magic_num, start_magic_num + 9);

        }
    }
    // 左キー
    if (cursor.current_select_magic['x'] > 0 && e.keyCode === key_config.left){
        cursor.current_select_magic['x']--;
        // xy座標を返す
        let points_coordinate = points_data[cursor.current_select_magic['x']][cursor.current_select_magic['y']];

        drawMagicArrow(points_coordinate['x'],points_coordinate['y']);
    }
    // 右キー
    if (cursor.current_select_magic['x'] < 2 && e.keyCode === key_config.right){
        let next_magic_point = cursor.current_magic_cursor + 1;
        if (next_magic_point < NUMBER_OF_MAGIC){
            cursor.current_select_magic['x']++;
            // xy座標を返す
            console.log(cursor, points_data);
            let points_coordinate = points_data[cursor.current_select_magic['x']][cursor.current_select_magic['y']];
            drawMagicArrow(points_coordinate['x'],points_coordinate['y']);
        }
    }
    // キャンセルキー
    if (e.keyCode === key_config.back){
        cursor.current_cursor = 'first_decision_place';
        battlelog.decision(allyList[cursor.current_select_character]);
        drawFirstDicisionPlaceArrow(INTERVALS_OF_ARROW_ROW_HEIGHT * 0.5);
        cursor.initialize_when_back_command_line(1);
    }
    // 決定キー
    if (e.keyCode === key_config.enter){
        let magic_num = cursor.current_select_magic.x + (cursor.current_select_magic.y * 3);
        let cast_spell = allyList[cursor.current_select_character].characterMagicList[cursor.current_magic_cursor];
        if(cast_spell.categoryMagic === '攻撃'){
            cursor.current_cursor = 'select_enemy';
            let current_enemy_points = g_draw_character_instance.enemy_points[cursor.choice_current_enemy];
            drawEnemyArrow(current_enemy_points.x,current_enemy_points.y);
        }
        else if(cast_spell.categoryMagic === '回復'){
            cursor.current_cursor = 'select_ally';
            let current_ally_points = g_draw_character_instance.ally_points[cursor.choice_current_ally];
            drawAllyArrow(current_ally_points.x,current_ally_points.y);
        }
    }
}

function readMessage(e){
    if (e.keyCode === key_config.down || e.keyCode === key_config.enter){
        mode = 'normal';
    }
}

function titleMenu(e){
    if(e.keyCode === key_config.enter){
        cursor.current_cursor = 'move_map';
        mode = 'normal';
        cursor.current_command_number = 0;
    }
    else if(cursor.current_command_number < 2 && e.keyCode === key_config.down){
        cursor.current_command_number++;
    }
    else if(cursor.current_command_number > 0 && e.keyCode === key_config.up){
        cursor.current_command_number--;
    }
    drawTitleArrow(0, cursor.current_command_number * (wp.height * 0.06));
}

function pressEnter(e){
    if (e.keyCode === key_config.enter){
        cursor.current_cursor = 'title_menu';
        mode = 'normal';
    }
}

function moveMap(e){
    console.log(view);
    character_context.clearRect(0,0,wp.width, wp.height);
    if (e.keyCode === key_config.up && map.position.y > 0){
        map.position.y -= 10;
        src = 'img/move11.png';
    }

    else if (e.keyCode === key_config.down && map.position.y + map.scale.h + 10 < wp.height){
        map.position.y += 10;
        src = 'img/move2.png';
    }

    else if (e.keyCode === key_config.right && map.position.x + map.scale.w + 10< wp.width){
        map.position.x += 10;
        src = 'img/move8.png';
    }

    else if (e.keyCode === key_config.left && map.position.x > 0){
        map.position.x -= 10;
        src = 'img/move5.png';
    }
    else{
        return;
    }
    character_context.drawImage(view.getLoadedImageInstanceBySource(src), map.position.x, map.position.y, map.scale.w, map.scale.h);
    mode = 'normal';
}

function endOfBattle(e){
    if(e.keyCode === key_config.enter){
        if(mode !== "defeat"){
            cursor.current_cursor = 'title_menu';
        }
    }
}
