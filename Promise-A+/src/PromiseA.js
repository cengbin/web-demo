// Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

let PENDING = 'pending'
let FULFILLED = 'fulfilled'
let REJECTED = 'rejected'

class PromiseA {

  constructor(executor) {
    if (typeof executor !== 'function') throw new Error(`TypeError: Promise resolver ${executor} is not a function`)

    this.state = PENDING
    this.value = null
    this.reason = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    let resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn(value))
      }
    }

    let reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
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
    onFulfilled = (typeof onFulfilled === 'function' ? onFulfilled : value => value)

    onRejected = (typeof onRejected === 'function' ? onRejected : reason => {throw reason})

    let promise2 = new PromiseA((resolve, reject) => {

      if (this.state === FULFILLED) {
        // then 函数是异步，模拟异步
        setTimeout(() => {
          let x = onFulfilled(this.value)
          resolve(x)
        })
      }

      if (this.state === REJECTED) {
        setTimeout(() => {
          let x = onRejected(this.reason)
          // resolve(x)
        })
      }

      if (this.state === PENDING) {
        setTimeout(() => {
          this.onFulfilledCallbacks.push((value) => {
            let x = onFulfilled(value)
            // resolve(x)
          })

          this.onRejectedCallbacks.push((reason) => {
            let x = onRejected(reason)
            // resolve(x)
          })
        })
      }
    })

    return promise2
  }
}

/**
 *
 * @param promise2 then函数返回的promise
 * @param x 调用onFulfilled函数返回的promise
 * @param resolve promise2的resolve
 * @param reject promise2的reject
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new Error(`TypeError: Chaining cycle detected for promise`)
  }

  if (x instanceof PromiseA) {
    if (x.state === PENDING) {

    } else if (x.state === FULFILLED) {

    } else if (x.state === REJECTED) {

    }
  } else if (typeof x === 'object' || typeof x === 'function') {

  } else {

  }
}

console.log('1')
let p1 = new PromiseA((resolve, reject) => {
  // throw new Error('error...')
  console.log('2')
  // setTimeout(() => {
  //   resolve(1)
  // })
  resolve(1)
})

let p2 = p1.then(value => {
  console.log('4.1 -> onFulfilled value:', value, this)
  return 'haha ' + value
}, error => {
  console.log('4.2 -> onRejected')
})

let p3 = p2.then(value => {
  console.log('5.1 -> onFulfilled value:', value, this)
}, error => {

})

// console.log(p1 === p2)
console.log('3')

// 05.28