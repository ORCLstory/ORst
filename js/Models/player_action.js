class PlayerAction{
    constructor({player, target, action}={}){
        this.player = player;
        this.target = target;
        this.action = action;
    }
    reselectTarget(system){
        let actionableList = system.actionableList(this.target);
        this.target = actionableList[selectTarget(actionableList)];
    }
    calcurateDamage(){
        // 戦うを選択したなら
        if(this.action === null){
            console.log("戦うのダメージ計算");
            let damage = (this.player.pad / 2) + Math.floor(Math.random() * ((this.player.pad / 16) + 1));
            damage = Math.ceil(damage * (100 - this.target.par) / 100);
            this.target.dealDamage = damage;
            this.damage = damage;
        }
        // 魔法を選択したなら
        else if(this.action instanceof Magic){
            console.log("魔法のダメージ計算");
            let randomDamage = Math.ceil(Math.random() * this.action.randomDamageWidth + 1);
            randomDamage -= Math.ceil(Math.random() * this.action.randomDamageWidth + 1);
            let damage = Math.ceil((this.player.mad * this.action.damageMagnification) + this.action.guaranteeDamage + randomDamage);
            this.target.dealDamage = damage;
            this.damage = damage;
           return damage;
        }
    }
}
