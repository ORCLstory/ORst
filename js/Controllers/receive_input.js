document.addEventListener('keydown',controller);

function controller(e){
    const key_config = new KeyConfig();
    let g_log = document.getElementById('debug');
    const INTERVALS_OF_ARROW_ROW_HEIGHT = Math.ceil(WINDOW_HEIGHT * 0.04);
    if (cursor.current_cursor === 'first_decision_place'){
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
                console.log("多分、魔法の画面にいくよ");
                cursor.current_cursor = 'select_magic';
                drawMagicArrow(0,0);
                viewMagicList();
            }
            if (cursor.current_command_number === 2){
                console.log("多分、道具の画面にいくよ");
            }
            if (cursor.current_command_number === 3){
                console.log("多分、逃げられるよ");
            }
        }
        // Aキー
        if (e.keyCode === key_config.left || e.keyCode === key_config.back){
            cursor.current_select_character--;
            iterator.next();
        }
    }

    else if (cursor.current_cursor === 'select_enemy'){
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
            cursor.current_command_number = 0;
            cursor.current_cursor = 'first_decision_place';
            gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
            drawFirstDicisionPlaceArrow(0);
            //tmp
            cursor.current_select_character++;
            iterator.next();
            cursor.choice_current_enemy = 0;
        }
        // キャンセルキー
        if (e.keyCode === key_config.back){
            cursor.current_cursor = 'first_decision_place';
            gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
            drawFirstDicisionPlaceArrow(0);
            battlelog.decision(allyList[cursor.current_select_character]);
        }
    }

    else if (cursor.current_cursor === 'select_magic') {
        const INTERVALS_OF_ARROW_ROW_HEIGHT = Math.ceil(WINDOW_HEIGHT * 0.05);
        const NUMBER_OF_MAGIC = magic.allMagicList.length;
        // 下キー
        if (cursor.current_select_magic < NUMBER_OF_MAGIC - 1 && e.keyCode === key_config.down){
            cursor.current_select_magic++;
            console.log(cursor.current_select_magic);
            drawMagicArrow(0,INTERVALS_OF_ARROW_ROW_HEIGHT * cursor.current_select_magic);
        }
        // 上キー
        if (cursor.current_select_magic > 0 && e.keyCode === key_config.up){
            cursor.current_select_magic--;
            console.log(cursor.current_select_magic);
            drawMagicArrow(0,INTERVALS_OF_ARROW_ROW_HEIGHT * cursor.current_select_magic);
        }
        // キャンセルキー
        if (e.keyCode === key_config.back){
            cursor.current_cursor = 'first_decision_place';
            drawFirstDicisionPlaceArrow(INTERVALS_OF_ARROW_ROW_HEIGHT * 1);
            battlelog.decision(allyList[cursor.current_select_character]);
            cursor.current_select_magic = 0;
        }
        // 決定キー
        if (e.keyCode === key_config.enter){
            cursor.current_cursor = 'select_enemy';
            let current_enemy_points = g_draw_character_instance.enemy_points[cursor.choice_current_enemy];
            drawEnemyArrow(current_enemy_points.x,current_enemy_points.y);

        }
    }

    else if (cursor.current_cursor === 'read_message'){
        if (e.keyCode === key_config.down || e.keyCode === key_config.enter){
            iterator.next();
        }
    }
}
