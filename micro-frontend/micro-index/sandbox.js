;(function (window) {
  var target = {
    Math: window.Math,
    Date: window.Date,

    console: window.console,
    parseInt: window.parseInt,

    define: window.define,
    $: window.$,
    Vue: window.Vue
  }

  var handler = {
    has(target, key) {
      if (key in target) {
        return target[key]
      } else {
        throw new Error(`无法访问属性或方法 ${key}, 详情请参考：https://www.google.com`)
        return undefined
      }
    }
  }

  var proxy = new Proxy(target, handler)

  function sandbox(code) {
    var fun = new Function(`
        "use stric";

        with(this){
            ${code}
        }
    `)

    fun.call(proxy)
  }

  window.snadbox = sandbox
}(window))