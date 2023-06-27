import { _decorator, Component, Node, CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({
        type: CCFloat
    })
    private speedEnemy: number = 300;
    public get SpeedEnemy(): number {
        return this.speedEnemy;
    }
    public set SpeedEnemy(value: number) {
        this.speedEnemy = value;
    }

    @property({
        type: CCFloat
    })
    private speedReward: number = 300;
    public get SpeedReward(): number {
        return this.speedReward;
    }
    public set SpeedReward(value: number) {
        this.speedReward = value;
    }

    @property({
        type: CCFloat
    })
    private speedGround: number = 300;
    public get SpeedGround(): number {
        return this.speedGround;
    }
    public set SpeedGround(value: number) {
        this.speedGround = value;
    }
}

