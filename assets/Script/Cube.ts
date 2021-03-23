import Config from "./Config";
import DataManager from "./DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Cube extends cc.Component {
    // /**当前方块最下面的坐标 */
    // onBottom: CubeData[];
    /**哪个类型的方块 */
    index: number;
    speed: number = 1;

    /**中心块的坐标 */
    centrePos: cc.Vec2;
    /**所有块的坐标 相对于大场景 */
    allPos: cc.Vec2[] = [];
    /**当前第几个状态--用来转换身份 */
    private nowState: number;

    // 下落的缓动
    private _dropTween: cc.Tween;

    onLoad() {
    }

    start() {
    }


    public set dropStatus(v: boolean) {
        if (v) {
            if (!this._dropTween) {
                let self = this;
                this._dropTween = cc.tween(this.node)
                    .repeatForever(
                        cc.tween(this.node)
                            .delay(1)
                            .by(0, { y: -Config.cubeSize })
                            .call(() => {
                                for (let i = 0; i < self.allPos.length; i++) {
                                    const pos = self.allPos[i];
                                    pos.y--;
                                }
                                if (self.getBotton()[0].y == -(Config.cubeRow - 2)) {
                                    self.dropStatus = false;
                                }
                            })
                    )
                    .start();
            }
        } else {
            this._dropTween.stop();
            this._dropTween = null;
        }
    }
    /**获取当前快是否在下落 */
    public get dropStatus() {
        return this._dropTween ? true : false;
    }


    /**初始化当前快 */
    init(index: number) {
        this.nowState = 0;
        this.index = index;
        this.node.x = DataManager.instance.startPoint.x;
        this.node.y = DataManager.instance.startPoint.y;

        this.speed = 1;
        this.allPos = [];

        this.setCube(true);
    }

    /**
     * 设置方块
     * @param init 当前的块第一次被生成
     */
    private setCube(init = false) {
        let item: CubeData[]
        if (this.index > -1) {
            item = Config.instance.cubeArr[this.index].cudeType[this.nowState];
        } else {
            item = [new CubeData(0, 0)];
            let oneNode: cc.Node;
            for (let i = 1; i < 3; i++) {
                oneNode = this.node.getChildByName('Splash' + i);
                oneNode && this.node.removeChild(oneNode);
            }
        }
        this.allPos.splice(0);

        if (init) {
            let endPosY: number = -5;
            for (let i = 0; i < item.length; i++) {
                const cubeData = item[i];
                if (endPosY < cubeData.y) {
                    endPosY = cubeData.y;
                }
            }
            this.centrePos = new cc.Vec2(0, endPosY);
        }

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
                this.allPos.push(new cc.Vec2(this.centrePos.x + element.x, this.centrePos.y + element.y))
            }
        }
    }

    /**改变形状 */
    change() {
        let cudeTypeArr = Config.instance.cubeArr[this.index].cudeType;
        this.nowState++;
        if (this.nowState > cudeTypeArr.length - 1) {
            this.nowState = 0;
        }
        this.setCube();
        for (const iterator of cudeTypeArr[this.nowState]) {

        }
    }

    move(left: boolean) {
        this._dropTween.stop();
        if (!this.canMoveLeftOrRight(left)) return;
        if (left) {
            cc.tween(this.node)
                .to(0, { x: this.node.x - Config.cubeSize })
                .call(() => {
                    this._dropTween.start();
                }, this)
                .start();
        } else {
            cc.tween(this.node)
                .to(0, { x: this.node.x + Config.cubeSize })
                .call(() => {
                    this._dropTween.start();
                }, this)
                .start();
        }
    }

    /**计算是否可以左右移动 */
    private canMoveLeftOrRight(left: boolean): boolean {
        // TODO 左右移动的判断
        if (left) {

        } else {

        }
        return;
    }

    // update() {
    //     if (0) {
    //         this.node.y -= Config.cubeSize;
    //     } else {
    //         DataManager.instance.isHasCube.push()
    //     }

    // }

    /**最下面快的相对于当前快的位置 */
    getBotton() {
        let arr: cc.Vec2[] = [];
        let bottomY = 0;
        for (const iterator of this.allPos) {
            if (iterator.y < bottomY) {
                bottomY = iterator.y;
            }
        }
        for (let i = 0; i < this.allPos.length; i++) {
            const element = this.allPos[i];
            if (element.y == bottomY) {
                arr.push(element)
            }
        }
        return arr;
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