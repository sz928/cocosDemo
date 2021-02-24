const { ccclass, property } = cc._decorator;
@ccclass('游戏场景')
export default class GameScene extends cc.Component {

    private drawNode: cc.Node;
    private draw: cc.Graphics;

    onLoad() {
        this.drawNode = new cc.Node();
        this.drawNode.anchorX = this.drawNode.anchorY = 0.5;
        this.node.addChild(this.drawNode);
        this.draw = this.drawNode.addComponent(cc.Graphics);
        this.draw.lineWidth = 5;
        // this.drawNode.addComponent(cc.Widget);
    }

    start() {
        this.draw.strokeColor = cc.Color.WHITE;
        for (let i = 0; i < 10; i++) {
            let startX = i * 60;
            this.draw.moveTo(startX, 0);
            this.draw.lineTo(startX, 600);
            this.draw.stroke();

            let startY = i * 60;
            this.draw.moveTo(0, startY);
            this.draw.lineTo(600, startY);
            this.draw.stroke();
        }
    }
}