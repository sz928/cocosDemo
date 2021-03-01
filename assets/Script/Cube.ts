import Config from "./Config";
import DataManager from "./DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Cube extends cc.Component {
    /**当前方块最下面的坐标 */
    onBottom: cc.Vec2[];
    /**哪个类型的方块 */
    index: number;
    speed: number = 1;
    pos: cc.Vec2[] = [];
    /**当前第几个状态--用来转换身份 */
    private nowState: number;

    onLoad() {
    }

    /**初始化当前快 */
    init(index: number) {
        this.nowState = 0;
        this.index = index;
        this.node.x = DataManager.instance.startPoint.x;
        this.node.y = DataManager.instance.startPoint.y;

        this.onBottom = [];
        this.speed = 1;
        this.pos = [];

        this.setCube(true);
    }

    /**
     * 设置方块
     */
    private setCube(init = false) {
        let item = Config.instance.cubeArr[this.index].cudeType[this.nowState];
        let oneNode: cc.Node;
        for (let i = 0; i < item.length; i++) {
            const element = item[i];
            oneNode = this.node.getChildByName('Splash' + i);
            if (!oneNode) {
                oneNode = new cc.Node();
                let sprite = oneNode.addComponent(cc.Sprite);
                sprite.spriteFrame = new cc.SpriteFrame('default_sprite_splash');
                sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                this.node.addChild(oneNode);
            }
            oneNode.width = oneNode.height = Config.cubeSize;
            if (!init) {
                cc.tween(oneNode)
                    .to(0.3, { x: element.x * Config.cubeSize, y: element.y * Config.cubeSize })
                    .start();
            } else {
                oneNode.x = element.x * Config.cubeSize;
                oneNode.y = element.y * Config.cubeSize;
            }
        }
    }

    start() {
        cc.tween(this.node)
            .repeatForever(
                cc.tween(this.node)
                    .delay(1)
                    .by(0.5, { y: -Config.cubeSize })
            )
            .start();
    }

    /**改变形状 */
    change() {
        let cudeTypeArr = Config.instance.cubeArr[this.index].cudeType;
        this.nowState++;
        if (this.nowState > cudeTypeArr.length - 1) {
            this.nowState = 0;
        }
        this.setCube();
        console.log('发生改变', this.index, this.nowState);

    }

    move() {
        cc.tween(this.node)
            .delay(1)
            .by(0.5, { y: -Config.cubeSize })
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
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}