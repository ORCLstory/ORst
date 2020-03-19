class AllyStatus{
    constructor(name){
        this.name = name;
        this.team = 'ally';

        if (this.name === 'テオ'){
            this.max_hp = 25;
            this.max_mp = 20;
            this.atk = 15;
            this.def = 5;
            this.lv = 1;
        }
        else if (this.name === 'グラール'){
            this.max_hp = 30;
            this.max_mp = 10;
            this.atk = 20;
            this.def = 10;
            this.lv = 1;
        }
        else if (this.name === 'リン'){
            this.max_hp = 25;
            this.max_mp = 20;
            this.atk = 5;
            this.def = 10;
            this.lv = 1;
        }
        else if (this.name === 'アリシア'){
            this.max_hp = 25;
            this.max_mp = 20;
            this.atk = 5;
            this.def = 5;
            this.lv = 1;
        }
        this.now_hp = this.max_hp;
        this.now_mp = this.max_mp;
    }

    get open(){
        return {'NAME':this.name,'HP':this.hp,'MP':this.mp,'LV':this.lv};
    }

    set levelUp(num){
        this.lv += num;
    }
}
