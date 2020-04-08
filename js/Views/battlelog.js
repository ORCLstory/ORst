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

    normalAttack(attacker, target, damage, status_event){
        this.addBattleLogList(attacker.individual_name + 'が' + target.individual_name + 'を攻撃した！');
        this.addBattleLogList(target.individual_name + 'に' + damage + 'ダメージ！');
        this.isStatusEffect(attacker, target, status_event);
        this.createBattleLog();
        this.deleteBattleLogList();
    }

    magicalAttack(attacker, target, action, damage, status_event){
        this.addBattleLogList(attacker.individual_name + 'は' + action.name + 'を唱えた！');
        this.addBattleLogList(target.individual_name + 'に' + damage + 'ダメージ！');
        this.isStatusEffect(attacker, target, status_event);
        this.createBattleLog();
        this.deleteBattleLogList();
    }

    isStatusEffect(attacker, target, status_event){
        if (status_event === 'dead'){
            if (attacker.team === 'ally'){
                this.addBattleLogList(target.individual_name + 'を倒した！');
            }
            else {
                this.addBattleLogList(target.name + 'が倒れた！');
            }
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
}
