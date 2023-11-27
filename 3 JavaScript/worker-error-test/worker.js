console.log('i am worker.js')

importScripts('./event.js')

console.log('event.js loaded')

// DedicatedWorkerGlobalScope 对象（也就是 Worker 全局作用域）可以通过 self 关键字来访问。
// 一些在 worker 全局作用域下不可用的全局函数、命名空间对象以及构造器，也可以通过此对象使用。
// 在 JavaScript 参考的 Web Workers 可以使用的函数和类 (en-US)页面中，有列举这些特性。
self.onmessage = function (event) {
  console.group('worker.js -> on message event')
  console.log('type :', event.type)
  console.log('data :', event.data)
  console.groupEnd()

  setTimeout(() => {
    self.postMessage(new Date())
  }, 1000)
}