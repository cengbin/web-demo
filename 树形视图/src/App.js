var determineType = function (object) {
  if (object != null) {
    var typeResult
    var type = typeof object
    if (type == 'object') {
      var len = object.length
      if (len == null) {
        if (typeof object.getTime == 'function') {
          typeResult = 'Date'
        }
        else if (typeof object.test == 'function') {
          typeResult = 'RegExp'
        }
        else {
          typeResult = 'Object'
        }
      } else {
        typeResult = 'Array'
      }
    } else {
      typeResult = type
    }
    return typeResult
  } else {
    return null
  }
}

var formatType = function (type, obj, parent) {
  switch (type) {
    case 'Object' :
      for (var prop in obj) {
        // 获取value的类型
        var subtype = determineType(obj[prop])
        // 递归解析value，并返回解析后的字符串
        var subresult = formatType(subtype, obj[prop], obj)
      }

      if (parent) obj.parent = parent
      break
    case 'Array' :
      for (var i = 0; i < obj.length; i++) {
        var subtype = determineType(obj[i])
        var subresult = formatType(subtype, obj[i], parent)
      }
      break
  }
}

Vue.component('app', {
  template: `
  <div>
      <div class="f1-1">
        <a>文件</a>
        <a>编辑</a>
        <a>下载</a>
      </div>
      <div class="f1-2">
        <div class="f2-1">
          <ul>
            <item v-for="(mod,idx) in treeData" v-bind:model="mod"></item>
          </ul>
        </div>
        <div class="f2-2"></div>
        <div class="f2-3"></div>
      </div>
  </div>`,
  data() {
    let dt = {
      treeData: [
        {
          name: 'html',
          children: [
            {
              name: 'head',
              children: [
                {
                  name: 'meta'
                }, {
                  name: 'title'
                }, {
                  name: 'style'
                }
              ]
            },
            {
              name: 'body',
              children: [
                {
                  name: 'div',
                  children: [
                    {
                      name: 'p',
                      children: [
                        {
                          name: 'p'
                        }, {
                          name: 'span'
                        }
                      ]
                    }, {
                      name: 'span'
                    }, {
                      name: 'span'
                    }, {
                      name: 'div',
                      children: [
                        {name: 'span'},
                        {name: 'span'}
                      ]
                    }
                  ]
                }, {
                  name: 'div'
                }
              ]
            }
          ]
        }
      ]
    }

    formatType('Array', dt.treeData, null);
    // console.log(dt);

    return dt
  }
});