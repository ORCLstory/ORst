function* battleSystem(){
    // 敵の情報を定義
    const slime1 = new EnemyStatus('スライム1');
    const slime2 = new EnemyStatus('スライム2');
    const slime3 = new EnemyStatus('スライム3');

    // 味方の情報をリストに格納
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
            cursor.current_cursor = 'end';
            yield 0;
        }
        else if (actionableEnemyList.length === 0){
            battlelog.victory();
            cursor.current_cursor = 'end';
            yield 0;
        }

        cursor.current_select_character = 0;
        // 味方が攻撃対象を選択
        while (true){
            battlelog.decision(actionableAllyList[cursor.current_select_character]);
            let current_select_character = cursor.current_select_character;
            yield 0;
            // もし増えてたら決定してるよ
            if (current_select_character < cursor.current_select_character){
                commandQueue.push({'player':actionableAllyList[current_select_character],'target':enemyList[cursor.choice_current_enemy],'action':cursor.current_command_number});
                if (commandQueue.action === 0){
                    console.log('戦うを選択したよ');
                }
                else if (commandQueue.action === 1){
                    console.log('魔法を選択したよ');
                }
            }
            // もし増えてたら決定してるよ
            else if ( current_select_character > cursor.current_select_character) {
                commandQueue.pop();
            }
            if (cursor.current_select_character >= actionableAllyList.length){
                console.log(cursor.current_select_character);
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
        cursor.current_cursor = 'read_message';
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
            actionableAllyList = allyList.filter(target => target.status.some(status => status === 'alive'));
            actionableEnemyList = enemyList.filter(target => target.status.some(status => status === 'alive'));
            g_draw_character_instance.enemy(actionableEnemyList);
            g_draw_character_instance.ally(allyList);

            // 全滅しているかどうかを判定
            if (actionableAllyList.length === 0){
                battlelog.defeat();
                cursor.current_cursor = 'end';
                yield 0;
            }
            else if (actionableEnemyList.length === 0){
                battlelog.victory();
                cursor.current_cursor = 'end';
                yield 0;
            }

            yield 0;
        }

        cursor.current_cursor = 'first_decision_place';
        drawFirstDicisionPlaceArrow(0);
    }
}

function calcurateDamage(attacker, defender){
    let damage = attacker.pad / 2;
    damage += Math.floor(Math.random() * ((attacker.pad / 16) + 1));
    damage = Math.ceil(damage * ((100 - defender.par) / 100));
    return damage;
}

function select_target(targetList){
    return Math.floor(Math.random() * targetList.length);
}
