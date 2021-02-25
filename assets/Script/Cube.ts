import Config from "./Config";
import DataManager from "./DataManager";

const { ccclass, property } = cc._decorator;
@ccclass()
export class Cube extends cc.Component {
    /**当前方块最下面的坐标 */
    onBottom: cc.Vec2[];
    index: number;
    speed: number = 1;
    pos: cc.Vec2[] = [];

    onLoad() {
        // cc.assetManager.preloadAny()
        //TODO 加载预制体
    }

    init(index: number, start: { x: number, y: number }) {
        this.index = index;
        this.node.y = -200;
        this.onBottom = [];
        this.speed = 1;
        this.pos = [];

        let item = Config.cudeType[index];
        var scene = cc.director.getScene();
        var node = cc.instantiate(cc.Prefab.);
        node.parent = scene;

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