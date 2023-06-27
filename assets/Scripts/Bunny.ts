import { AudioGame } from './AudioGame';
import { _decorator, Component, Node, RigidBody2D, Collider2D, Contact2DType, IPhysics2DContact, input, Input, EventTarget, Vec2, Vec3, director, Animation, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bunny')
export class Bunny extends Component {

    @property({
        type: AudioGame
    })
    private audioGame: AudioGame;

    private isMoveDown: boolean = false;
    public get IsMoveDown(): boolean {
        return this.isMoveDown;
    }
    public set IsMoveDown(value: boolean) {
        this.isMoveDown = value;
    }
    private newPosition: Vec3 = new Vec3();
    private tempVelocity: Vec2 = new Vec2();

    private contactReward: boolean = false;
    public get ContactReward(): boolean {
        return this.contactReward;
    }
    public set ContactReward(value: boolean) {
        this.contactReward = value;
    }

    private contactEnemy: boolean = false;
    public get ContactEnemy(): boolean {
        return this.contactEnemy;
    }
    public set ContactEnemy(value: boolean) {
        this.contactEnemy = value;
    }

    protected start(): void {
        const collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    protected onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact ): void {
        if (otherCollider.tag === 2) {
            if(localStorage.getItem('volume') === '1') {
                this.onAudioQueue(1);
            }
            
            this.isMoveDown = true;
        } 

        if(otherCollider.tag === 3) {
            if(localStorage.getItem('volume') === '1') {
                this.onAudioQueue(2);
            }
            this.contactEnemy = true;
        }
        if (otherCollider.tag === 4) {
            if(localStorage.getItem('volume') === '1') {
                this.onAudioQueue(0);
            }
            this.contactReward = true;
            // otherCollider.node.active = false;  
        }
    }

    protected update(dt: number): void {
        if (this.isMoveDown) {
            var anim = this.node.getComponent(Animation);
            anim.play();
            this.newPosition = this.node.position;
            this.newPosition.y += 450 *dt;
            this.node.setPosition(this.newPosition);
        }
    }

    protected onAudioQueue(index: number): void {
        let clip: AudioClip = this.audioGame.Clips[index];
        this.audioGame.AudioSource.playOneShot(clip);
    }
}

