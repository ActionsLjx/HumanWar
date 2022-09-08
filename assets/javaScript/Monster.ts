import { _decorator, Component, Node, Prefab, instantiate, Vec3 } from 'cc';
import { joystick } from './joystick';
const { ccclass, property } = _decorator;

enum MonsterType{
    MonsterType_One,
    MonsterType_Two
}

@ccclass('monster')
export class Monster extends Component {
    @property({type: Prefab})
    public cubePrfb: Prefab | null = null;
    // 赛道长度
    @property
    public monsterNum = 10;
    private _monsterArr: Node[] = [];


    @property({type:Node})
    public player: Node | null = null;

    private initTime:number = 0;
    //速度
    speed: Vec3 = new Vec3(1, 1, 0);
    
    start() {
        console.log("monste2r");
        this.generateMonster();
    }


    generateMonster() {
        if(this._monsterArr.length >this.monsterNum){
            return;
        }    
        
        let block: Node = this.spawnBlockByType(MonsterType.MonsterType_One);
            // 判断是否生成了道路，因为 spawnBlockByType 有可能返回坑（值为 null）
            if (block) {
                this.node.addChild(block);
                var x = Math.floor(Math.random() * 600);
                var y = Math.floor(Math.random() * 900);
                block.setPosition(300, 100, 0);
                this._monsterArr.push(block);
            }
    }
    

    spawnBlockByType(type: MonsterType) {
        if (!this.cubePrfb) {
            return null;
        }

        let block: Node | null = null;
        // 赛道类型为实路才生成
        switch(type) {
            case MonsterType.MonsterType_One:
                block = instantiate(this.cubePrfb);
                break;
            case MonsterType.MonsterType_Two:
                block = instantiate(this.cubePrfb);
                break;
        }
        return block;
    }

    update(deltaTime: number) {
        this.initTime++;
    	//判断player和enemy节点距离，并且60帧才进行一次实时朝向的判断
    	let playerPos = this.player.worldPosition;
        let monster1 = this._monsterArr[0]
    	let thisPos = monster1.worldPosition;
    	let r = Math.atan2(playerPos.y - thisPos.y, playerPos.x - thisPos.x);
        	let degree = r * 180 / Math.PI;
        	degree = 360 - degree;
        	degree = degree - 90;
        	// monster1.angle = -degree;
        	this.initTime = 0;
            let x = monster1.getPosition().x + Math.cos(r) * this.speed.x;
            let y = monster1.getPosition().y + Math.sin(r) * this.speed.y;
            monster1.setPosition(new Vec3(x, y, 0));
    }

    
}

