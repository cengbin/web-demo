class Router {
  constructor (route) {
    this.routes = {};
    this.model = 'hash';

    if (route)
      this.addRoute(route);

    this.init();
  }

  init () {
    if ('onpopstate' in window) {
      window.addEventListener('popstate', function (event) {
        console.log("onpopstate, location: " + document.location + ", state: " + JSON.stringify(event.state));
        if (event.state) {
          this.routes[event.state.route].updateEnter();
        } else {
          this.routes['/'].updateEnter();
        }
      });
    }
  }
}

Router.prototype.addRoute = function (route) {
  function setRoute (key, val) {
    this.routes[key] = val;
    val['loaded'] = false
  }

  if (Object.prototype.toString.call(route) == "[object Array]") {
    for (var i = 0; i < route.length; i++) {
      setRoute.call(this, route[i].path, route[i])
    }
  } else {
    setRoute.call(this, route.path, route)
  }
}

Router.prototype.historyTo = function (path) {
  window.history.pushState({'route': path}, 'default', path);

  $('main').empty();

  let route = this.routes[path];
  // console.log(route)
  if (route.entry.html) {
    loadHtml(route.entry.html).then(res => {
      // console.log(res)
      console.log('load html complete')

      $("main").append(res)

      let arr = []
      if (route.entry && route.entry.scripts) {
        route.entry.scripts.forEach(url => {
          let p = loadScript(url).then(res => {
            // console.log(res)

            console.log('load js complete')
            // $("main").append(res)
          })
          arr.push(p)
        })
        Promise.all(arr).then(res => {
          route.updateEnter()
        })
      }
    })
  }

}