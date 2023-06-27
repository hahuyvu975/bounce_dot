import { _decorator, Component, Node, Vec3, Collider2D } from 'cc';
import { GameModel } from './GameModel';
const { ccclass, property } = _decorator;

@ccclass('Reward')
export class Reward extends Component {

    @property({ 
        type: GameModel 
    })
    private gameModel: GameModel ;
    private tempReward: Vec3 = new Vec3();
    
    update(deltaTime: number) {
        this.tempReward = this.node.position;
        this.tempReward.x -= this.gameModel.SpeedReward *deltaTime;
        this.node.getComponent(Collider2D).apply();
        this.node.setPosition(this.tempReward.x, -35);
    }
}

