class WindowProperty{
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

class DrawMagicListProperty{
    constructor(){
        this.column_count = 3;
    }
    draw2dCursorListCoordinate(num){
        // 渡された座標をカーソル用に2次元配列に置き換える関数
        let basic_points = this.drawMagicListCoordinate(num);
        let points_for_2d = [];
        // そのまま区切るとpoints_coordinate["y"]["x"]の順に指定することになり
        // 直感と反するため、転置を行う。
        for(let i = 0; i < basic_points.length; i++){
            let column_place_number = i % this.column_count;
            if(i < this.column_count){
                points_for_2d[i] = [];
            }
            // 元座標はテキスト表示用のためカーソル用に座標を微調整
            basic_points[i]["x"] = basic_points[i]["x"] -= wp.width * 0.02;
            basic_points[i]["y"] = basic_points[i]["y"] -= wp.height * 0.03;
            points_for_2d[column_place_number].push(basic_points[i]);
        }
        return points_for_2d;
    }
    drawMagicListCoordinate(num){
        let coordinate_list = [];
        let magic_row_count = Math.ceil(num / 3);
        let magic_row_remainder = num % 3;
        for(let i = 0; i < magic_row_count; i++){
            //最後のループだけ余りの処理を行う
            if (i === magic_row_count - 1 && magic_row_remainder != 0){
                for(let j = 0; j < magic_row_remainder; j++){
                    coordinate_list.push({
                        x: 140 + (j * 70),
                        y: 290 + (i * 30)
                    })
                }
            }
            else{
                for(let j = 0; j < 3; j++){
                    coordinate_list.push({
                        x: 140 + (j * 70),
                        y: 290 + (i * 30)
                    })
                }
            }
        }
        return coordinate_list;
    }
}

class KeyConfig{
    constructor(){
        this.up    = 87;
        this.down  = 83;
        this.right = 68;
        this.left  = 65;
        this.enter = 13;
        this.back = 88;
    }
}
