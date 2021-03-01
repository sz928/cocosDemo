import Config from "./Config";
import { CubeData } from "./Cube";

export default class DataManager {
    private static _instance: DataManager;
    static get instance() {
        if (!this._instance) {
            this._instance = new DataManager();
        }
        return this._instance;
    }

    /**整体上移 */
    allMove = 150;

    /**已经固定的方块 */
    isHasCube: CubeData[] = [];

    /**起点坐标 */
    startPoint: { x: number, y: number } = { x: 0, y: 0 };

    init() {
        this.isHasCube = [];
        let maxW = Config.cubeSize * (Config.cubeLine - 1);
        let maxH = Config.cubeSize * (Config.cubeRow - 1);
        if (Config.cubeLine % 2 != 0) {
            this.startPoint.x = Config.cubeSize / 2;
        }
        this.startPoint.y = maxH / 2 + DataManager.instance.allMove + Config.cubeSize / 2;
        if (Config.cubeRow % 2 == 0) {
            this.startPoint.y += Config.cubeSize / 2;
        }
    }
}