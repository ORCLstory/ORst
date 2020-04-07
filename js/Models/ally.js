class AllyStatus{
    constructor(name){
        this.team = 'ally';
        this.status = ['alive'];
        this.name = name;
    }

    async setStatus(lv){
        this.lv = lv;
        let status_list = await this.getStatusForGoogleSpreadSheet(this.name,this.lv);
        this.individual_name = this.name;
        this.max_hp = status_list.max_hp;
        this.max_mp = status_list.max_mp;
        this.pad    = status_list.pad;
        this.par    = status_list.par;
        this.mad    = status_list.mad;
        this.mar    = status_list.mar;
        this.hmp    = status_list.hmp;

        this.now_hp = this.max_hp;
        this.now_mp = this.max_mp;
        return;
    }

    getStatusForGoogleSpreadSheet(name, lv){
    return new Promise(async (resolve,reject) =>{
        let request = new XMLHttpRequest();
        let category = 'ally_status';
        request.open('GET', 'https://script.google.com/a/kaetsu.ac.jp/macros/s/AKfycbyI2RCqWSMvmkTS01tox8RbikfydspgwuvGGHzi/exec?category=' + category + '&lv=' + lv + '&name=' + name, true);
        request.onload =  function(){
            let status_string = request.response;
            let status_list = JSON.parse(status_string);
            console.log(status_list);
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
}
