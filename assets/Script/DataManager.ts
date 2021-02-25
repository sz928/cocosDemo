import { CubeData } from "./Cube";

export default class DataManager {
    private static _instance: DataManager;
    static get instance() {
        if (!this._instance) {
            this._instance = new DataManager();
        }
        return this._instance;
    }
    
    /**已经固定的方块 */
    isHasCube: CubeData[] = [];

    init() {
        this.isHasCube = [];
    }

}