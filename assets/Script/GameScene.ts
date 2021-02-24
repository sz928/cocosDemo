import Config from "./Config";

const { ccclass, property } = cc._decorator;
@ccclass('游戏场景')
export default class GameScene extends cc.Component {

    private drawNode: cc.Node;
    private draw: cc.Graphics;

    onLoad() {
        this.drawNode = new cc.Node();
        this.node.addChild(this.drawNode);
        this.draw = this.drawNode.addComponent(cc.Graphics);
        let widget = this.drawNode.addComponent(cc.Widget);
        this.drawNode.setContentSize(this.node.getContentSize());
        widget.target = this.node;
        widget.top = widget.bottom = widget.left = widget.right = 0;
        this.draw.lineWidth = 3;
    }

    start() {
        this.draw.strokeColor = cc.Color.WHITE;

        for (let i = 0; i < Config.cardLine; i++) {
            let max = Config.cardSize * Config.cardLine;
            let startX = i * Config.cardSize;
            this.draw.moveTo(startX, 0);
            this.draw.lineTo(startX, max);
            this.draw.stroke();
        }
        for (let i = 0; i < Config.cardRow; i++) {
            let max = Config.cardSize * Config.cardRow;
            let startY = i * Config.cardSize;
            this.draw.moveTo(0, startY);
            this.draw.lineTo(max, startY);
            this.draw.stroke();
        }

        // for (let i = 0; i < Config.cardLine; i++) {
        //     let max = Config.cardSize * Config.cardLine;
        //     let startX = (i - Config.cardLine / 2) * Config.cardSize;
        //     this.draw.moveTo(startX, 0);
        //     this.draw.lineTo(startX, max);
        //     this.draw.stroke();
        // }
        // for (let i = 0; i < Config.cardRow; i++) {
        //     let max = Config.cardSize * Config.cardRow;
        //     let startY = (Config.cardRow / 2 -i) * Config.cardSize;
        //     this.draw.moveTo(0, startY);
        //     this.draw.lineTo(max, startY);
        //     this.draw.stroke();
        // }
    }
}