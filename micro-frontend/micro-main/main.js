import Router from '../router/src/Router';
import {EVENT_ENUM} from '../router/src/history/History';

$(function () {
  function setBackgroundColor (color) {
    document.body.style.backgroundColor = color;
  }

  var router = new Router({
    model: 'hash'
  });

  router.addRoutes([
    {
      path: 'home',
      meta: {
        title: '首页',
      }
    },
    {
      path: 'user',
      meta: {
        title: '用户'
      },
      children: [
        {
          path: '/foo/profile',
          meta: {
            title: '用户简况'
          }
        },
        {
          path: '/foo/posts',
          meta: {
            title: '用户邮件'
          }
        }
      ]
    }
  ])

  console.log(router)

  router.on(EVENT_ENUM.PARSE_PATH, (event) => {
    console.log('parse_path:', event);
  })

  router.on('pre_jump', (data) => {
    console.log('pre_jump, data:', data)
    return {a: 1}
  })

  $('#home').click(function () {
    router.go("#home");
  })

  $("#user").click(function () {
    router.go("#user");
  })
  $("#user_foo").click(function () {
    router.go("#user/foo");
  })
  $("#user_foo_profile").click(function () {
    router.go("#user/foo/profile");
  })
  $('#user_foo_posts').click(function () {
    router.go("#user/foo/posts");
  })
  $('#user_foo_posts2').click(function () {
    router.go("#user/foo/posts:name=chuck&age=18");
  })

  window.onload = function () {
    router.history.onHashChangeListener();
  }
})
