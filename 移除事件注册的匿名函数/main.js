var events = {}

function addEventListener2(type, fun) {
  if (!events.hasOwnProperty(type)) {
    events[type] = []
  }
  events[type].unshift(fun)
}

function removeEventListener2(type, fun) {
  if (events.hasOwnProperty(type)) {
    if (fun) {
      var funArr = events[type]
      for (var i = 0; i < funArr.length; i++) {
        if (funArr[i] === fun) {
          funArr.splice(i, 1)
          return
        }
      }
    } else {
      events[type] = null
      delete events[type]
    }
  }
}

function dispatchEvent2(type) {
  if (events.hasOwnProperty(type)) {
    var funArr = events[type]
    for (var i = funArr.length - 1; i >= 0; i--) {
      funArr[i] && funArr[i]()
    }
  }
}

addEventListener2("a", function () {
  console.log("执行了a1事件侦听函数")
  removeEventListener2("a", arguments.callee)
})

addEventListener2("a", function () {
  console.log("执行了a2事件侦听函数")
  removeEventListener2("a", arguments.callee)
})

addEventListener2("a", function () {
  console.log("执行了a3事件侦听函数")
  removeEventListener2("a", arguments.callee)
})

dispatchEvent2("a")
dispatchEvent2("a")
dispatchEvent2("a")