import { _decorator, Component, Node, Vec3,Touch, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('JoystickControll')
export class JoystickControll extends Component {

    @property(Node)
    panel: Node = null;
    //小圆
    @property(Node)
    btn: Node = null;

 //小圆在大圆中移动的限制距离
    private panelWidth: number = 30;
    //大圆初始位置
    private panelInitPos: Vec3;
 
    //触摸ID
    private touchID: number;
 
    //用于保存移动方向向量
    public dir: Vec3 = new Vec3(0, 0, 0);
    //保存弧度(角度)
    public angle: number = 0;
 
    //是否正在移动
    public moving: boolean = false;

    onLoad() {
        this.panelInitPos = this.panel.getPosition();
    }

    start() {
        this.btn.on(Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.btn.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.btn.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.btn.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onDestroy() {
        console.log("onDestroy");
        this.btn.off(Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.btn.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.btn.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.btn.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    onTouchStart(event) {
        this.moving = false;
        this.enabled = true;
    }

    onTouchMove(event) {
        var touches = event.getTouches();
        let touch:Touch = touches[0];
        
        console.log("onTouchMove:"+touch.getStartLocation());

        let posDelta = touch.getDelta();
        var x = this.btn.getPosition().x + posDelta.x;
        let y = this.btn.getPosition().y + posDelta.y;
        //正在移动
        this.btn.setPosition(new Vec3(x, y, 0));
        this.moving = true;
    }

    onTouchEnd(event) {
        this.panel.setPosition(this.panelInitPos);
        this.btn.setPosition(new Vec3(0, 0, 0));
        this.moving = false;
        this.enabled = false;

    }

    onTouchCancel(event) {
        this.panel.setPosition(this.panelInitPos);
        this.btn.setPosition(new Vec3(0, 0, 0));
        this.moving = false;
        this.enabled = false;

    }

    update(deltaTime: number) {
        if (this.moving) {
            //将小圆限制大圆范围内
            let ratio = this.btn.position.length() / this.panelWidth;
            let xbi = this.btn.position.x / this.btn.position.length();
            let ybi = this.btn.position.y / this.btn.position.length();
            if (ratio > 1) {
 
                this.btn.setPosition(new Vec3(xbi * this.panelWidth, ybi * this.panelWidth, 0));
            }
            //保存向量方向
            this.dir = new Vec3(xbi, ybi, 0);
            console.log("this.dir", this.dir);
            //获取弧度
            this.angle = Math.atan2(this.btn.getPosition().y, this.btn.getPosition().x);
        }
    }
}

