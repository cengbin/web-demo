import './event.js'

var myWorker = new Worker('./worker.js')
myWorker.addEventListener('message', function (event) {
  console.group('main.js -> on message event')
  console.log('type :', event.type)
  console.log('data :', event.data)
  console.groupEnd()
})

var first = document.querySelector('#number1')
var second = document.querySelector('#number2')

first.onchange = function () {
  myWorker.postMessage([first.value, second.value])
}

second.onchange = function () {
  myWorker.postMessage([first.value, second.value])
}


window.addEventListener('error', (event) => {
  console.log(`error: \n ${event}`)
})

window.onerror = (message, source, lineno, colno, error) => {
  console.log(`onerror: \n message: ${message} \n source:  ${source} \n lineno:  ${lineno} \n colno:  ${colno} \n error:  ${error}`)
}