document.addEventListener('keydown',controller);


function controller(e){
    if (cursor.current_cursor === 'first_decision_place'){
        firstDecisionPlace(e);
    }

    else if (cursor.current_cursor === 'select_enemy'){
        selectEnemy(e);
    }

    else if (cursor.current_cursor === 'select_magic') {
        selectMagic(e);
    }

    else if (cursor.current_cursor === 'read_message'){
        readMessage(e);
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
        iterator.next();
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
        gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        drawFirstDicisionPlaceArrow(0);
        cursor.current_select_character++;
        iterator.next();
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
        cursor.current_select_magic['x']++;
        // xy座標を返す
        console.log(cursor, points_data);
        let points_coordinate = points_data[cursor.current_select_magic['x']][cursor.current_select_magic['y']];
        drawMagicArrow(points_coordinate['x'],points_coordinate['y']);
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
        cursor.current_cursor = 'select_enemy';
        let current_enemy_points = g_draw_character_instance.enemy_points[cursor.choice_current_enemy];
        drawEnemyArrow(current_enemy_points.x,current_enemy_points.y);
    }
}
function readMessage(e){
    if (e.keyCode === key_config.down || e.keyCode === key_config.enter){
        iterator.next();
    }
}
