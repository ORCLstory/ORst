class windowProperty{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.status_window = {x: 0, y: 0, w: this.width * 0.25, h:this.height * 0.22};
        this.intervals_of_status_row_height = this.height * 0.04;
        this.command_line_window = {x: 0,y: this.height * 0.75, w: this.width, h: this.height * 0.25};
        this.fight_command_window = {x: 0, y: this.height * 0.75, w: this.width * 0.25, h: this.height * 0.25}
        this.fight_command_txt = {x: this.width * 0.05, y: this.height * 0.8, intervals: this.height * 0.042};
        this.start_status_row = {x: this.status_window.x + this.status_window.w * 0.33,y: this.height * 0.041};
    }
}

class DrawCharacterProperty{
    constructor(){
    }
    drawEnemyCoordinate(num){
        if(num === 1){
            return [
                {x:wp.width * 0.104,y:wp.height * 0.472}
            ];
        }
        else if(num == 2){
            return [
                {x:wp.width * 0.104,y:wp.height * 0.383},
                {x:wp.width * 0.104,y:wp.height * 0.561}
            ];
        }
        else if(num == 3){
            return [
                {x:wp.width * 0.104,y:wp.height * 0.333},
                {x:wp.width * 0.104,y:wp.height * 0.472},
                {x:wp.width * 0.104,y:wp.height * 0.611}
            ];
        }
    }
//const WINDOW_WIDTH = 480,WINDOW_HEIGHT = 360;
    drawAllyCoordinate(num){
        if(num ===  1){
            return [
                {x:wp.width * 0.896, y:wp.height * 0.333}
            ]

        }
        else if(num === 2){
            return [
                {x:wp.width * 0.896, y:wp.height * 0.333},
                {x:wp.width * 0.896, y:wp.height * 0.444}
            ]
        }
        else if(num === 3){
            return [
                {x:wp.width * 0.896, y:wp.height * 0.333},
                {x:wp.width * 0.896, y:wp.height * 0.444},
                {x:wp.width * 0.896, y:wp.height * 0.555}
            ]
        }
        else if(num ===4){
            return [
                {x:wp.width * 0.896, y:wp.height * 0.333},
                {x:wp.width * 0.896, y:wp.height * 0.444},
                {x:wp.width * 0.896, y:wp.height * 0.555},
                {x:wp.width * 0.896, y:wp.height * 0.666}
            ]
        }
    }
}
