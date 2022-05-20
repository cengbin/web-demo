define(function (require, exports, module) {
  let tpl = require('./profile.tpl')

  module.exports = {
    entry() {
      $('#user_foo_view').html(tpl)
    },
    exit() {
      console.log('user/foo/profile module exit.')
    }
  }
})