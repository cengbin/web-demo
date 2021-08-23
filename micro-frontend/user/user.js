define(function (require, exports, module) {
  require('user/user.css')
  let tpl = require('user/user.tpl')

  module.exports = {
    entry () {
      $('#content').html(tpl);
    },
    exit () {
      console.log('user module exit.')
    }
  }
})