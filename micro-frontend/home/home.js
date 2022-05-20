let code = `define(function (require, exports, module) {
  require('home/home.css')
  // require('micro-lib/vue/vue.js')
  // require('micro-lib/vue/vue.min.js')
  let tpl = require('home/home.tpl')
  module.exports = {
    entry() {
      $('#content').html(tpl)

      var app = new Vue({
        el: '#app',
        data() {
          return {
            name: 'home',
            id: parseInt(Math.random() * 1000),
          }
        },
        methods: {
          onClickBtn() {
            router.go('#user')
          }
        }
      })
    },
    exit() {
      console.log('home module exit.')
    }
  }
})`

window.snadbox(code)