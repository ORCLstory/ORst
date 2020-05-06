function* gameProcess(){
    yield* pressEnterProcess();
    while(true){
        yield 'require_loading';
        if(scene.process === 'battle'){
            yield* battleProcess();
            if(mode === "defeat"){
                break;
            }
        }

        else if(scene.process === 'config'){
            yield* configProcess();
        }

        else if(scene.process === 'map'){
            yield* mapProcess();
        }

        else if(scene.process === 'title'){
            yield* titleProcess();
        }
    }
}
