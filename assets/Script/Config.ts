import Cube, { CubeData } from "./Cube";

export default class Config {

    static cubeSize = 40;
    /**行数 */
    static cubeRow = 17;
    /**列数 */
    static cubeLine = 12;

    /**左右两边最大的移动距离 */
    get differLeftRight() {
        return (Config.cubeLine - 2) >> 1;
    }

    cubeArr: OneCubeMode[];

    private static _instance: Config;
    static get instance() {
        if (!this._instance) {
            this._instance = new Config();
        }
        return this._instance;
    }

    init() {
        this.cubeArr = [];
        let cube1 = [
            [
                new CubeData(-1, 0),
                new CubeData(0, 0),
                new CubeData(1, 0),
                new CubeData(0, 1)
            ],
            [
                new CubeData(0, 1),
                new CubeData(0, 0),
                new CubeData(0, -1),
                new CubeData(1, 0)
            ],
            [
                new CubeData(-1, 0),
                new CubeData(0, 0),
                new CubeData(1, 0),
                new CubeData(0, -1)
            ],
            [
                new CubeData(-1, 0),
                new CubeData(0, 0),
                new CubeData(0, 1),
                new CubeData(0, -1)
            ]
        ];
        let cube2 = [
            [
                new CubeData(-1, 1),
                new CubeData(-1, 0),
                new CubeData(0, 0),
                new CubeData(1, 0)
            ],
            [
                new CubeData(0, 1),
                new CubeData(1, 1),
                new CubeData(0, 0),
                new CubeData(0, -1)
            ],
            [
                new CubeData(-1, 0),
                new CubeData(0, 0),
                new CubeData(1, 0),
                new CubeData(1, -1)
            ],
            [
                new CubeData(0, 1),
                new CubeData(0, 0),
                new CubeData(0, -1),
                new CubeData(-1, -1)
            ]
        ];
        let cube3 = [
            [
                new CubeData(0, 0),
                new CubeData(1, 0),
                new CubeData(1, 0),
                new CubeData(0, 1)
            ]
        ];
        let cube4 = [
            [
                new CubeData(0, 1),
                new CubeData(0, 0),
                new CubeData(0, -1),
                new CubeData(0, -2)
            ],
            [
                new CubeData(-2, 0),
                new CubeData(-1, 0),
                new CubeData(0, 0),
                new CubeData(1, 0)
            ]
        ];
        let cube5 = [
            [
                new CubeData(-1, 1),
                new CubeData(0, 1),
                new CubeData(0, 0),
                new CubeData(1, 0)
            ],
            [
                new CubeData(1, 1),
                new CubeData(0, 0),
                new CubeData(1, 0),
                new CubeData(0, -1)
            ]
        ];
        this.cubeArr.push(new OneCubeMode(cube1));
        this.cubeArr.push(new OneCubeMode(cube2));
        this.cubeArr.push(new OneCubeMode(cube3));
        this.cubeArr.push(new OneCubeMode(cube4));
        this.cubeArr.push(new OneCubeMode(cube5));
    }
}

export class OneCubeMode {
    cudeType: CubeData[][] = [];
    constructor(data: CubeData[][]) {
        this.cudeType = data;
    }
}