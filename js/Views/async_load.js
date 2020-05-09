async function loadTitleImage(){
    await view.loadImage("img/title_bg.png", bg_context, 0, 0, wp.width, wp.height);
    console.log("呼ばれた？");
    mode = 'normal';
}

async function loadMapImage(){
    await view.loadImage("img/move1.png", character_context, wp.width * 0.5, wp.height * 0.5, 32, 48);
    mode = 'normal';
}
