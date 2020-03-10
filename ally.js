class AllyStatus{
    constructor(name){
        this.name = name;
        this.team = 'ally';

        if (this.name === 'テオ'){
            this.hp = 25;
            this.mp = 20;
            this.atk = 15;
            this.def = 5;
            this.lv = 1;
        }
        else if (this.name === 'グラール'){
            this.hp = 30;
            this.mp = 10;
            this.atk = 20;
            this.def = 10;
            this.lv = 1;
        }
        else if (this.name === 'リン'){
            this.hp = 25;
            this.mp = 20;
            this.atk = 5;
            this.def = 10;
            this.lv = 1;
        }
        else if (this.name === 'アリシア'){
            this.hp = 25;
            this.mp = 20;
            this.atk = 5;
            this.def = 5;
            this.lv = 1;
        }
    }

    get open(){
        return {'NAME':this.name,'HP':this.hp,'MP':this.mp,'LV':this.lv};
    }

    // get team(){
    //     return this.
    // }

    // getStatusByName(){
    //     return {'NAME':this.name,'HP':this.hp,'MP':this.mp,'LV':this.lv};
    // }

    set levelUp(num){
        this.lv += num;
    }
}
