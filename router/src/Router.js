import EventEmitter from 'eventemitter3'
import HashHistory from './history/HashHistory'

export default class Router extends EventEmitter {
  constructor (route) {
    super();
    this.routes = {};

    this.model = 'hash';

    this.init();

    if (route)
      this.addRoutes(route);
  }

  init () {
    this.history = new HashHistory(this);

    this.history.init();
  }

  addRoutes (route) {
    route = (Object.prototype.toString.call(route) == "[object Array]"
      ? route
      : [route])

    for (let i = 0; i < route.length; i++) {
      this.setRoute(route[i].path, route[i])
    }
  }

  setRoute (key, val) {
    this.routes[key] = val;
  }

  go (route) {
    console.log('go:', route)

    this.history.go(route)
    // window.history.pushState({'route': path}, 'default', path);

    $('main').empty();

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