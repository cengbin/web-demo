import Proxy = puremvc.Proxy;
import IProxy = puremvc.IProxy;
import GameData from "./common/GameData"
import {
  // _getVworldVregionDetail,
  getStudentstar,
  getVwordVredirectList,
  getVwordVregionDetail,
  getVwordVregionList,
  getEggshell,
  getNoviceGuideDetail,
  NoviceGuideType
} from "../../api"
import IBuildingMaterial from "../interface/IBuildingMaterial"
import IBuildingLocation, {BuildingLocationType} from "../interface/IBuildingLocation"
import IBuildingLevel, {ChargeType} from "../interface/IBuildingLevel"
import {queryString} from "../util/url"
import env from "../util/env"
// import testMapData from "./testData"

export default class GameProxy extends Proxy implements IProxy {
  public static NAME: string = "game_proxy"

  public static INIT_GAME_DATA_COMPLETE: string = "init_game_data_complete"

  public static UPGRADE_SUCCESS: string = "upgrade_success"
  // 当前地图下标，用于首次进入游戏需要加载一张当前地图的背景
  public static currentSceneIndex = 0

  // 游戏数据
  public gameData: GameData = null
  // 解析路由参数数据
  public queryStrObj: UrlParamsStruct = null

  // 当前所在场景id
  private _currentSceneId: number = null

  constructor() {
    super(GameProxy.NAME)
    this.gameData = new GameData()

    this.queryStrObj = queryString() as any
    this.queryStrObj.mute = (this.queryStrObj.mute === "1" || env === "dev" ? true : false)

    window["gameProxy"] = this
  }

  /**
   * 初始化游戏数据
   * */
  public getInitData(data) {
    let {studentId} = data
    getNoviceGuideDetail({
      studentId
    }).then((res: ResponseStruct) => {
      if (res && res.code === 200) {
        let guideMap = res.data["guideMap"]
        this.gameData.guide = {
          first: {
            val: !guideMap[NoviceGuideType.ACTIVITY_GUIDE],
            "1": true,
            "2": true,
            "3": true,
            "4": true,
            "5": true,
            "6": true
          },
          second: {
            val: !guideMap[NoviceGuideType.UPGRADE_GUIDE],
            "1": true, // 升级文字提示
            "2": true, // 按钮引导点击提示
            "3": true // 购买成功文字提示
          },
          third: {
            val: !guideMap[NoviceGuideType.SKIN_CHANGE_GUIDE],
            "1": true, // 购买面板左侧气泡提示
            "2": true // 换肤按钮小手提示
          },
          fourth: {
            val: !guideMap[NoviceGuideType.CORE_VITEM_GUIDE]
          }
        }

        // this.gameData.guide.first.val = true
        // this.gameData.guide.second.val = true
        // this.gameData.guide.third.val = true
        // this.gameData.guide.fourth.val = true

        return getEggshell({
          studentId
        })
      }
    }).then((res: { data: any, code: number }) => {
      if (res && res.code === 200) {
        this.gameData.totalEggshell = res.data.totalNumber
        this.gameData.availableEggshell = res.data.availableNumber
        // this.gameData.totalEggshell = 99999
        // this.gameData.availableEggshell = 10000000
        // 1.获取星星数
        return getStudentstar({
          studentId
        })
      }
    }).then((res: { data: any, code: number }) => {
      if (res && res.code === 200) {
        this.gameData.totalStars = res.data.totalStars
        this.gameData.leftStars = res.data.leftStars
        // this.gameData.totalStars = 99999
        // this.gameData.leftStars = 0

        // 2.获取地图列表
        return getVwordVregionList({
          studentId
        })
      }
    }).then((res: { data: any, code: number }) => {
      if (res && res.code === 200) {
        this.gameData.mapList = this.compileMapList(res.data)
        // this._currentSceneId = this.gameData.mapList[0].id

        // 3.获取 获取途径列表
        return getVwordVredirectList({
          studentId
        })
      }
    }).then((res: { data: any, code: number }) => {
      if (res && res.code === 200) {
        this.parseRedirect(res.data["data"])
        if (env === "dev") console.log(this.gameData)

        // 获取当前所在地图的建造位 建造物信息
        return getVwordVregionDetail({
          studentId,
          id: this._currentSceneId
        })
      }
    }).then((res: { data: any, code: number }) => {
      if (res && res.code === 200) {
        this.compileMapBuilding(res.data)
        this.sendNotification(GameProxy.INIT_GAME_DATA_COMPLETE)

        // return _getVworldVregionDetail()
        // return postVwordSetCurrentRegion({
        //   studentId,
        //   vregionId: 25
        // })
        return res
      }
    }).then((res) => {
      if (res && res["code"] === 200) {
        // let id = res["data"]["id"]
        // this.gameData.mapsBuilding[this.gameData.mapList[0].id] = this.compileMapBuilding(res.data)
        // this.sendNotification(GameCommand.INIT_DATA_COMPLETE)
      }
    })
  }

  /**
   * 升级成功 设置建造位上正在使用的建造物
   * */
  public upgradeSuccess(bld: IBuildingLevel) {
    let {level, costNumber, chargeType, buildingLocationId, buildingMaterialId} = bld

    // 当前等级 所在的建造位
    let buildingLocationData: IBuildingLocation = this.getBuildingLoationData(this._currentSceneId, buildingLocationId)
    let {type, vitemList, id} = buildingLocationData
    let useBuildingMaterial: IBuildingMaterial = vitemList.find(ele => ele.hasSubOneUse)
    if (useBuildingMaterial) {
      useBuildingMaterial.hasSubOneUse = false
      useBuildingMaterial.vitemExtList.forEach(ele => ele.inUse = false)
    }

    // 当前等级 所在的建造物
    let curBuildingMaterial: IBuildingMaterial = vitemList.find(ele => ele.id === buildingMaterialId)
    curBuildingMaterial.hasSubOneUse = true
    curBuildingMaterial.curLevel = level

    bld.inUse = true
    bld.own = true

    let elseNames = []
    if (type === BuildingLocationType.CORE) {
      // 找出关联此核心建造位的普通建造位
      let mapData = this.getMapData(this._currentSceneId)
      let blds = mapData.vpositionList.filter(ele => ele.unlockNeedCorePositionId === id)
      console.log("blds:", blds)
      if (blds && blds.length > 0) {
        blds.forEach(ele => {
          // 如果当前核心建造物等级大于等于 普通建造位解锁需要等级，解锁普通建造位
          if (curBuildingMaterial.curLevel >= ele.unlockNeedCoreItemLevel) {
            if (!ele.unlock) {
              ele.unlock = true
              elseNames.push("building" + ele.id)
            }
          }
        })
      }
    }

    let leftStars
    if (chargeType === ChargeType.STAR) {
      leftStars = (this.gameData.leftStars -= costNumber)
    } else if (chargeType === ChargeType.EGGSHELL) {
      leftStars = (this.gameData.availableEggshell -= costNumber)
    }

    let loadData = null
    let nextLevelData = curBuildingMaterial.vitemExtList.find(ele => ele.level === level + 1)
    if (nextLevelData) loadData = {key: "goods" + nextLevelData.id, url: nextLevelData.imageUrl}

    let body = {
      chargeType,
      leftStars,
      loadData,
      eleName: "building" + id,
      elseNames
    }
    this.sendNotification(GameProxy.UPGRADE_SUCCESS, body)
  }

  /**
   * 换肤成功 设置建造位上正在使用的建造物
   * */
  public setUseBuildingMaterial(blId, bmId, blevelId) {
    let buildingLocationData: IBuildingLocation = this.getBuildingLoationData(this._currentSceneId, blId)
    let {vitemList} = buildingLocationData
    let useBuildingMaterial: IBuildingMaterial = vitemList.find(ele => ele.hasSubOneUse)
    if (useBuildingMaterial) {
      useBuildingMaterial.hasSubOneUse = false
      useBuildingMaterial.vitemExtList.forEach(ele => ele.inUse = false)
    }

    let curBuildingMaterial: IBuildingMaterial = vitemList.find(ele => ele.id === bmId)
    if (curBuildingMaterial) {
      curBuildingMaterial.hasSubOneUse = true

      let curBuildingLevel = curBuildingMaterial.vitemExtList.find(ele => ele.level === blevelId)
      if (curBuildingLevel) {
        curBuildingLevel.inUse = true
      }
    }
  }

  /**
   * 设置建造位 建造物的描述数据
   * */
  public setBuildingDescription(id, data) {
    if (!data) return

    let bld = this.getBuildingLoationData(this._currentSceneId, id)
    if (!bld.haveBuildingMaterialDesc) {
      bld.haveBuildingMaterialDesc = true

      let {vpositionDescription, vitemDescriptionVoList} = data
      bld.description = vpositionDescription
      vitemDescriptionVoList.forEach(ele => {
        let {vitemId, description, descriptionShort} = ele
        let buildingMaterial = bld.vitemList.find(ele => ele.id === vitemId)
        if (buildingMaterial) {
          buildingMaterial.description = description
          buildingMaterial.descriptionShort = descriptionShort
        }
      })
    }
  }

  /**
   * 获取指定地图的数据
   * */
  public getMapData(id) {
    return this.gameData.mapList.find(ele => ele.id === id)
  }

  /**
   * 指定地图是否已拥有 建造位 建造物 详细信息
   * */
  public hasMapDetailData(mapId): boolean {
    let mapData = this.getMapData(mapId)
    if (mapData) return mapData.vpositionList !== null
    else return false
  }

  /**
   * 设置当前所在的地图数据
   * */
  public setCurrentVregion(id) {
    this._currentSceneId = id
    this.gameData.mapList.forEach(ele => {
      ele.currentVregion = (ele.id === id)
    })
  }

  /**
   * 解析地图列表数据
   * */
  private compileMapList(data) {
    // console.log(data)
    data.forEach((ele, idx) => {
      ele.index = idx
      ele.haveBuildingMaterialDesc = false

      if (ele.currentVregion) {
        this._currentSceneId = ele.id
        GameProxy.currentSceneIndex = idx
      }

      // if (idx === 1) {
      //   ele.unlock = false
      //   ele.courseCount = 3
      //   ele.unlockConditionCount = 10
      // }
    })

    return data.slice(0, data.length > 2 ? 2 : data.length)
  }

  /**
   * 解析指定地图详细数据
   * */
  public compileMapBuilding(data) {
    // console.log(data)
    let mapData = this.gameData.mapList.find(ele => ele.id === data.id)
    if (mapData) {
      let {vpositionList} = data

      // if (data.id === 25) {
      //   vpositionList = testMapData.vpositionList
      // }

      if (!vpositionList) {
        mapData.vpositionList = []
      } else {
        vpositionList.forEach((buildingLocation) => {
          if (buildingLocation.courseCount === null) buildingLocation.courseCount = 0

          if (!buildingLocation.vitemList) buildingLocation.vitemList = []

          if (buildingLocation.initCol > 59) buildingLocation.initCol = 59

          buildingLocation.vitemList.forEach((buildingMaterial) => {
            if (!buildingMaterial.vitemExtList) buildingMaterial.vitemExtList = []

            buildingMaterial.buildingLocationId = buildingLocation.id

            let curLevel = 0
            buildingMaterial.vitemExtList.forEach((buildingLevel) => {
              buildingLevel.buildingMaterialId = buildingMaterial.id
              buildingLevel.buildingLocationId = buildingLocation.id

              let {own, level} = buildingLevel
              if (own && level > curLevel) {
                // console.log(buildingMaterial.curLevel, level)
                curLevel = level
              }
            })
            buildingMaterial.curLevel = curLevel
          })

          if (env === "dev") {
            /*if (buildingLocation.id === 23) {
              buildingLocation.courseCount = 5
              buildingLocation.vitemList[0].hasSubOneUse = true
              buildingLocation.vitemList[0].curLevel = 1
              buildingLocation.vitemList.forEach((ele, idx) => {
                if (idx === 0) {
                  ele.vitemExtList.forEach((ele, idx) => {
                    if (ele.level === 1) {
                      ele.inUse = true
                      ele.own = true
                    }
                    if (ele.level > 1) {
                      ele.inUse = false
                      ele.own = false
                    }
                  })
                }
              })
            }

            if (buildingLocation.id === 42) {
              buildingLocation.unlock = false
              buildingLocation.unlockNeedCoreItemId = 17
              buildingLocation.unlockNeedCoreItemLevel = 3
              buildingLocation.unlockNeedCorePositionId = 23
            }*/

            /*if (buildingLocation.id === 43) {
              buildingLocation.unlock = false
              buildingLocation.unlockNeedCoreItemId = 16
              buildingLocation.unlockNeedCoreItemLevel = 3
              buildingLocation.unlockNeedCorePositionId = 24
            }*/
          }
        })
        mapData.vpositionList = vpositionList
      }

      if (mapData.index === 0) {
        mapData.jihuoGuideId = (/dev|stage/.test(env) ? 32 : 15)
      } else if (mapData.index === 1) {
        mapData.jihuoGuideId = (/dev|stage/.test(env) ? 118 : 41)
      }
    }
    return mapData
  }

  /**
   * 找到地图中可升级建造位且ID最小的那个物品建造位
   * */
  public findMapUpgradeBuildingLocation(mapID) {
    let mapData = this.gameData.mapList.find(ele => ele.id === mapID)
    if (mapData) {
      let shengjiList = []
      mapData.vpositionList.forEach((buildingLocation) => {
        buildingLocation.vitemList.forEach((buildingMaterial) => {
          if (buildingLocation.type === BuildingLocationType.COMMON && buildingMaterial.hasSubOneUse && buildingMaterial.curLevel !== buildingMaterial.vitemExtList.length) {
            let nbld = buildingMaterial.vitemExtList.find(ele => ele.level === buildingMaterial.curLevel + 1)
            if (nbld && this.gameData.leftStars > nbld.costNumber) shengjiList.push(buildingLocation)
          }
        })
      })
      // console.log(shengjiList)

      shengjiList.sort((a, b) => {
        return a.id - b.id
      })

      if (shengjiList.length > 0) {// 记录升级引导建造位id
        mapData.shengjiGuideId = shengjiList[0].id
      } else {
        mapData.shengjiGuideId = null
      }
    }
    return mapData
  }

  /**
   * 解析跳转数据
   * */
  private parseRedirect(obj) {
    this.gameData.redirect.all = obj
    obj.forEach(ele => {
      let type = ele.type.toLowerCase().substring(4)
      if (type && this.gameData.redirect[type]) {
        this.gameData.redirect[type].push(ele)
      }
    })
  }

  /**
   * 获取指定地图中指定建造位数据
   * */
  public getBuildingLoationData(mapId, locationId): IBuildingLocation {
    let mapData = this.getMapData(mapId)
    if (mapData) {
      return mapData.vpositionList.find(ele => ele.id === locationId)
    }
    return null
  }

  /**
   * 获取当前建造位 -> 当前建造物数据(已拥有并且在使用中)
   * */
  public getCurrentBuildingMaterialData(cbld: IBuildingLocation): IBuildingMaterial {
    return cbld.vitemList.find(ele => ele.hasSubOneUse)
  }

  /**
   * 获取当前建造物 -> 当前等级数据
   * */
  public getCurrentBuildingLevelData(cbmd: IBuildingMaterial): IBuildingLevel {
    return cbmd ? this.getBuildingLevelData(cbmd, cbmd.curLevel) : null
  }

  /**
   * 获取当前建造物 -> 下一个等级数据
   * */
  public getNextBuildingLevelData(cbmd: IBuildingMaterial): IBuildingLevel {
    return cbmd ? this.getBuildingLevelData(cbmd, cbmd.curLevel + 1) : null
  }

  /**
   * 获取建造物 -> 等级数据
   * @param level 等级
   * */
  public getBuildingLevelData(cbmd: IBuildingMaterial, level) {
    return cbmd ? cbmd.vitemExtList.find(ele => ele.level === level) : null
  }

  /**
   * 是否提示升级引导
   * */
  public showSecondTips(mapID) {
    let mapData = this.findMapUpgradeBuildingLocation(mapID)
    if (mapData && mapData.shengjiGuideId) {
      let cbld, cbmd, nbld

      cbld = this.getBuildingLoationData(mapData.id, mapData.shengjiGuideId)
      if (cbld) {
        cbmd = this.getCurrentBuildingMaterialData(cbld)
        if (cbmd) {
          nbld = this.getNextBuildingLevelData(cbmd)
        }
      }

      if (nbld && this.gameData.leftStars > nbld.costNumber) {
        return true
      }
    }
    return false
  }

  public setGuideStatus(step, num, val) {
    this.gameData.guide[step][num] = val
  }

  public set currentSceneId(val) {
    this._currentSceneId = val
  }

  public get currentSceneId() {
    return this._currentSceneId
  }
}
