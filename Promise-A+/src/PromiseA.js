// Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

let PENDING = 'pending'
let FULFILLED = 'fulfilled'
let REJECTED = 'rejected'

class PromiseA {

  constructor(executor) {
    if (typeof executor !== 'function') throw new Error(`TypeError: Promise resolver ${executor} is not a function`)

    this.state = PENDING
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    let resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.onFulfilledCallbacks.forEach(fn => fn(value))
      }
    }

    let reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.onRejectedCallbacks.forEach(fn => fn(reason))
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    this.onFulfilledCallbacks.push(onFulfilled)
    this.onRejectedCallbacks.push(onRejected)
    return this
  }
}

console.log('1')
let p = new PromiseA((resolve, reject) => {
  console.log('2')
  setTimeout(() => {
    resolve(1)
  }, 1000)
}).then((value) => {
  console.log('4 -> value:', value)
}, (error) => {

})
console.log('3')
// console.log(p)