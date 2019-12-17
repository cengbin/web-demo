console.log('1')
let p = new Promise((resolve,reject)=>{
    console.log('2')
    resolve(1)
}).then((value) => {
  console.log('4 -> value:', value)
}, (error) => {

})
console.log('3')

// new Promise(1)