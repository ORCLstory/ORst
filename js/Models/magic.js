class Magic{
    constructor(){
    }
    
    async setAllMagicList(){
        this.allMagicList = await this.getAllMagicListForGoogleSpreadSheet();
    }

    getAllMagicListForGoogleSpreadSheet(name, lv){
    return new Promise(async (resolve,reject) =>{
            let request = new XMLHttpRequest();
            let category = 'all_magic_list';
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

    deelDamage(magic){

    }

    searchMagic(num){
        return this.allMagicList[num];
    }
}
