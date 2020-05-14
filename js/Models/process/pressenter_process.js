function* pressEnterProcess(){
    console.log("gameProcess Start");
    view.initialize();
    view.next_scene = 'pressenter_scene';
    yield 'pressEnter';
    scene.process = 'title';
    view.next_scene = 'title_scene';
}
