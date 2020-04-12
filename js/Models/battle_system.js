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
                commandQueue.push({'player':this.actionableAllyList[current_select_character],'target':this.enemyList[cursor.choice_current_enemy],'action':magic_list.allMagicList[cursor.current_magic_cursor()]});
            }
            else {
                commandQueue.push({'player':this.actionableAllyList[current_select_character],'target':this.enemyList[cursor.choice_current_enemy],'action':null});
            }
            console.log(commandQueue[commandQueue.length-1]);
        }
        // もし減っていたらキャンセルしたとみなします。
        else if (current_select_character > cursor.current_select_character) {
            commandQueue.pop();
        }
    }

    enemySelectTarget(commandQueue){
        for (let i = 0; i < this.actionableEnemyList.length; i++){
            commandQueue.push({'player':this.actionableEnemyList[i],'target':this.actionableAllyList[selectTarget(this.actionableAllyList)], 'action':null});
        }
    }
}
