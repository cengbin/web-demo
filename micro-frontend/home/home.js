define(function (require, exports, module) {
  require('home/home.css')
  let tpl = require('home/home.tpl')
  module.exports = {
    entry () {
      $('#content').html(tpl);
    },
    exit () {
      console.log('home module exit.')
    }
  }
})