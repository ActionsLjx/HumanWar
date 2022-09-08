import { _decorator, Component, Node, Vec3, Animation, AnimationState } from 'cc';
import { JoystickControll } from './JoystickControll';
import { Monster } from './Monster';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property({type: JoystickControll})
    public joyStick: JoystickControll | null = null;

    @property({type:Node})
    public role:Node | null = null;

    @property({type:Monster})
    public monsterCrl: Monster | null = null;

    @property({type: Animation})
    public BodyAnim: Animation | null = null;

    private _isAttack:boolean = false;
    //速度
    speed: Vec3 = new Vec3(3, 3, 0);
    onLoad(){
    
    }

    start() {

    }

    update(deltaTime: number) {
        var arr =  this.monsterCrl.monsterArr;
        var rolPos = this.role.getWorldPosition();
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            let monsPos = element.getWorldPosition();
            let x  = rolPos.x - monsPos.x;
            let y = rolPos.y - monsPos.y;
            let dis = Math.log2(x*x + y*y);
            if(Math.abs(dis)<6){
                if(!this._isAttack){
                    this.BodyAnim.play('attack1_hero1');
                    this._isAttack = true;
                }
                return;
            }
        }
        this._isAttack = false;
        if (this.joyStick.moving) {
            if(!this.BodyAnim.getState('run_hero1').isPlaying){
                this.BodyAnim.play('run_hero1');
            }
            //根据角度移动
            let x = this.role.getPosition().x + Math.cos(this.joyStick.angle) * this.speed.x;
            let y = this.role.getPosition().y + Math.sin(this.joyStick.angle) * this.speed.y;
            //根据向量移动
            // let x = this.role.getPosition().x+this.joyStick.dir.x*this.speed.x;
            // let y = this.role.getPosition().y+this.joyStick.dir.y*this.speed.y;
            let scale = this.joyStick.dir.x>0 ? new Vec3(1,1,0): new Vec3(-1,1,0);
            this.role.setScale(scale)
            this.role.setPosition(new Vec3(x, y, 0));  

        }else{
            if(!this.BodyAnim.getState('wait_hero1').isPlaying){
                this.BodyAnim.play('wait_hero1');
            }
        }
    }
}

