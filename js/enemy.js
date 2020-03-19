class EnemyStatus{
    constructor(name){
        this.name = name;
        this.team = 'enemy';

        if (this.name === 'スライム'){
            this.max_hp = 50;
            this.max_mp = 0;
            this.atk = 15;
            this.def = 10;
            this.lv = 1;
        }
        else if (this.name === 'ザコえもん'){
            this.max_hp = 40;
            this.max_mp = 10;
            this.atk = 15;
            this.def = 10;
            this.lv = 1;
        }
        this.now_hp = this.max_hp;
        this.now_mp = this.max_mp;
    }

        get open(){
            return {'NAME':this.name,'HP':this.now_hp,'MP':this.now_mp,'LV':this.lv};
        }

        set levelUp(num){
            this.lv += num;
        }

        set dealDamage(damage){
            this.now_hp -= damage;
            if (this.now_hp <= 0){
                this.now_hp = 0;
                this.status = ['dead'];
            }
        }
    }
