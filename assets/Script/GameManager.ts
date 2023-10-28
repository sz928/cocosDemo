import Config from "./Config";
import Cube from "./Cube";
import DataManager from "./DataManager";
import { EventManager } from "./EventManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property({ type: cc.Camera, tooltip: '世界相机' })
    camera_3d: cc.Camera = null;

    @property({ type: cc.Canvas, tooltip: '游戏面板' })
    canvas: cc.Canvas = null;

    @property({ type: cc.Prefab, tooltip: '下落的方块' })
    cubeGroupPrefab: cc.Prefab;

    @property({ type: cc.Node, tooltip: '固定的方块' })
    cubeMap: cc.Node;

    private menuScene: cc.Node;
    private gameScene: cc.Node;

    private cubeScript: Cube;

    static readonly Event_FallToGround = 'Event_FallToGround';

    onLoad() {
        EventManager.ins.on(GameManager.Event_FallToGround, this.fallToGround, this);

        this.menuScene = this.canvas.node.getChildByName("Menu");
        this.gameScene = this.canvas.node.getChildByName("Game");
        this.gameScene.active = false;
        this.menuScene.active = true;
        this.iniBg();
    }

    private newGame() {
        Config.instance.init();
        DataManager.instance.init();
        this.cubeScript = null;
        this.createCube();
    }

    /**初始化网格背景 */
    private iniBg() {
        if (!this.gameScene) return;
        let drawNode = this.gameScene.getChildByName('backgroud');
        let draw = drawNode.getComponent(cc.Graphics);
        draw.strokeColor = cc.Color.WHITE;

        let maxW = Config.cubeSize * (Config.cubeLine - 1);
        let maxH = Config.cubeSize * (Config.cubeRow - 1);
        for (let i = 0; i < Config.cubeLine; i++) {
            let startX = i * Config.cubeSize - maxW / 2;
            draw.moveTo(startX, -maxH / 2);
            draw.lineTo(startX, maxH / 2);
            draw.stroke();
        }

        for (let i = 0; i < Config.cubeRow; i++) {
            let startY = i * Config.cubeSize - maxH / 2;
            draw.moveTo(-maxW / 2, startY);
            draw.lineTo(maxW / 2, startY);
            draw.stroke();
        }
        drawNode.y = DataManager.instance.allMove;
    }

    /**创建一个下落的方块 */
    private createCube() {
        let index = Math.floor(Math.random() * 5);
        if (!this.cubeScript) {
            let cubeGroup = cc.instantiate(this.cubeGroupPrefab);
            this.cubeMap.addChild(cubeGroup);
            this.cubeScript = cubeGroup.getComponent(Cube);
        }

        this.cubeScript.init(index);
        this.cubeScript.dropStatus = true;
    }

    /**点击开始按钮 */
    private onStartGame() {
        cc.tween(this.canvas.node)
            .to(0.6, { scale: 0.8, opacity: 0.4 })
            .call(() => {
                this.menuScene.active = false;
                this.gameScene.active = true;
            })
            .to(0.6, { scale: this.canvas.node.scale, opacity: this.canvas.node.opacity })
            .call(() => {
                this.newGame();
            }, this)
            .start()
    }

    onBtnLeft() {
        this.cubeScript.move(true);
    }
    onBtnRight() {
        this.cubeScript.move(false);
    }
    onChange() {
        this.cubeScript.change();
    }

    /**当有方块已经落地 */
    private fallToGround(allPos: cc.Vec2[]) {
        let arr = DataManager.instance.isHasCube;
        DataManager.instance.isHasCube = arr.concat(allPos);

        for (let i = 0; i < allPos.length; i++) {
            const pos = allPos[i];
            let cubeGroup = cc.instantiate(this.cubeGroupPrefab);
            cubeGroup.name = "fixedCub" + pos.x + "" + pos.y;
            this.cubeMap.addChild(cubeGroup);
            let cube = cubeGroup.getComponent(Cube);
            cube.initStaticCube(pos);
        }

        let mapY: Map<number, number[]> = new Map();
        for (const pos of DataManager.instance.isHasCube) {
            let data = mapY.get(pos.y);
            data ? data.push(pos.x) : mapY.set(pos.y, [pos.x]);
        }
        if (mapY.has(1)) {
            this.cubeMap.removeAllChildren();
            this.menuScene.active = true;
            this.gameScene.active = false;
            return;
        }

        for (const [posY, value] of mapY) {
            if (value.length >= Config.cubeLine - 1) {
                for (let i = 0; i < value.length; i++) {
                    const element = value[i];

                    let delNodes: cc.Node[] = [];
                    let moveNodes: cc.Node[] = [];
                    for (const item of this.cubeMap.children) {
                        if (item.name.indexOf('fixedCub') == -1) continue;
                        let cube = item.getComponent(Cube);

                        if (cube.centrePos.y == posY && cube.centrePos.x == element) {
                            delNodes.push(item);
                        } else if (cube.centrePos.x == element && cube.centrePos.y > posY) {
                            moveNodes.push(item);
                        }
                    }

                    for (let i = 0; i < DataManager.instance.isHasCube.length; i++) {
                        const cubeData = DataManager.instance.isHasCube[i];
                        if (element == cubeData.x && posY == cubeData.y) {
                            DataManager.instance.isHasCube.splice(i, 1);
                            i--;
                        } else if (element == cubeData.x && posY < cubeData.y) {
                            cubeData.y--;
                            DataManager.instance.isHasCube[i] = cubeData;
                        }
                    }

                    for (const delNode of delNodes) {
                        this.cubeMap.removeChild(delNode);
                    }
                    for (const moveNode of moveNodes) {
                        let cube = moveNode.getComponent(Cube);
                        cube.centrePos.y--;
                        moveNode.y -= Config.cubeSize;
                    }
                }
            }
        }


        this.createCube();
    }

}