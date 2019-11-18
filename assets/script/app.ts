//游戏状态
export enum GameState {
  gameNone,//初始状态
  gameStart,//游戏开始
  gamePuse,//游戏暂停
  gameEnd,//游戏结束
}

export default class App {

  private static _instance: App;

  private _nodePools: { [index: string]: cc.NodePool };
  private _nodePfb: { [index: string]: cc.Prefab };

  public static get Instance(): App {
    if (this._instance == null) this._instance = new App();
    return this._instance;
  }

  constructor() {
    this._nodePools = {};
    this._nodePfb = {};
  }

  /**
  * 添加对象池
  * @param    type    `类型`
  * @param    size    `大小`
  * @param    pfb     `预制体`
  */
  public AddTypePool(type: string, size: number, pfb: cc.Prefab) {
    this._nodePools[type] = new cc.NodePool();
    this._nodePfb[type] = pfb;
    for (let ii = 0; ii < size; ++ii) {
      this._nodePools[type].put(cc.instantiate(pfb));
    }
  }

  /**
   * 添加对象到池
   * @param    type    `类型`
   * @param    node     `cc.node`
   */
  public PutNode2Pool(type: string, node: cc.Node) {
    this._nodePools[type].put(node);
  }

  /**
   * 从对象池生成对象
   * @param    type    `类型`
   * return   cc.Node
   */
  public GetNodeFromPool(type: string): cc.Node {
    // cc.log(type, ":pool size=", this._nodePools[type].size())
    if (this._nodePools[type].size() <= 0) return cc.instantiate(this._nodePfb[type]);
    return this._nodePools[type].get();
  }
}
