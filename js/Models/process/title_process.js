function* titleProcess(){
    audio.src = 'audio/bgm_maoudamashii_healing15.mp3';
    audio.play();
    view.initialize();
    view.titleScene();
    cursor.initialize_when_view_title_menu();
    console.log("view.titleScene finished");
    yield 'waitKey';
    audio.pause();
    scene.process = 'map';
    view.next_scene = 'map_scene';
    console.log("waitKey finished");
    view.deleteSourceImage();
}
