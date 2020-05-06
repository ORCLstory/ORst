function animationStart(){
    mode = 'normal';

    let iterator = gameProcess();
    let frame = 0;

    waitingFrames = 0;
    loadingFrames = 0;

    function update(){
        request = null;
        let r;
        switch (mode) {

            case 'waitKey':
                break;

            case 'loading':
                loadingFrames++;
                view.initialize();
                view.blackScreen();
                view.loadingScene();
                break;

            case 'pressEnter':
                loadingFrames++;
                view.initialize();
                view.pressEnter();
                break;

            case 'require_loading':
                view.loadAsyncData();
                mode = 'loading';
                break;

            case 'waitFrame':
                waitingFrames--;
                if (waitingFrames <= 0){
                    mode = 'normal';
                }
                break;
            case 'defeat':
                break;

            default:
                console.log("normal!");
                r = iterator.next();
                if(r.value) mode = r.value;
        }
        frame++;
        // rが定義されていないか、処理が終わっていない場合、次のframeのアニメーションを実行する
        if(!(r && r.done)){
            request = requestAnimationFrame(update);
        }
    }
    request = requestAnimationFrame(update);
}
