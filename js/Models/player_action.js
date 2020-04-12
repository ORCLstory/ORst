class PlayerAction{
    constructor({player, target, action}={}){
        this.player = player;
        this.target = target;
        this.action = action;
        this.criticalRate = 64;
    }

    reselectTarget(system){
        let actionableList = system.actionableList(this.target);
        this.target = actionableList[selectTarget(actionableList)];
    }

    calcurateDamage(){
        // 戦うを選択したなら
        if (this.action === null){
            if (this.calcurateCritical()){
                let damage = this.player.pad + Math.ceil(Math.random() * (this.player.pad * 0.05));
                damage -= Math.ceil(Math.random() * (this.player.pad * 0.05));
                this.target.dealDamage = damage;
                this.damage = damage;
                this.isCritical = true;
            }
            else{
                let damage = (this.player.pad / 2) + Math.ceil(Math.random() * ((this.player.pad / 16) + 1));
                damage -= Math.ceil(Math.random() * ((this.player.pad / 16) + 1));
                damage = Math.ceil(damage * (100 - this.target.def) / 100);
                this.target.dealDamage = damage;
                this.damage = damage;
                this.isCritical = false;
            }
        }
        // 魔法を選択したなら
        else if (this.action instanceof Magic){
            let randomDamage = Math.ceil(Math.random() * this.action.randomDamageWidth + 1);
            randomDamage -= Math.ceil(Math.random() * this.action.randomDamageWidth + 1);
            let damage = Math.ceil((this.player.mad * this.action.damageMagnification) + this.action.guaranteeDamage + randomDamage) * ((100 - this.target.def) / 100);
            this.target.dealDamage = damage;
            this.damage = damage;
            console.log(damage);
            if (this.calcurateCritical()){
                this.isCritical = true;
            }
            else this.isCritical = false;
        }
    }

    calcurateCritical(){
        let isCritical = Math.random() * this.criticalRate < 1;
        return isCritical;
    }
}
