import { CubeData } from "./Cube";

export default class Config {
    constructor() { }

    static cubeSize = 40;
    /**行数 */
    static cubeRow = 17;
    /**列数 */
    static cubeLine = 12;

    static cudeType: { x: number, y: number }[][] = [
        [{ x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 }],

        [{ x: -1, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 0 },
        { x: 1, y: 0 }],

        [{ x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: -1 }],

        [{ x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: -2 },
        { x: 0, y: -3 }],

        [{ x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: 1, y: 0 }]
    ]
}