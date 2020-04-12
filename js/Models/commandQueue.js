class CommandQueue extends Array{
    constructor(){
        super();
    }

    debug(){
        console.log(this[0]);
    }

    sortBySpd(){
        this.sort((a,b) => b.player.spd - a.player.spd);
    }
    reselectTarget(number,system){
        let actionableList = system.actionableList(this[number].target);
        this[number].target = actionableList[selectTarget(actionableList)];
    }
}
