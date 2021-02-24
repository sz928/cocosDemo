const { ccclass, property } = cc._decorator;
@ccclass('游戏场景')
export default class GameScene extends cc.Component {
    onLoad() {
        let drawNode = new cc.Node();
        let draw = drawNode.addComponent(cc.Graphics);
        // 设置线条宽度
        draw.lineWidth = 5;
        draw.strokeColor = cc.Color.GREEN;
        // 路径起点为0,0
        draw.moveTo(0, 0);
        // 路径画线到（100,100）
        // 路径看不见！！！
        draw.lineTo(100, 100);
        draw.lineTo(100, 200);
        draw.lineTo(200, 200);
        // 把路径画实，能看见啦！
        draw.stroke();

        this.node.addChild(drawNode);

    }
}