import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property({
        type: Node
    })
    private arrGround: Node[] = [];

    @property({
        type: Number
    })
    private speed: number = 100;

    protected start(): void {
        // Lấy vị trí ban đầu của các node
        for (let node of this.arrGround) {
            node["_initialPosition"] = node.position.clone(); // Lưu lại vị trí ban đầu
        }
    }

    // update(deltaTime: number) {
    //     for (let node of this.arrGround) {
    //         const position = node.position;
    //         position.x -= this.speed * deltaTime; // Di chuyển sang trái dựa trên tốc độ và thời gian
    //         if (position.x <= -100) {
    //             // Nếu vị trí vượt quá ranh giới bên trái, đặt lại vị trí node về ban đầu
    //             position.copy(node["_initialPosition"]);
    //         }
    //         node.position = position;
    //     }
    // }
}
