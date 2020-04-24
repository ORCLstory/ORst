function* gameProcess(){
    while(true){
        console.log("gameProcess Start");
        view.initialize();
        view.titleScene();
        console.log("view.titleScene finished");
        yield 'waitKey';
        console.log("waitKey finished");
        yield 'require_loading';
        console.log("require_loading finished");
        // yield*演算子を使うことで、呼び出し先のyieldを間接的に使うことができる
        // https://qiita.com/townewgokgok/items/925b7024ff6dd204c770
        yield* battleProcess();
        console.log("battleProcess finished");
        if(mode === "defeat"){
            break;
        }
    }
}
