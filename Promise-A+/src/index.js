console.log('1')
let p = new Promise((resolve, reject) => {
  console.log('2')
  resolve(1)
})

let p2 = p.then((value) => {
  console.log('3 -> value:', value)
  return p2 // TypeError: Chaining cycle detected for promise #<Promise>
}, (error) => {

})

let p3 = p2.then(() => {
  console.log('4')
  return p2
})
console.log('5')

// new Promise(1)