class Cursor{
    // インスタンスを生成した際に呼ぶ
    constructor(){
        this.current_cursor = 'first_decision_place';
        this.choice_current_enemy  = 0;
        this.current_command_number = 0;
        this.current_select_character = 0;
        this.first_line_displayed_for_magic = 0;
        this.current_select_magic = {x:0, y:0};
    }
    // cursorの位置を初期化したい時に呼ぶ
    initialize(){
        this.current_cursor = 'first_decision_place';
        this.first_line_displayed_for_magic = 0;
        this.choice_current_enemy  = 0;
        this.current_command_number = 0;
        this.current_select_character = 0;
        this.current_select_magic = {x:0, y:0};
    }
    initialize_when_back_command_line(command_number){
        this.current_command_number = command_number;
        this.first_line_displayed_for_magic = 0;
        this.current_select_magic = {x:0, y:0};
    }
    initialize_when_choice_next_character(){
        this.current_cursor = 'first_decision_place';
        this.choice_current_enemy  = 0;
        this.current_command_number = 0;
        this.first_line_displayed_for_magic = 0;
        this.current_select_magic = {x:0, y:0};
    }

    current_magic_cursor(){
        return (this.first_line_displayed_for_magic + this.current_select_magic.y) * 3 + this.current_select_magic.x;
    }
}
