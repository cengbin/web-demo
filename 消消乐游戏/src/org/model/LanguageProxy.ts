import Proxy = puremvc.Proxy;
import IProxy = puremvc.IProxy;
import LanguageData from "./common/LanguageData"

export default class LanguageProxy extends Proxy implements IProxy {
  public static NAME: string = "language_proxy"

  public languageData: LanguageData

  constructor() {
    super(LanguageProxy.NAME)

    this.languageData = new LanguageData()
    window["languageProxy"] = this
  }
}
