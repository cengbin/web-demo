import EventEmitter from 'eventemitter3'
import HashHistory from './history/HashHistory'

export default class Router extends EventEmitter {
  constructor (options) {
    super();

    let {model = 'hash', routes} = options

    this.model = model;

    // 存储所有的 path
    this.pathLsit = [];

    // path 映射
    this.pathMap = {};

    // 记录当前路由映射的所有模块
    this.currentModels = []

    this.init();

    routes && this.addRoutes(routes);
  }

  init () {
    this.history = new HashHistory(this);

    this.history.init();
  }

  addRoutes (route, parent = null) {
    route = (Object.prototype.toString.call(route) == "[object Array]" ? route : [route])

    for (let i = 0; i < route.length; i++) {
      this.addRoute(route[i], parent)
    }
  }

  addRoute (route, parent = null) {
    let {path, children} = route

    let fullPath = parent ? (parent.fullPath + path) : path

    route.fullPath = fullPath;

    this.pathLsit.push(fullPath);

    this.pathMap[fullPath] = route;

    if (children) {
      for (let i = 0; i < children.length; i++) {
        this.addRoute(children[i], route)
      }
    }
  }

  changeView (pathArr, params) {
    if (!pathArr.length) return;

    seajs.use(pathArr, function () {

      this.currentModels && this.currentModels.forEach(model => model.exit && model.exit())

      // console.log('arguments:', arguments)
      let arr = Array.from(arguments)
      console.log('arr:', arr)
      arr.forEach(model => model.entry && model.entry())

      this.currentModels = arr
    })
  }

  go (route) {
    console.log('go:', route)

    this.history.go(route)
    // window.history.pushState({'route': path}, 'default', path);

    // $('main').empty();

    // let route = this.routes[path];
    // console.log(route)
    /*if (route.entry.html) {
      loadHtml(route.entry.html).then(res => {
        // console.log(res)
        console.log('load html complete')

        $("main").append(res)

        if (route.entry && route.entry.scripts) {
          let arr = []
          route.entry.scripts.forEach(url => {
            let p = loadScript(url).then(res => {
              // console.log(res)
              console.log('load js complete')
            })
            arr.push(p)
          })
          Promise.all(arr).then(res => {
            route.updateEnter()
          })
        }
      })
    }*/
  }
}