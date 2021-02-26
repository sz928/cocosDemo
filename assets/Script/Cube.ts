import Config from "./Config";
import DataManager from "./DataManager";

const { ccclass, property } = cc._decorator;

@ccclass('下落方块组')
export default class Cube extends cc.Component {
    /**当前方块最下面的坐标 */
    onBottom: cc.Vec2[];
    index: number;
    speed: number = 1;
    pos: cc.Vec2[] = [];

    onLoad() {
    }

    init(index: number) {
        // this.index = index;
        // this.node.y = -200;
        // this.onBottom = [];
        // this.speed = 1;
        // this.pos = [];

        let item = Config.cudeType[index];

    }

    /**改变形状 */
    change() {
        switch (this.index) {
            case 0:
                break;
        }
    }

    update() {
        if (0) {

            this.node.y -= Config.cubeSize;
        } else {

            DataManager.instance.isHasCube.push()
        }

    }
}

export class CubeData {
    pos: { x: number, y: number }
    constructor(data: { x: number, y: number }) {
        this.pos = data;
    }
}