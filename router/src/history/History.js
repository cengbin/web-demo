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
    let pathArr = this.parsePath(path);

    console.log('module pathArr:', pathArr)

    let params = this.parseParam(param);
    console.log('params:', params)
  }

  // 解析路径
  parsePath (path = '') {
    // console.log('parsePath:', path);
    if (path) {
      let pathArr = [];
      let arr = path.split('/');
      arr.forEach((val, idx) => {
        let path = arr.slice(0, idx + 1).join('/');

        this.router.emit(EVENT_ENUM.PARSE_PATH, {path});

        let mapVal = this.router.routeMap[path];

        // 路由映射 添加加载路径
        if (mapVal && (typeof mapVal === 'string')) {
          pathArr.push(mapVal)
        }

        // 最终路径必须有对应的模块
        if (idx === arr.length - 1) pathArr.push(path)
      })

      // 去重
      return Array.from(new Set(pathArr));
    }
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
  PARSE_PARAM: 'parse_param'
}