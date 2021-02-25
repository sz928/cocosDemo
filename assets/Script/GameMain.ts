import DataManager from "./DataManager";

const { ccclass, property } = cc._decorator;

@ccclass('游戏控制器')
export default class GameMain extends cc.Component {

    @property({ type: cc.Camera, tooltip: '世界相机' })
    camera_3d: cc.Camera = null;

    @property({ type: cc.Button, tooltip: '开始游戏按钮' })
    btn_startGame: cc.Button = null;

    @property({ type: cc.Canvas, tooltip: '游戏面板' })
    canvas: cc.Canvas = null;

    private menuScene: cc.Node;
    private gameScene: cc.Node;

    onLoad() {
        this.menuScene = this.canvas.node.getChildByName("Menu");
        this.gameScene = this.canvas.node.getChildByName("Game");
        this.gameScene.active = true;
        this.menuScene.active = false;

        DataManager.instance.init();
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

}