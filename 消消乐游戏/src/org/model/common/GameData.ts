import IMap from "../../interface/IMap"

/**
 * 游戏数据模型
 * */
export default class GameData {
  // 新手引导数据
  public guide: {
    "first": GuideStruct; // 激活引导
    "second": GuideStruct; // 升级引导
    "third": GuideStruct; // 换肤引导
    "fourth": GuideStruct; // 核心建造位引导
  } = null
  // 获得途径提示
  public redirect: {
    "course": RedirectStruct[];
    "star": RedirectStruct[];
    "eggshell": RedirectStruct[];
    "all": RedirectStruct[];
  } = {
    "course": [],
    "star": [],
    "eggshell": [],
    "all": null
  }
  // 所有地图数据
  public mapList: IMap[] = null

  private _totalEggshell: number = 0
  private _availableEggshell: number = 0
  private _totalStars: number = 0
  private _leftStars: number = 0

  constructor() {

  }

  /**
   * 总共星星数
   * */
  public get totalStars() {
    return this._totalStars
  }

  public set totalStars(val) {
    this._totalStars = val
  }

  /**
   * 剩下星星数
   * */
  public get leftStars() {
    return this._leftStars
  }

  public set leftStars(val) {
    this._leftStars = val
  }

  /**
   * 总共能量石数
   * */
  public get totalEggshell() {
    return this._totalEggshell
  }

  public set totalEggshell(val) {
    this._totalEggshell = val
  }

  /**
   * 剩下能量石数
   * */
  public get availableEggshell() {
    return this._availableEggshell
  }

  public set availableEggshell(val) {
    this._availableEggshell = val
  }
}
