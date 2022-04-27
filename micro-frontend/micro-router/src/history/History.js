export default class History {
  constructor (router) {
    this.router = router
  }

  // 初始化
  init () {}

  // 跳转到指定的路由
  go (path) {
    this.router.emit("pre_jump", {path})
  }

  // 跳转到指定的路由，并替换掉栈顶记录
  replace () {}

  // 解析路径和参数
  parse (path = '', param = '') {
    let routes = this.parsePath(path);
    this.router.emit(EVENT_ENUM.PARSE_ROUTE, {routes});

    let params = this.parseParam(param);
    // console.log('params:', params)
    this.router.emit(EVENT_ENUM.PARSE_PARAM, params);

    this.router.changeView(routes, params)
  }

  // 解析路径
  parsePath (path = '') {
    // console.log('parsePath:', path);
    if (path) {
      let pathArr = [];
      let arr = path.split('/');
      arr.forEach((val, idx) => {
        let path = arr.slice(0, idx + 1).join('/');

        this.router.emit(EVENT_ENUM.PARSE_PATH, path);

        // 找到已注册的路由，包括嵌套路由
        let route = this.router.pathMap[path];
        if (route) {
          pathArr.push(route)
        }
      })

      // 去重
      return Array.from(new Set(pathArr));
    }
    return []
  }

  // 解析参数
  parseParam (param) {
    // console.log('parseParam:', param);
    if (param) {
      let ret = {},
        seg = param.split('&'),
        len = seg.length,
        i = 0,
        s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    }
    return null;
  }
}

export const EVENT_ENUM = {
  PARSE_PATH: 'parse_path',
  PARSE_ROUTE: 'parse_route',
  PARSE_PARAM: 'parse_param'
}