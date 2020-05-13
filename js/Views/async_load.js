async function loadTitleImage(){
    await view.loadImage("img/title_bg.png", bg_context, 0, 0, wp.width, wp.height);
    console.log("呼ばれた？");
    mode = 'normal';
}

async function loadMapImage(){
    let promise_results = [];
    // 下
    promise_results.push(view.loadImage("img/pipo-map001.png", bg_context, wp.width, wp.height, 320, 680));
    promise_results.push(view.loadImage("img/move2.png", character_context, wp.width * 0.5, wp.height * 0.5, 32, 48));
    // 左
    promise_results.push(view.loadImage("img/move5.png", character_context, wp.width * 0.5, wp.height * 0.5, 32, 48));
    // 右
    promise_results.push(view.loadImage("img/move8.png", character_context, wp.width * 0.5, wp.height * 0.5, 32, 48));
    // 上
    promise_results.push(view.loadImage("img/move11.png", character_context, wp.width * 0.5, wp.height * 0.5, 32, 48));
    await Promise.all(promise_results);
    mode = 'normal';
}
