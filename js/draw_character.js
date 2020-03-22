class DrawCharacter{
    constructor(){
        this.points = [];
    }

    enemy(enemyList){
        const dcp = new DrawCharacterProperty();
        character_context.clearRect(0, 0, character_canvas.width, character_canvas.height);
        let points = dcp.drawEnemyCoordinate(enemyList.length);
        for(let i = 0; i < enemyList.length; i++){
            createCircle(points[i]["x"],points[i]["y"], 20);
        }
    }

    ally(allyList){
        console.log(allyList);
        const dcp = new DrawCharacterProperty();
        let points = dcp.drawAllyCoordinate(allyList.length);
        console.log(points);
        for(let i = 0; i < allyList.length; i++){
            createCircle(points[i]["x"],points[i]["y"], 15);
        }
    }
}
