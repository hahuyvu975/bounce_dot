
import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, Prefab, input, RigidBody2D, Vec2, Input, instantiate, math, Vec3, BoxCollider2D, randomRange, randomRangeInt, absMax, AudioClip, director, find } from 'cc';
const { ccclass, property } = _decorator;

import { Bunny } from './Bunny';
import { Enemy } from './Enemy';
import { ScoreGame } from './ScoreGame';
import { GameParamater } from './GameParamater';
import { Constants } from './Constants';
import { GameModel } from './GameModel';

@ccclass('GameController')
export class GameController extends Component {

    @property({
        type: Node
    })
    private reward: Node;

    @property({
        type: ScoreGame
    })
    private score: ScoreGame;

    @property({
        type: Node
    })
    private scoreNode: Node;

    @property({
        type: Node
    })
    private noel: Node;

    @property({
        type: Bunny
    })
    private bunny: Bunny;

    @property({ 
        type: Enemy 
    })
    private enemyController: Enemy;

    @property({ 
        type: GameModel 
    })
    private gameModel: GameModel ;

    @property({
        type: Node
    })
    private btnResume: Node;

    @property({
        type: Node
    })
    private btnPause: Node;

    private tempEnemy: Vec3 = new Vec3();
    private tempNoel: Vec3 = new Vec3();

    public static arrEnemy: Node[] = [];

    private isGamePaused: boolean = false;

    protected onLoad(): void {
        this.initialListener();
    }

    protected start(): void {
        
    }

    protected initialListener(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    protected onTouchStart(): void {
        const rigid = this.bunny.getComponent(RigidBody2D);
        rigid.applyForceToCenter(new Vec2(0, -10).multiplyScalar(100), true);
        this.bunny.IsMoveDown = false;
    }

    protected overGame(): void {
        let node = find('GameParamater')
        if(node === null) {
            let node = new Node('GameParamater');
            let param = node.addComponent(GameParamater);
            param.IndexScore = this.score.CurrentScore;
            director.addPersistRootNode(node);
            director.loadScene(Constants.EntryGame)
        }
    }

    protected controlGame(): void {
        if(this.isGamePaused) {
            director.resume();
            this.isGamePaused = false;
            this.btnResume.active = false;
            this.btnPause.active = true;    
        }else {
            this.btnResume.active = true;
            this.btnPause.active = false;
            director.pause();
            this.isGamePaused = true;
        }
    }

    protected randomCloud(): void {
        const numNoelY = randomRangeInt(250, 320);
        const numNoelX = randomRangeInt(600, 1000);
        this.noel.setPosition(numNoelX, numNoelY);
    }

    protected randomEnemyAndReward(): void {
        this.reward.active = true;
        const positionA: Vec3 = new Vec3(280, -10, 0);
        const positionC: Vec3 = new Vec3(800, -10, 0);
        this.enemyController.ArrEnemy[0].setPosition(positionA);
        this.enemyController.ArrEnemy[2].setPosition(positionC);

        const randomX = math.randomRange(positionA.x + 100, positionC.x - 100);
        const positionB: Vec3 = new Vec3(randomX, -10, 0);
        this.enemyController.ArrEnemy[1].setPosition(positionB);

        const spacingAB = positionB.x - positionA.x
        const spacingBC = positionC.x - positionB.x;
        const maxSpacing = Math.max(spacingAB, spacingBC)
        const indexCenter = maxSpacing / 2;
        if (maxSpacing >= 200) {
            if (maxSpacing === spacingAB) {
                const rewardAB = positionB.x - indexCenter;
                this.reward.setPosition(rewardAB, -35, 0);
                this.reward.getComponent(Collider2D).apply();
            } else {
                const rewardBC = positionC.x - indexCenter;;
                this.reward.setPosition(rewardBC, -35, 0);
                this.reward.getComponent(Collider2D).apply();
            }
        } else {
            console.log('Not found!!')
        }

    }

    protected update(dt: number): void {
        // Enemy and reward
        for (let i = 0; i < this.enemyController.ArrEnemy.length; i++) {
            let element = this.enemyController.ArrEnemy[i];
            this.tempEnemy = element.position;
            this.tempEnemy.x -= this.gameModel.SpeedEnemy * dt;
    
            if (this.tempEnemy.x < -800) {   
               this.randomEnemyAndReward();
            }
            element.getComponent(Collider2D).apply();
            element.setPosition(this.tempEnemy.x, -10);
        }

        // Enemy fly
        this.tempNoel = this.noel.position;
        this.tempNoel.x -= this.gameModel.SpeedEnemy * dt;
        if (this.tempNoel.x < -520) {
            this.randomCloud();
        }
        this.noel.getComponent(Collider2D).apply();
        this.noel.setPosition(this.tempNoel);

        // Score game
        if (this.bunny.ContactReward) {
            this.score.addScore();
            this.bunny.ContactReward = false;
            this.reward.active = false;
        
            let speed = 320;
        
            if (this.score.CurrentScore >= 30 && this.score.CurrentScore < 50) {
                speed = 320;
            } else if (this.score.CurrentScore >= 50 && this.score.CurrentScore < 100) {
                speed = 340;
            } else if (this.score.CurrentScore >= 100) {
                speed = 360;
            }
        
            this.gameModel.SpeedEnemy = speed;
            this.gameModel.SpeedReward = speed;
            this.gameModel.SpeedGround = speed;
        
            if (this.score.CurrentScore === 100) {
                this.scoreNode.setPosition(-190, 325);
            }
        }

        // Over game
        if(this.bunny.ContactEnemy === true) {  
                this.overGame(); 
        }
    }
}

