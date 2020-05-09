function* mapProcess(){
    console.log(map);
    view.mapScene();
    while (true){
        //view.showImage(map.position.x, map.position.y);
        console.log('a');
        yield 'waitKey';
    }
    let x;
    let y;
}
