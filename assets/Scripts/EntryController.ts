import { AudioEntry } from './AudioEntry';
import { Constants } from './Constants';
import { _decorator, Component, Node, director, find, Label, AudioClip } from 'cc';
import { GameParamater } from './GameParamater';
const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {
    @property({
        type: Node
    })
    private btnPlay: Node;

    @property({
        type: AudioEntry
    })
    private audioEntry: AudioEntry;

    @property({
        type: Node
    })
    private btnTurnOn: Node;

    @property({
        type: Node
    })
    private btnTurnOff: Node;

    @property({
        type: Label
    })
    private labelScore: Label;

    @property({
        type: Label
    })
    private labelBest: Label;

    private isTurnSound: boolean = false;

    private currentScore: number ;

    protected onLoad(): void {
        if(!localStorage.getItem('volume')) {
            localStorage.setItem('volume', '1');
        }
        if(localStorage.getItem('volume') === '1') {
            this.btnTurnOn.active = true;
            this.btnTurnOff.active = false;
        }else {
            this.btnTurnOn.active = false;
            this.btnTurnOff.active = true;
        }

        let node = find(Constants.GameParamater)
        if(node) {
            this.currentScore = node.getComponent(GameParamater).IndexScore;
            node.destroy();
        } else {
            this.currentScore = 0;
        }
    }

    protected start(): void {
        this.showResultBest();
        this.showResultScore();
        
    }

    protected showResultScore(): void {
        this.labelScore.string = `${this.currentScore}`
    }

    protected showResultBest(): void {
        const tempBestScore = localStorage.getItem('bestScore');
        if(tempBestScore === null) {
            this.labelBest.string = `0`
        } else {
            this.labelBest.string = `${tempBestScore}`
        }
    }

    protected onPlayGame(): void {
        if (localStorage.getItem('volume') === '1') {
            this.onAudioQueue(0);
        }
        director.loadScene(Constants.GameGame);
    }

    protected onResetGame(): void {
        if (localStorage.getItem('volume') === '1') {
            this.onAudioQueue(0);
        }
        localStorage.setItem('bestScore', '0');
        this.labelBest.string = '0';
        this.labelScore.string = '0';
    }

    protected onClickSound(): void {
        if(this.isTurnSound) {
            localStorage.setItem('volume', '1');
            console.log('1')
            this.isTurnSound = false;
            this.btnTurnOn.active = true;
            this.btnTurnOff.active = false;
           
        }else {
            if (localStorage.getItem('volume') === '1') {
                this.onAudioQueue(0);
            }
            localStorage.setItem('volume', '0');
            this.isTurnSound = true;
            this.btnTurnOn.active = false;
            this.btnTurnOff.active = true;    
        }
        
    }
    protected onAudioQueue(index: number): void {
        let clip: AudioClip = this.audioEntry.Clips[index];
        this.audioEntry.AudioSource.playOneShot(clip);
    }
    
}

