import { _decorator, Component, Node, RigidBody2D, Collider2D, Contact2DType, IPhysics2DContact, input, Input, EventTarget, Vec2, Vec3, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Circle')
export class Circle extends Component {

    private isMoveDown: boolean = false;
    private newPosition: Vec3 = new Vec3();
    private tempVelocity: Vec2 = new Vec2();
    private rigid: RigidBody2D | null = null;

    protected onLoad(): void {
        this.initialListener();
    }
    protected start(): void {
        this.rigid = this.node.getComponent(RigidBody2D);

        const collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null): void {
        if (otherCollider.tag === 3) {
            this.isMoveDown = true;
        } 
        
        if(otherCollider.tag === 1) {
            director.pause();
        }
    }

    protected initialListener(): void {
        input.on(Input.EventType.MOUSE_DOWN, this.onTouchStart, this);
    }

    protected onTouchStart(): void {
        this.rigid.applyForceToCenter(new Vec2(0,-10).multiplyScalar(100), true)
        this.isMoveDown = false;
        
    }

    protected update(dt: number): void {
        if (this.isMoveDown) {
            this.newPosition = this.node.position;
            this.node.setPosition(this.newPosition.x, this.newPosition.y + 460 * dt);
        }
    }
}

