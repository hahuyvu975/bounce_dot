import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, director } from 'cc';
import { Constants } from './Constants';
const { ccclass, property } = _decorator;

@ccclass('Trigger')
export class Trigger extends Component {

    // protected start(): void {
    //     const collider = this.node.getComponent(Collider2D);
    //     if(collider) {
    //         collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    //     }
    // }

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        if(otherCollider.tag === 2) {
            // director.loadScene(Constants.EntryGame);
            director.pause();
            
        }
    }
}

