class BattleLog{
    constructor(){
        this.battle_log_list = [];
    }

    createBattleLog(){
        txt_context.clearRect(wp.command_line_window.x, wp.command_line_window.y, wp.command_line_window.w, wp.command_line_window.h);
        txt_context.font = "15px 'MS ゴシック'";
        for(let i = 0; i < this.battle_log_list.length; i++){
            txt_context.fillText(this.battle_log_list[i],125,290 + (i*20),300);
        }
    }

    deleteBattleLogList(){
        this.battle_log_list = [];
    }

    addBattleLogList(log){
        this.battle_log_list.push(log);
    }

    encount(){
        this.addBattleLogList('敵が現れた！');
        this.createBattleLog();
        this.deleteBattleLogList();
    }

    decision(ally){
        this.addBattleLogList(ally.name + 'はどうする？');
        this.createBattleLog();
        this.deleteBattleLogList();
    }
    cast_a_magic(){
    }

    normalAttack(player_action, status_event){
        let player = player_action.player;
        let target = player_action.target;
        let action = player_action.action;
        let damage = player_action.damage;

        this.addBattleLogList(player.individual_name + 'が' + target.individual_name + 'を攻撃した！');
        this.isHappenCritical(player_action);
        this.addBattleLogList(target.individual_name + 'に' + damage + 'ダメージ！');
        this.isStatusEffect(player, target, status_event);
        this.createBattleLog();
        this.deleteBattleLogList();
    }

    magicalAttack(player_action, status_event){
        let player = player_action.player;
        let target = player_action.target;
        let action = player_action.action;
        let damage = player_action.damage;

        this.addBattleLogList(player.individual_name + 'は' + action.name + 'を唱えた！');
        this.addBattleLogList(target.individual_name + 'に' + damage + 'ダメージ！');
        this.isStatusEffect(player, target, status_event);
        this.isHappenCritical(player_action);
        this.createBattleLog();
        this.deleteBattleLogList();
    }
    magicalHeal(player_action, status_event){
        let player = player_action.player;
        let target = player_action.target;
        let action = player_action.action;
        let heal= player_action.heal;

        this.addBattleLogList(player.individual_name + 'は' + action.name + 'を唱えた！');
        this.addBattleLogList(target.individual_name + 'は' + heal + '回復した！');
        this.isHappenCritical(player_action);
        this.createBattleLog();
        this.deleteBattleLogList();
    }

    failedMagicalAttack(player_action){
        let player = player_action.player;
        let action = player_action.action;

        this.addBattleLogList(player.individual_name + 'は' + action.name + 'を唱えた！');
        this.addBattleLogList('しかし、MPが足りなかった！');
        this.createBattleLog();
        this.deleteBattleLogList();
    }

    isStatusEffect(player_action, status_event){
        let player = player_action.player;
        let target = player_action.target;
        if (status_event === 'dead'){
            if (player.team === 'ally'){
                this.addBattleLogList(target.individual_name + 'を倒した！');
            }
            else {
                this.addBattleLogList(target.name + 'が倒れた！');
            }
        }
    }

    isHappenCritical(player_action){
        let player = player_action.player;
        let isCritical = player_action.isCritical;
        let action = player_action.action;

        if (action === null && isCritical){
            if (player.team === 'ally'){
                this.addBattleLogList('会心の一撃！！');
            }
            else{
                this.addBattleLogList('痛恨の一撃！！');
            }
        }
        else if (action instanceof Magic && isCritical){
            console.log('魔力暴走！！')
            this.addBattleLogList(player.name + 'の魔力が暴走した！');
        }
    }

    defeat(){
        this.addBattleLogList('パーティは全滅してしまった……。');
        this.addBattleLogList('もう一度挑戦する場合はF5キーを押してね！');
        this.createBattleLog();
        this.deleteBattleLogList();
    }

    victory(){
        this.addBattleLogList('敵を全て倒した！');
        this.addBattleLogList('もう一度挑戦する場合はF5キーを押してね！');
        this.createBattleLog();
        this.deleteBattleLogList();
    }

    actionLog(player_action, status_event){
        let action = player_action.action;
        let target = player_action.target;
        
        if (arguments[2] === 'shortage'){
            this.failedMagicalAttack(player_action);
        }
        else if (action === null){
            this.normalAttack(player_action, status_event);
        }
        else if (action instanceof Magic){
            if(action.categoryMagic === '攻撃'){
                this.magicalAttack(player_action, status_event);
            }
            else if(action.categoryMagic === '回復'){
                this.magicalHeal(player_action, status_event);
            }
        }
    }
}
