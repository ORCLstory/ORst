class EnemyStatus{
    constructor(name){
        this.name = name;
        this.team = 'enemy';
        this.status = ['alive'];

        if (this.name === 'スライム'){
            this.individual_name = this.name;
            this.max_hp = 150;
            this.max_mp = 10;
            this.pad = 50;
            this.par = 10;
            this.mad = 10; // magical attack damage
            this.mar = 0; // magical attack resist
            this.emp = 0; // element magic power
            this.hmp = 0; // heal magic power
            this.lv = 1;
        }

        else if (this.name === 'ザコえもん'){
            this.max_hp = 40;
            this.max_mp = 10;
            this.pad = 15;
            this.par = 10;
            this.mad = 0; // magical attack damage
            this.mar = 0; // magical attack resist
            this.emp = 0; // element magic power
            this.hmp = 0; // heal magic power
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
