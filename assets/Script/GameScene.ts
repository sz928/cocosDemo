import Config from "./Config";

const { ccclass, property } = cc._decorator;
@ccclass('游戏场景')
export default class GameScene extends cc.Component {

    private drawNode: cc.Node;
    private draw: cc.Graphics;

    onLoad() {
        this.drawNode = this.node.getChildByName('backgroud');
        this.draw = this.drawNode.getComponent(cc.Graphics);
    }

    start() {
        this.draw.strokeColor = cc.Color.WHITE;

        let maxW = Config.cubeSize * (Config.cubeLine - 1);
        let maxH = Config.cubeSize * (Config.cubeRow - 1);
        for (let i = 0; i < Config.cubeLine; i++) {
            let startX = i * Config.cubeSize - maxW / 2;
            this.draw.moveTo(startX, -maxH / 2);
            this.draw.lineTo(startX, maxH / 2);
            this.draw.stroke();
        }

        for (let i = 0; i < Config.cubeRow; i++) {
            let startY = i * Config.cubeSize - maxH / 2;
            this.draw.moveTo(-maxW / 2, startY);
            this.draw.lineTo(maxW / 2, startY);
            this.draw.stroke();
        }

        this.drawNode.y = 150;
    }

    /**创建一个下落的方块 */
    private createCube() {
        let index = Math.floor(Math.random() * 5);
        
    }

    onBtnLeft() {

    }
    onBtnRight() {

    }
    onBtnUp() {

    }
    onBtnDown() {

    }
    onChange() {

    }
}