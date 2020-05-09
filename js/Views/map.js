class MapClass{
    constructor(){
        this.position = {x: 100, y:100};
        this.scale = {w:32, y:48};
    }

    create(){
        view.initialize();
        this.drawGrid(bg_context, 'lightgray', 40, 40);
    }

    read(){
        let map_data = [
            [0,1,1],
            [0,0,0],
            [1,1,0]
        ]
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
