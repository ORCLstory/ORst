//const WINDOW_WIDTH = 480,WINDOW_HEIGHT = 360;
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
