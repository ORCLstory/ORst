class EnemyStatus{
    constructor(name){
        this.name = name;
        this.team = 'enemy';

        if (this.name === 'スライム'){
            this.hp = 50;
            this.mp = 0;
            this.atk = 15;
            this.def = 10;
            this.lv = 1;
        }
        else if (this.name === 'ザコえもん'){
            this.hp = 40;
            this.mp = 10;
            this.atk = 15;
            this.def = 10;
            this.lv = 1;
        }

        get open(){
            return this.getStatusByName();
        }

        getStatusByName(){
            return {'NAME':this.name,'HP':this.hp,'MP':this.mp,'LV':this.lv};
        }

        set levelUp(num){
            this.lv += num;
        }
    }
}
