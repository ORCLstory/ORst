class MapClass{
    constructor(){
        this.position = {x: 100, y:100};
        this.scale = {w:32, h:48};
    }

    create(){
        view.initialize();
        //this.drawGrid(bg_context, 'lightgray', 40, 40);
        this.read();
        this.createMapTile();
    }


    read(){
        this.map_data = [
            [0,0,1,0,0,1,1,0],
            [0,0,0,0,0,1,1,0],
            [0,1,1,0,0,1,1,0],
            [0,1,1,0,0,1,1,0],
            [0,0,0,0,0,1,1,0],
            [0,0,0,0,0,1,1,0],
            [1,1,0,1,0,1,1,0]
        ]
    }
    createMapTile(){
        bg_context.beginPath();
        for(let i = 0; i < this.map_data.length; i++){
            for(let j = 0; j < this.map_data[i].length; j++){
                bg_context.beginPath();
                bg_context.rect(map_config.stepx * j, map_config.stepy * i, map_config.stepx, map_config.stepy);
                if(this.map_data[i][j] === 1){
                    bg_context.fillStyle = "rgb(0, 0, 0)";
                }
                else if(this.map_data[i][j] === 0){
                    bg_context.fillStyle = "rgb(255, 255, 255)";
                }
                bg_context.fill();
            }
        }

    }
    readMapTile(){
    }

    drawGrid(context, color, stepx, stepy){
        context.strokeStyle = color;
        context.lineWidth = 0.5;

        for(let i = stepx + 0.5; i < wp.width; i += stepx){
            context.beginPath();
            context.moveTo(i, 0);
            context.lineTo(i, wp.height);
            context.stroke();
        }

        for(let i = stepy + 0.5;i < wp.height; i += stepy){
            context.beginPath();
            context.moveTo(0, i);
            context.lineTo(wp.width, i);
            context.stroke();
        }
    }
}
