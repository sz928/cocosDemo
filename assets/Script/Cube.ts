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
        this.index = index;
        this.node.x = DataManager.instance.startPoint.x;
        this.node.y = DataManager.instance.startPoint.y;
        this.onBottom = [];
        this.speed = 1;
        this.pos = [];

        let item = Config.cudeType[index];
        let oneNode: cc.Node;
        for (let i = 0; i < item.length; i++) {
            const element = item[i];
            oneNode = this.node.getChildByName('Splash' + 0);
            if (!oneNode) {
                oneNode = new cc.Node();
                let sprite = oneNode.addComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame('default_sprite_splash');
                sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            }
        }

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