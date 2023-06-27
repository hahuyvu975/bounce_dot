import { _decorator, CCFloat, Component, Sprite, v3 } from 'cc';
const { ccclass, property, requireComponent } = _decorator;

@ccclass('Background')
@requireComponent(Sprite)
export class Background extends Component {

    @property({type: CCFloat})
    private speed : number = 50.0;

    private bgStartPositionX : number;
    private bgOffsetX : number = 0.0;

    private spriteWidth : number;

    protected onLoad(): void {
        this.spriteWidth = this.node.getComponent(Sprite).spriteFrame.width;
    }

    protected start(): void {
        this.bgStartPositionX = this.node.position.x;
    }

    protected update(dt: number): void {
        // this.bgOffsetX += this.speed*dt;
        // let offset : number = 0.0;
        // if (this.bgOffsetX > this.spriteWidth){
        //     offset = this.bgOffsetX - this.spriteWidth;
        //     this.bgOffsetX = 0.0;
        // }
        // this.node.position = v3(this.bgStartPositionX - this.bgOffsetX - offset, this.node.position.y, this.node.position.z);
    }
}


