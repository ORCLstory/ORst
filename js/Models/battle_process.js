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

    let promise_results = [];
    allyList.forEach(element => promise_results.push(element.setStatus(1)));
    enemyList.forEach(element => promise_results.push(element.setStatus(1)));
    allyList.forEach(element => promise_results.push(element.setCharacterMagicList()));
    //promise_results.push(magic_list.setAllMagicList());
    // スプレッドシートから情報を非同期で取得するため、全部ステータスを取得するまで待つ
    await Promise.all(promise_results);

    console.log(allyList);


    iterator.next();
    drawFirstDicisionPlaceArrow(0);
}

function* battleProcess(){
    // BattleSystemクラスを呼び出し
    system = new BattleSystem(allyList, enemyList);

    showStatus(allyList);
    // モブの名前の末尾にABCDEFGがつくようになる
    enemyNumbering(enemyList);

    // エンカウント時の処理
    drawFightScene();
    battlelog.encount();

    //敵と味方を描画する
    system.drawAllCharacter();

    // 1ターンの処理
    while (true){
        // 行動できる敵・味方を更新
        system.refreshActionableList();

        // 各キャラクターの行動を初期化
        let commandQueue = new CommandQueue();

        // 行動選択をするキャラクターを先頭に戻す
        cursor.current_select_character = 0;

        // 全員のコマンド選択が終わるまでループさせる
        while (true){
            // 「◯◯はどうする？」というメッセージを表示
            battlelog.decision(system.current_select_character);
            // yieldで処理を一時中断する前に現在のキャラクター選択を保存しておく
            let current_select_character = cursor.current_select_character;
            yield 0;

            // 味方の行動を選択
            system.decisionCommand(current_select_character, commandQueue);

            // 全員のコマンドが選択し終わったら次の処理へ
            if (cursor.current_select_character >= system.actionableAllyList.length){
                break;
            }

            // cursorの位置を初期化して、次のキャラクターに行動させる
            cursor.initialize_when_choice_next_character();
        }

        // コマンド入力終了時の処理
        gc_context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
        cursor.current_cursor = 'read_message';

        // 敵AIの攻撃対象選択
        system.enemySelectTarget(commandQueue);

        // commandQueueを素早さ順で並び替え
        commandQueue.sortBySpd();
        console.log(commandQueue);

        // commandQueueに追加された行動を順番に処理していく
        for (let i = 0; i < commandQueue.length; i++){
            for (let j = 0; j < 1; j++) {

                // 攻撃側が行動不能な場合、処理を行わず次のプレイヤーに行動させる
                if (commandQueue[i].player.isDead){
                    continue;
                // 対象が選択不能な場合、対象を変える
                }else if (commandQueue[i].target.isDead){
                    system.refreshActionableList();
                    commandQueue[i].reselectTarget(system);
                }

                // MPコストが足りているかの確認
                let shortage = null;
                if (commandQueue[i].action instanceof Magic){
                    if (commandQueue[i].isCritical){
                        if (commandQueue[i].player.dedicateMP(0)){
                            shortage = 'shortage';
                        }
                        else{
                            shortage = null;
                        }
                    }
                    else{
                        if (commandQueue[i].player.dedicateMP(commandQueue[i].action.mpCost)){
                            shortage = 'shortage';
                        }
                        else{
                            shortage = null;
                        }
                    }
                }

                // ダメージ計算
                commandQueue[i].calcurateDamage(shortage);
                if (commandQueue[i].isCritical && commandQueue[i].action instanceof Magic){
                    if (commandQueue[i].target.isDead){
                        battlelog.actionLog(commandQueue[i], 'dead', shortage);
                    }
                    else {
                        battlelog.actionLog(commandQueue[i], null, shortage);
                    }
                    showStatus(allyList);
                    system.refreshActionableList();
                    system.drawAllCharacter();
                    yield 0;
                    j--;
                    console.log(j);
                }
                else {
                    if (commandQueue[i].target.isDead){
                        battlelog.actionLog(commandQueue[i], 'dead', shortage);
                    }
                    else {
                        battlelog.actionLog(commandQueue[i], null, shortage);
                    }
                    showStatus(allyList);
                    system.refreshActionableList();
                    system.drawAllCharacter();
                    yield 0;
                    console.log(j);
                }
            }

            // 全滅しているかどうかを判定
            if (system.isWipe) break;
        }
        if (system.isWipe) break;
        cursor.initialize();
        drawFirstDicisionPlaceArrow(0);
    }
}

function enemyNumbering(enemyList){
    for (let i = 0; i < enemyList.length; i++){
        let duplicationCounter = 0;
        for (let j = 1; j < enemyList.length; j++){
            if (enemyList[i].name === enemyList[j].individual_name){
                enemyList[j].individual_name = enemyList[j].name + String.fromCharCode(66 + duplicationCounter);
                duplicationCounter ++;
            }
        }
        if (duplicationCounter > 0){
            enemyList[i].individual_name = enemyList[i].name + String.fromCharCode(65);
        }
    }
}
function selectTarget(targetList){
    return Math.floor(Math.random() * targetList.length);
}
