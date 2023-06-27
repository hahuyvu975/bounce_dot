import { _decorator, Component, Node, Collider2D, Contact2DType, PhysicsSystem2D, Vec3, Vec2, view, BoxCollider, BoxCollider2D, math, instantiate, find, Prefab, randomRange, randomRangeInt } from 'cc';
const { ccclass, property } = _decorator;
import { GameController } from './GameController';
@ccclass('Enemy')
export class Enemy extends Component {

    @property({ type: Prefab })
    private prbEnemy: Prefab;

    @property({ type: Node })
    private containerEnemy: Node;

    private tempEnemy: Vec3 = new Vec3();
    private speedEnemy: number = 300;

    private arrEnemy: Node[] = [];
    public get ArrEnemy(): Node[] {
        return this.arrEnemy;
    }
    public set ArrEnemy(value: Node[]) {
        this.arrEnemy = value;
    }


    protected onLoad(): void {
        this.initPrefab();
    }

    protected initPrefab(): void {
        for (let i = 0; i < 3; i++) {
            let tempNode = instantiate(this.prbEnemy);
            this.containerEnemy.addChild(tempNode);
            this.arrEnemy.push(tempNode);
        }
        this.setPosEnemy();
    }

    protected setPosEnemy(): void {
        const startX = 300;
        for (let i = 0; i < this.arrEnemy.length; i++) {
            const position: Vec3 = new Vec3(startX + 270 * i, -10, 0);
            this.arrEnemy[i].setPosition(position);
        }
    }

}

