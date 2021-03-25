import Config from "./Config";
import DataManager from "./DataManager";
import { EventManager } from "./EventManager";
import GameManager from "./GameManager";

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
    /**当前正在转换 */
    private isChange = false;

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
                                self.moveDown();
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

    /**初始化当前快--当前块为静止块 */
    initStaticCube(endPos: cc.Vec2) {
        let nodeWhite: cc.Node;
        for (let i = 0; i < this.node.childrenCount; i++) {
            let oneNode = this.node.getChildByName('Splash' + i);
            if (!nodeWhite) {
                oneNode && this.node.removeChild(oneNode);
            } else {
                nodeWhite = oneNode;
            }
        }
        nodeWhite.x = 0;
        nodeWhite.y = 0;
        nodeWhite.width = nodeWhite.height = Config.cubeSize;

        this.node.x = DataManager.instance.startPoint.x + endPos.x * Config.cubeSize;
        this.node.y = DataManager.instance.startPoint.y + endPos.y * Config.cubeSize;
    }

    /**初始化当前快--当前块为下落块 */
    init(index: number) {
        this.nowState = 0;
        this.index = index;
        this.node.x = DataManager.instance.startPoint.x;
        this.node.y = DataManager.instance.startPoint.y;

        this.speed = 1;
        this.allPos = [];

        this.updateCube(true);
    }

    /**
     * 设置会动的方块
     * @param init 当前的块第一次被生成
     */
    private updateCube(init = false) {
        let item = Config.instance.cubeArr[this.index].cudeType[this.nowState];
        if (init) {
            let endPosY: number = -5;
            for (let i = 0; i < item.length; i++) {
                const cubeData = item[i];
                if (endPosY < cubeData.y) {
                    endPosY = cubeData.y;
                }
            }
            this.centrePos = new cc.Vec2(0, endPosY);
        } else {
            if (this.isChange) return;
            this.isChange = true;
        }

        this.allPos.splice(0);
        if (this._dropTween) this._dropTween.stop();

        let oneNode: cc.Node;
        let changeCount = 0;
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
                    .call(() => {
                        changeCount++;
                        if (changeCount == item.length) this.isChange = false;
                    }, this)
                    .start();
            } else {
                oneNode.x = element.x * Config.cubeSize;
                oneNode.y = element.y * Config.cubeSize;
            }
            this.allPos.push(new cc.Vec2(this.centrePos.x + element.x, this.centrePos.y + element.y))
        }
        if (this._dropTween) this._dropTween.start()
    }

    /**改变形状 */
    change() {
        let cudeTypeArr = Config.instance.cubeArr[this.index].cudeType;
        this.nowState++;
        if (this.nowState > cudeTypeArr.length - 1) {
            this.nowState = 0;
        }
        this.updateCube();
        let differ = Config.instance.differLeftRight;

        if (this.getLeftX() < -differ) {
            this.node.x += Config.cubeSize;
            this.moveRight();
        } else if (this.getRightX() > differ) {
            this.node.x -= Config.cubeSize;
            this.moveLeft();
        }
    }

    move(left: boolean) {
        if (!this.canMoveLeftOrRight(left)) return;
        this._dropTween.stop();
        if (left) {
            cc.tween(this.node)
                .by(0, { x: -Config.cubeSize })
                .call(() => {
                    this._dropTween.start();
                    this.moveLeft();
                }, this)
                .start();
        } else {
            cc.tween(this.node)
                .by(0, { x: Config.cubeSize })
                .call(() => {
                    this._dropTween.start();
                    this.moveRight();
                }, this)
                .start();
        }
    }

    /**计算是否可以左右移动 */
    private canMoveLeftOrRight(left: boolean): boolean {
        let differ = Config.instance.differLeftRight;
        if (left) {
            let leftX = this.getLeftX();
            return (leftX-- > -differ);
        } else {
            let rightX = this.getRightX();
            return (rightX++ < differ);
        }
    }

    /**获取最右边的块的X */
    private getRightX() {
        let leftRightX: number = null;
        for (let i = 0; i < this.allPos.length; i++) {
            const pos = this.allPos[i];
            if (leftRightX == null || pos.x > leftRightX) leftRightX = pos.x;
        }
        return leftRightX;
    }
    /**获取最左边的块的X */
    private getLeftX(): number {
        let leftRightX: number = null;
        for (let i = 0; i < this.allPos.length; i++) {
            const pos = this.allPos[i];
            if (leftRightX == null || pos.x < leftRightX) leftRightX = pos.x;
        }
        return leftRightX;
    }

    /**安全落地(当前块停止了) */
    private fallToGround() {
        this.dropStatus = false;
        EventManager.ins.dispatchEvent(GameManager.Event_FallToGround, this.allPos);
    }

    private moveLeft() {
        for (let i = 0; i < this.allPos.length; i++) {
            this.allPos[i].x--;
        }
        this.centrePos.x--;
    }
    private moveRight() {
        for (let i = 0; i < this.allPos.length; i++) {
            this.allPos[i].x++;
        }
        this.centrePos.x++;
    }
    private moveDown() {
        for (let i = 0; i < this.allPos.length; i++) {
            const pos = this.allPos[i];
            pos.y--;
        }
        this.centrePos.y--;
        if (this.getBotton()[0].y == -(Config.cubeRow - 1)) {
            this.fallToGround();
        }
    }

    /**最下面快的相对于当前块的位置 */
    private getBotton() {
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