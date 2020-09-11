import HashHistory from './history/HashHistory'

export default class Router {
  constructor (route) {
    this.routes = {};
    this.model = 'hash';

    this.init();

    if (route)
      this.addRoutes(route);
  }

  init () {
    this.history = new HashHistory();

    this.history.init();
  }

  addRoutes (route) {
    if (Object.prototype.toString.call(route) == "[object Array]") {
      for (var i = 0; i < route.length; i++) {
        this.setRoute(route[i].path, route[i])
      }
    } else {
      this.setRoute(route.path, route)
    }
  }

  setRoute (key, val) {
    this.routes[key] = val;
  }

  push (route) {
    this.history.push(route)
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

  go () {}

  back () {}
}