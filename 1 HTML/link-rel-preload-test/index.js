console.log('index.js')
document.addEventListener('click', () => {
  var script = document.createElement('script')
  script.onload = function () {
    console.log('js onload')
    document.body.removeChild(script)

    setTimeout(() => {
      console.log('delay')
    })
  }
  script.src = './index.js'
  document.body.appendChild(script)
})