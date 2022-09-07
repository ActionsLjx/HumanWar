import { _decorator, Component, Node, Vec3 } from 'cc';
import { JoystickControll } from './JoystickControll';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property({type: JoystickControll})
    public joyStick: JoystickControll | null = null;

    @property({type:Node})
    public role:Node | null = null;

    //速度
    speed: Vec3 = new Vec3(6, 6, 0);

    onLoad(){
        
    }

    start() {

    }

    update(deltaTime: number) {
        if (this.joyStick.moving) {
            //根据角度移动
            let x = this.role.getPosition().x + Math.cos(this.joyStick.angle) * this.speed.x;
            let y = this.role.getPosition().y + Math.sin(this.joyStick.angle) * this.speed.y;
            //根据向量移动
            // let x = this.role.getPosition().x+this.joyStick.dir.x*this.speed.x;
            // let y = this.role.getPosition().y+this.joyStick.dir.y*this.speed.y;
 
            this.role.setPosition(new Vec3(x, y, 0));

        }
    }
}

