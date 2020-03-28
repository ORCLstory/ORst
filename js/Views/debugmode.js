let toggleButton = document.getElementById('go-to-debug-mode');
let whichText = '現行環境に切り替え'
toggleButton.onclick = function(){
    if (whichText === '現行環境に切り替え'){
        toggleButton.innerText = whichText;
        whichText = 'デバッグモードに切り替え'
    }
    else{
        toggleButton.innerText = whichText;
        whichText = '現行環境に切り替え';
    }

}
