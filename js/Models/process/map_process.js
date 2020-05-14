function* mapProcess(){
    cursor.current_cursor = 'move_map';
    console.log(map);
    view.mapScene();
    let encount_percent = 0;
    while (true){
        let random_dice = Math.random() * 100;
        console.log(random_dice);
        // 天国草システムbyGodField
        encount_percent++;
        console.log(encount_percent);
        if(random_dice <= encount_percent){
            console.log("encount!");
            scene.process = 'battle';
            view.next_scene = 'fight_scene';
            cursor.initialize();
            break;
        }
        yield 'waitKey';
    }
}
