import Proxy = puremvc.Proxy;
import IProxy = puremvc.IProxy;
import {
  Authorization,
  parentId,
  token,
  studentId
} from "../util/logininfo"

export default class UserProxy extends Proxy implements IProxy {
  public static NAME: string = "user_proxy"

  // 用户登陆基本信息
  public userData: {
    Authorization: string,
    parentId: string,
    token: string,
    studentId: string,
    [propName: string]: any
  } = null

  // v联盟新手引导
  public vunionGuide: {
    seeComic: any, // 漫画提示
  } = null

  constructor() {
    super(UserProxy.NAME)
    this.userData = {
      Authorization,
      parentId,
      token,
      studentId
    }

    let vunionGuide = window.localStorage.getItem("vunionGuide")
    if (vunionGuide) {
      this.vunionGuide = JSON.parse(vunionGuide)
    } else {
      this.vunionGuide = {seeComic: 0}
      window.localStorage.setItem("vunionGuide", JSON.stringify(this.vunionGuide))
    }
    window["userProxy"] = this
  }

  public setVunionGuide(key, val) {
    this.vunionGuide[key] = val
    window.localStorage.setItem("vunionGuide", JSON.stringify(this.vunionGuide))
  }
}
