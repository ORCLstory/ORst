function* mapProcess(){
    console.log(map);
    view.mapScene();
    createCircle(map.position.x, map.position.y, 50);
    while (true){
        console.log('a');
        yield 'waitKey';
    }
    let x;
    let y;
}
