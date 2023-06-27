import { GameModel } from './GameModel';
import { _decorator, Component, Node, Vec2, UITransform, CCInteger, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node
    })
    private arrGround: Node[] = [];

    @property({
        type: GameModel
    })
    private gameModel: GameModel;

    protected start(): void {

    }

    update(deltaTime: number) {
        for (let i = 0; i < this.arrGround.length; i++) {
            const node = this.arrGround[i];
            const position = node.position.clone();
            position.x -= this.gameModel.SpeedGround * deltaTime; 

            if (position.x <= -740) {
                position.x = 1260;
            }
            node.setPosition(position);
        }
    }
}
