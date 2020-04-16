class BattleSystem{
    constructor(allyList, enemyList){
        this.allyList  = allyList;
        this.enemyList = enemyList;
        this.actionableAllyList = this.allyList;
        this.actionableEnemyList = this.enemyList;
    }
    get current_select_character(){
        return this.actionableAllyList[cursor.current_select_character];
    }
    actionableList(target){
        // 対象の陣営の行動可能な対象を最取得する関数。
        // Characterクラスのインスタンスを引数に取り、.teamで判別する。
        if (target.team === 'ally'){
            return this.actionableAllyList;
        }
        else {
            return this.actionableEnemyList;
        }
    }

    drawAllCharacter(){
        // 戦闘シーンにおける敵味方を描画するメソッド
        g_draw_character_instance = new DrawCharacter();
        g_draw_character_instance.enemy(this.actionableEnemyList);
        g_draw_character_instance.ally(this.allyList);
    }

    refreshActionableList(){
        // 行動可能なキャラクターのリストを更新するメソッド
        this.actionableAllyList = this.allyList.filter(target => target.status.some(status => status === 'alive'));
        this.actionableEnemyList = this.enemyList.filter(target => target.status.some(status => status === 'alive'));
    }

    get isWipe(){
        // 全滅しているかどうかを判定するメソッド
        if (this.actionableAllyList.length === 0){
            battlelog.defeat();
            return true;
        }
        else if (this.actionableEnemyList.length === 0){
            battlelog.victory();
            return true;
        }
        else {
            return false;
        }
    }

    decisionCommand(current_select_character, commandQueue){
        // もし増えてたら決定してます。
        if (current_select_character < cursor.current_select_character){
            if (cursor.current_command_number === 1){
                let player_action = new PlayerAction({
                    'player':this.actionableAllyList[current_select_character],
                    'target':cursor.choice_instance,
                    'action':this.actionableAllyList[current_select_character].characterMagicList[cursor.current_magic_cursor]
                });
                commandQueue.push(player_action);
                console.log(player_action);
            }
            else {
                let player_action = new PlayerAction({
                    'player':this.actionableAllyList[current_select_character],
                    'target':cursor.choice_instance,
                    'action':null
                });
                commandQueue.push(player_action);
                console.log(player_action);
            }
        }
        // もし減っていたらキャンセルしたとみなします。
        else if (current_select_character > cursor.current_select_character) {
            commandQueue.pop();
        }
    }

    enemySelectTarget(commandQueue){
        for (let i = 0; i < this.actionableEnemyList.length; i++){
            let player_action = new PlayerAction({
                'player':this.actionableEnemyList[i],
                'target':this.actionableAllyList[selectTarget(this.actionableAllyList)],
                'action':null
            });
            commandQueue.push(player_action);
        }
    }
}
