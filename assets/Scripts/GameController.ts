import { Circle } from './Circle';
import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    // @property({
    //     type: Node
    // })
    // private circle: Node;

    // @property({
    //     type: Node
    // })
    // private groundNode: Node;

    protected onLoad(): void {
       
    }
    protected start(): void {
    }

}

