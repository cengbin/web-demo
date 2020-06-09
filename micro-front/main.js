$(function () {
  function setBackgroundColor(color) {
    document.body.style.backgroundColor = color;
  }

  var router = new Router([
    {
      name: '首页',
      path: '#',
      entry: {
        html: ['./home/home.html'],
        scripts: ['./home/home.js'],
        styles: []
      },
      beforeEnter(next) {
        next();
      },
      updateEnter() {
        // console.log(this)
        setBackgroundColor("transparent")
      }
    },
    {
      name: '蓝色',
      path: '#blue',
      entry: {
        html: ['./blue/blue.html'],
        scripts: ['./blue/blue.js'],
        styles: []
      },
      updateEnter: function () {
        setBackgroundColor("#a1c4fd")
      }
    },
    {
      name: '紫色',
      path: '#purple',
      entry: {
        html: '',
        scripts: [],
        styles: []
      },
      updateEnter: function () {
        // setBackgroundColor("#764ba2")
      }
    }
  ]);

  $('#def').click(function () {
    router.historyTo("#");
  })
  $('#blue').click(function () {
    router.historyTo("#blue");
  })
  $('#purple').click(function () {
    router.historyTo("#purple");
  })
  $('#red').click(function () {
    router.historyTo("#red");
  })

  console.log(router)
  var hash = window.location.hash || "#";
  router.historyTo(hash);
})

function registerMicroApps() {

}

function bootstrap() {

}

function mount() {

}

function unmount() {

}

function parseDom(str) {
  var ele = document.createElement("div");
  ele.innerHTML = str
  return ele.childNodes;
}

function loadScript(url) {
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

function handleResponse(response) {
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

function loadHtml(url) {
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

function loadStyle(url) {
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