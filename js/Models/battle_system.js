async function startBattleSystem(){
    // 味方の情報を定義
    const teo    = new AllyStatus('テオ');
    const graal  = new AllyStatus('グラール');
    const lin    = new AllyStatus('リン');
    const alycia = new AllyStatus('アリシア');

    allyList.push(teo);
    allyList.push(graal);
    allyList.push(lin);
    allyList.push(alycia);

    // 敵の情報を定義
    const slime1 = new EnemyStatus('スライム');
    const slime2 = new EnemyStatus('スライム');
    const slime3 = new EnemyStatus('スライム');

    enemyList.push(slime1);
    enemyList.push(slime2);
    enemyList.push(slime3);

    let results = [];
    for(let i = 0; i < allyList.length; i++){
        // AllyStatus.setStatusの引数はレベル
        results.push(allyList[i].setStatus(1));
    }

    for(let i = 0; i < enemyList.length; i++){
        results.push(enemyList[i].setStatus(1));
    }
    results.push(magic_list.setAllMagicList());
    // スプレッドシートから情報を非同期で取得するため、全部ステータスを取得するまで待つ
    await Promise.all(results);


    console.log(allyList);

    iterator.next();
    drawFirstDicisionPlaceArrow(0);
}

function* battleSystem(){

    // 味方の情報をリストに格納
    showStatus(allyList);

    // 敵の情報をリストに格納
    enemyNumbering(enemyList);

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
            // もし増えてたら決定してます。
            if (current_select_character < cursor.current_select_character){
                if (cursor.current_command_number === 1){
                    commandQueue.push({'player':actionableAllyList[current_select_character],'target':enemyList[cursor.choice_current_enemy],'action':magic_list.allMagicList[cursor.current_magic_cursor()]});
                }
                else {
                    commandQueue.push({'player':actionableAllyList[current_select_character],'target':enemyList[cursor.choice_current_enemy],'action':null});
                }

                console.log(cursor.current_command_number);
                if (commandQueue[commandQueue.length - 1].action === null){
                    console.log('戦うを選択したよ');
                }
                else if (commandQueue[commandQueue.length - 1].action instanceof Magic){
                    console.log('魔法を選択したよ');
                    console.log(magic_list.allMagicList[cursor.current_magic_cursor()].name);
                }
            }
            // もし減っていたらキャンセルしたとみなします。
            else if ( current_select_character > cursor.current_select_character) {
                commandQueue.pop();
            }
            if (cursor.current_select_character >= actionableAllyList.length){
                console.log(cursor.current_select_character);
                break;
            }
            // cursorの位置を初期化して、次のキャラクターに行動させます
            cursor.initialize_when_choice_next_character();
        }
        console.log(commandQueue);

        // 敵AIの攻撃対象選択
        for (let i = 0; i < actionableEnemyList.length; i++){
            commandQueue.push({'player':actionableEnemyList[i],'target':actionableAllyList[selectTarget(actionableAllyList)], 'action':null});
        }

        // コマンド入力終了時の処理
        gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        cursor.current_cursor = 'read_message';
        // battle_logを初期化
        battle_log_list = [];
        // commandQueueに追加された行動を順番に処理していく
        for (let i = 0; i < commandQueue.length; i++){
            // プレイヤーが行動不能な場合、処理を行わず次のプレイヤーに行動させる
            if (commandQueue[i].player.status.some(status => status === 'dead')){
                continue;
            // 対象が選択不能な場合、対象を変える
            }else if (commandQueue[i].target.status.some(status => status === 'dead')){
                console.log('変更前:', commandQueue[i].target);
                if (commandQueue[i].player.team === 'ally'){
                    actionableEnemyList = enemyList.filter(target => target.status.some(status => status === 'alive'));
                    commandQueue[i].target = actionableEnemyList[selectTarget(actionableEnemyList)];
                }
                else {
                    actionableAllyList = allyList.filter(target => target.status.some(status => status === 'alive'));
                    commandQueue[i].target = actionableAllyList[selectTarget(actionableAllyList)];
                }
                console.log('変更後:', commandQueue[i].target);
            }

            damage = calcurateDamage(commandQueue[i].player, commandQueue[i].target, commandQueue[i].action);
            console.log("ダメージ計算");
            console.log(commandQueue[i]);
            actionableEnemyList = enemyList.filter(target => target.status.some(status => status === 'alive'));
            g_draw_character_instance.enemy(actionableEnemyList);
            g_draw_character_instance.ally(allyList);
            commandQueue[i].target.dealDamage = damage;
            if (commandQueue[i].action === null){
                if (commandQueue[i].target.status.some(status => status === 'dead')){
                    battlelog.normalAttack(commandQueue[i].player, commandQueue[i].target, damage, 'dead');
                }
                else {
                    battlelog.normalAttack(commandQueue[i].player, commandQueue[i].target, damage, null);
                }
            }
            else if (commandQueue[i].action instanceof Magic){
                if (commandQueue[i].target.status.some(status => status === 'dead')){
                    battlelog.magicalAttack(commandQueue[i].player, commandQueue[i].target, commandQueue[i].action, damage, 'dead');
                }
                else {
                    battlelog.magicalAttack(commandQueue[i].player, commandQueue[i].target, commandQueue[i].action, damage, null);
                }
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

        cursor.initialize();
        drawFirstDicisionPlaceArrow(0);
    }
}

function calcurateDamage(attacker, defender, action){
    // 戦うを選択したなら
    if(action === null){
        console.log("戦うのダメージ計算");
        let damage = (attacker.pad / 2) + Math.floor(Math.random() * ((attacker.pad / 16) + 1));
        damage = Math.ceil(damage * (100 - defender.par) / 100);
        return damage;
    }
    // 魔法を選択したなら
    else if(action instanceof Magic){
        console.log("魔法のダメージ計算");
        let randomDamage = Math.ceil(Math.random() * action.randomDamageWidth + 1);
        randomDamage -= Math.ceil(Math.random() * action.randomDamageWidth + 1);
        console.log(randomDamage);
        let damage = Math.ceil((attacker.mad * action.damageMagnification) + action.guaranteeDamage + randomDamage);
        return damage;
    }
}

function selectTarget(targetList){
    return Math.floor(Math.random() * targetList.length);
}

function enemyNumbering(enemyList){
    for (let i = 0; i < enemyList.length; i++){
        let duplicationCounter = 0;
        for (let j = 1; j < enemyList.length; j++){
            if (enemyList[i].name === enemyList[j].individual_name){
                enemyList[j].individual_name = enemyList[j].name + String.fromCharCode(66 + duplicationCounter);
                console.log(enemyList[i].individual_name, enemyList[j].individual_name);
                duplicationCounter ++;
            }
        }
        if (duplicationCounter > 0){
            enemyList[i].individual_name = enemyList[i].name + String.fromCharCode(65);
        }
    }
}
