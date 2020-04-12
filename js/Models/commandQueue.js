class CommandQueueClass extends Array{
    constructor(){
        super();
    }

    debug(){
        console.log(this[0]);
    }

    sortBySpd(){
        this.sort((a,b) => b.player.spd - a.player.spd);
    }
}
