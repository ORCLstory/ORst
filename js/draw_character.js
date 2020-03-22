class DrawCharacter{
    constructor(){
        this.enemy_points = [];
        this.ally_points = [];
    }

    enemy(enemyList){
        const dcp = new DrawCharacterProperty();
        character_context.clearRect(0, 0, character_canvas.width, character_canvas.height);
        this.enemy_points = dcp.drawEnemyCoordinate(enemyList.length);
        for(let i = 0; i < enemyList.length; i++){
            createCircle(this.enemy_points[i]["x"],this.enemy_points[i]["y"], 20);
        }
    }

    ally(allyList){
        const dcp = new DrawCharacterProperty();
        this.ally_points = dcp.drawAllyCoordinate(allyList.length);
        for(let i = 0; i < allyList.length; i++){
            createCircle(this.ally_points[i]["x"],this.ally_points[i]["y"], 15);
        }
    }
}
