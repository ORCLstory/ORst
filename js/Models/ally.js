class AllyStatus{
    constructor(name, lv){
        this.team = 'ally';
        this.status = ['alive'];

        var request = new XMLHttpRequest();
        request.open('GET', 'https://script.google.com/a/kaetsu.ac.jp/macros/s/AKfycbyI2RCqWSMvmkTS01tox8RbikfydspgwuvGGHzi/exec?lv=' + lv + '&name=' + name, true);
        request.addEventListener('load', (event) => {
            this.name = request.response.name;
            this.lv = request.response.lv;
            this.max_hp = request.response.max_hp;
            this.max_mp = request.response.max_mp;
            this.pad = request.response.pad;
            this.par = request.response.par;
            this.mad = request.response.mad;
            this.mar = request.response.mar;
            this.hmp = request.response.hmp;
        });
        request.send();

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
