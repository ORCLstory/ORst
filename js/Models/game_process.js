function* gameProcess(){
    while(true){
        view.initialize();
        view.titleScene();
        yield 'waitKey';
        yield 'require_loading';
        // yield*演算子を使うことで、呼び出し先のyieldを間接的に使うことができる
        // https://qiita.com/townewgokgok/items/925b7024ff6dd204c770
        yield* battleProcess();
        if(mode === "defeat"){
            break;
        }
    }
}
