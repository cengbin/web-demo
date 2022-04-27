import Router from './Router';
import {EVENT_ENUM} from './history/History';

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

function registerMicroApps () {

}

function bootstrap () {

}

function mount () {

}

function unmount () {

}

function parseDom (str) {
  var ele = document.createElement("div");
  ele.innerHTML = str
  return ele.childNodes;
}

function loadScript (url) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.onload = function () {
      resolve(script)
    };
    script.onerror = function () {
      reject(script)
    };
    script.src = url;
    document.body.appendChild(script);
  })
}

function handleResponse (response) {
  let contentType = response.headers.get('content-type')
  // console.log('contentType:', contentType)
  if (contentType.includes('application/json')) {
    return response.json()
      .then(json => {
        if (response.ok) {
          return json
        } else {
          return Promise.reject(json)
        }
      })
  } else if (contentType.includes('text/html')) {
    return response.text()
    // ...
  } else {
    // Handle other responses accordingly...
  }
}

function loadHtml (url) {
  return fetch(url).then(handleResponse).then(data => {
    // console.log("data is:", data)

    // let eles = $(data)
    // console.log("eles:", eles)
    // let i = 0, len = eles.length;
    // for (i; i < len; i++) {
    //   let ele = eles[i]
    //   console.log(i, ele)
    // }

    // $("main").append(data)
    return data;
  }).catch(error => {
    console.log('error is:', error)
  })
}

function loadStyle (url) {
  return new Promise(function (resolve, reject) {
    var style = document.createElement('link');
    style.href = 'style.css';
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.onload = function () {
      resolve(style)
    };
    style.onerror = function () {
      reject(style)
    };
    document.getElementsByTagName('head').item(0).appendChild(style);
  })
}