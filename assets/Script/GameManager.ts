import Config from "./Config";
import Cube from "./Cube";
import DataManager from "./DataManager";

const { ccclass, property } = cc._decorator;

@ccclass('游戏控制器')
export default class GameManager extends cc.Component {

    @property({ type: cc.Camera, tooltip: '世界相机' })
    camera_3d: cc.Camera = null;

    @property({ type: cc.Canvas, tooltip: '游戏面板' })
    canvas: cc.Canvas = null;

    @property({ type: cc.Prefab, tooltip: '下落的方块' })
    cubeGroup: cc.Prefab;

    private menuScene: cc.Node;
    private gameScene: cc.Node;

    onLoad() {
        this.menuScene = this.canvas.node.getChildByName("Menu");
        this.gameScene = this.canvas.node.getChildByName("Game");
        this.gameScene.active = true;
        this.menuScene.active = false;

        DataManager.instance.init();

        this.iniBg();
    }

    start() {
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
        drawNode.y = 150;
    }

    /**创建一个下落的方块 */
    private createCube() {
        let index = Math.floor(Math.random() * 5);
        let cubeGroup = cc.instantiate(this.cubeGroup);
        this.gameScene.addChild(cubeGroup);
        let script = cubeGroup.getComponent(Cube.name) as Cube;
        console.log(script);

        // script.init(index);
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
            .start()
    }

    onBtnLeft() {

    }
    onBtnRight() {

    }
    onChange() {

    }

}