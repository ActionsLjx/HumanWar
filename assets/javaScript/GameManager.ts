import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')


export class GameManager extends Component {
    @property({type: Node})
    public startMenu: Node | null = null;

    onLoad() {
     
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    playBtnClick() {
        
        console.log("2121");
        director.loadScene('gameScene');
    }
}

