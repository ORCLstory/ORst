class Magic{
    constructor(magic_dict){
        this.name                = magic_dict.name;
        this.mpCost              = magic_dict.mpCost;
        this.damageMagnification = magic_dict.damageMagnification;
        this.guaranteeDamage     = magic_dict.guaranteeDamage;
        this.randomDamageWidth   = magic_dict.randomDamageWidth;
        this.element             = magic_dict.element;
    }
}

class MagicList{
    constructor(){
    }

    async setAllMagicList(){
        let list = await this.getAllMagicListForGoogleSpreadSheet();
        this.allMagicList = list.map(x => new Magic(x));
    }

    getAllMagicListForGoogleSpreadSheet(name, lv){
    return new Promise(async (resolve,reject) =>{
            let request = new XMLHttpRequest();
            let category = 'all_magic_list';
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

    searchMagic(num){
        return this.allMagicList[num];
    }
}
