import { Constants } from './Constants';
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EntryController')
export class EntryController extends Component {
    @property({
        type: Node
    })
    private btnPlay: Node;

    @property({
        type: Node
    })
    private btnTurnOn: Node;

    @property({
        type: Node
    })
    private btnTurnOff: Node;

    private isTurnOffSound: boolean = false;

    protected onPlayGame(): void {
        director.loadScene(Constants.GameGame);
    }

    protected onClickSound(): void {
        if(this.isTurnOffSound) {
            this.isTurnOffSound = false;
            this.btnTurnOn.active = true;
            this.btnTurnOff.active = false;
           
        }else {
            this.isTurnOffSound = true;
            this.btnTurnOn.active = false;
            this.btnTurnOff.active = true;    
        }
    }

}

