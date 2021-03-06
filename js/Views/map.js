class MapClass{
    constructor(){
        this.position = {x: 100, y:100};
        this.scale = {w:32, h:48};
    }

    create(){
        view.initialize();
        this.read();
        this.createMapTile();
    }


    read(){
        this.map_data = [
            [0,0,1,0,0,1,1,0],
            [0,0,1,0,0,1,1,0],
            [0,1,1,1,1,1,1,0],
            [0,1,1,0,0,1,1,0],
            [0,0,0,0,0,1,1,0],
            [0,0,0,0,0,1,1,0],
            [1,1,0,1,0,1,1,0]
        ]
    }
    createMapTile(){
        for(let i = 0; i < this.map_data.length; i++){
            for(let j = 0; j < this.map_data[i].length; j++){
                if(this.map_data[i][j] === 1){
                    bg_context.drawImage(view.getLoadedImageInstanceBySource("img/pipo-map001.png"),0,0,40,40,map_config.stepx * j, map_config.stepy * i, map_config.stepx, map_config.stepy);
                }
                else if(this.map_data[i][j] === 0){
                    bg_context.drawImage(view.getLoadedImageInstanceBySource("img/pipo-map001.png"),160,40,40,40,map_config.stepx * j, map_config.stepy * i, map_config.stepx, map_config.stepy);
                }
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
