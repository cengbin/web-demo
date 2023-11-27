console.log("event.js，self:", self)

;(function () {
  var win
  var target

  if (self.window) {
    console.log('主线程')
    console.log("window:", window)
  } else {
    console.log('worker线程')
    console.log("self:", self)
  }

  setTimeout(() => {
    throw new Error('I am error!')
  }, 1000)

  // window.addEventListener("message", handleListenMsg)
}())
