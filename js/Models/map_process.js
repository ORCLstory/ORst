function* mapProcess(){
    view.mapScene();
    yield 'waitKey';
}
