class Character{
    constructor(name){
        this.status = ['alive'];
        this.name = name;
        this.category ='';
        this.individual_name = this.name;
        this.does_get_status = false;
    }
    async setStatus(lv){
        this.lv = lv;
        let status_list = await this.getStatusForGoogleSpreadSheet(this.name,this.lv, this.category);
        this.max_hp = status_list.max_hp;
        this.max_mp = status_list.max_mp;
        this.pad    = status_list.pad;
        this.mad    = status_list.mad;
        this.spd    = status_list.spd;
        this.def    = status_list.def;

        this.now_hp = this.max_hp;
        this.now_mp = this.max_mp;
        this.does_get_status = true;
        return;
    }
    async setCharacterMagicList(){
        let magic_list = await this.getStatusForGoogleSpreadSheet(this.name, this.lv, 'character_magic_list');
        this.characterMagicList = magic_list.map(x => new Magic(x));
    }

    getStatusForGoogleSpreadSheet(name, lv, category){
        return new Promise(async (resolve,reject) =>{
            let request = new XMLHttpRequest();
            request.open('GET', 'https://script.google.com/a/kaetsu.ac.jp/macros/s/AKfycbyI2RCqWSMvmkTS01tox8RbikfydspgwuvGGHzi/exec?category=' + category + '&lv=' + lv + '&name=' + name, true);
            request.onload =  function(){
                let status_string = request.response;
                let status_list = JSON.parse(status_string);
                resolve(status_list);
            };
            request.onerror = function(){
                console.log("failed");
                reject(new Error('fail'));
            };
            request.send();
        });
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
    set healHP(heal){
        this.now_hp += heal;
        if (this.now_hp > this.max_hp){
            this.now_hp = this.max_hp;
        }
    }

    get isDead(){
        // statusの中に'dead'が見つかれば死亡判定を行う
        return this.status.some(s => s ==='dead');
    }

    dedicateMP(costMP){
        if (this.now_mp >= costMP){
            this.now_mp -= costMP;
            return false;
        }
        else {
            return true;
        }
    }
}
