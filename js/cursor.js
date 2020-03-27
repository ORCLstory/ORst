class Cursor{
    // インスタンスを生成した際に呼ぶ
    constructor(){
        this.current_cursor = 'first_decision_place';
        this.choice_current_enemy  = 0;
        this.current_command_number = 0;
        this.current_select_character = 0;
        this.current_select_magic = 0;
    }
    // cursorの位置を初期化したい時に呼ぶ
    initialize(){
        this.current_cursor = 'first_decision_place';
        this.choice_current_enemy  = 0;
        this.current_command_number = 0;
        this.current_select_character = 0;
        this.current_select_magic = 0;
    }
}
