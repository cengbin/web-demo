// import zh from "./zh.json"
// console.log(zh)

export default class LanguageData {
  private _zh: LanguageStruct
  private _en: LanguageStruct
  private _data: LanguageStruct

  constructor() {

    this._zh = {
      start: {
        jingrujidi: "进入基地"
      },
      main: {
        nengliangshi: "能量石",
        jidiyulan: "基地预览",
        miji: "秘籍"
      }
    }

    this._data = this._zh
  }

  public get zh() {
    return this._zh
  }

  public get en() {
    return this._en
  }

  public get data() {
    return this._data
  }
}