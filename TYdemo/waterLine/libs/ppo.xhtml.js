/*
 * PPO 0.1.2
 *
 * Copyright (c) 2011, www.a-jie.cn
 * +++++++++ JavaScript grocery treasure chest +++++++++
 * All rights reserved.
 *
 * https://github.com/a-jie
 */
(function(window, document, undefind) {
      var ppo = {
            //$('#div1')id || $('.aCur')class|| $('li')tag || $('#div1 li')assemble || $('input[type=text]:checked') property
            o: function(q) {
                  if (typeof(q) !== 'string' || q == '') return [];
                  var ss = q.split(' ');
                  var attr = '';
                  var s = ss[0].split(':')[0];
                  if (s != ss[0]) attr = ss[0].split(':')[1];
                  var val = s.split('[')[0];
                  if (val != s) val = s.split('[')[1].replace(/[",\]]/g, '');
                  else val = '';
                  s = s.split('[')[0];
                  var obj = [];
                  var sObj = null;
                  var o = document;
                  switch (s.charAt(0)) {
                        case '#':
                              sObj = document.getElementById(s.substr(1));
                              if (sObj) obj.push(sObj);
                              break;
                        case '.':
                              var l = o.getElementsByTagName('*');
                              var c = s.substr(1);
                              for (var i = 0; i < l.length; i++)
                                    if (l[i].className.search('\\b' + c + '\\b') != -1) obj.push(l[i]);
                              break;
                        default:
                              obj = o.getElementsByTagName(s);
                              break;
                  }
                  if (val) {
                        var l = [];
                        var a = val.split('=');
                        for (var i = 0; i < obj.length; i++)
                              if (a.length == 2 && obj[i][a[0]] == a[1]) l.push(obj[i]);
                        obj = l;
                  }
                  if (attr) {
                        var l = [];
                        for (var i = 0; i < obj.length; i++)
                              if (obj[i][attr]) l.push(obj[i]);
                        obj = l;
                  }
                  if (ss.length > 1) {
                        var l = [];
                        for (var i = 0; i < obj.length; i++) {
                              var ll = arguments.callee(q.substr(ss[0].length + 1), obj[i]);
                              if (ll.tagName) l.push(ll);
                              else for (var j = 0; j < ll.length; j++)
                                          l.push(ll[j]);
                        }
                        obj = l;
                  }
                  if (sObj && ss.length == 1) {
                        obj = sObj;
                        if (obj) obj.length = 1;
                  } else {
                        var l = [];
                        for (var i = 0; i < obj.length; i++)
                              obj[i].$isAdd = false;
                        for (var i = 0; i < obj.length; i++) {
                              if (!obj[i].$isAdd) {
                                    obj[i].$isAdd = true;
                                    l.push(obj[i]);
                              }
                        }
                        obj = l;
                  }
                  return obj;
            },
            //********************************* DOM operation *********************************//
            createCanvas: function($id, $width, $height, $position, $x, $y) {
                  var element = document.createElement("canvas");
                  var position = $position ? $position : 'absolute';
                  var x = $x != null && $x != undefind ? $x : -500;
                  var y = $y != null && $y != undefind ? $y : -500;
                  element.id = $id;
                  element.width = $width;
                  element.height = $height;
                  element.style.position = position;
                  element.style.left = x + 'px';
                  element.style.top = y + 'px';
                  return element;
            },
            createDiv: function($id, $width, $height, $position, $x, $y, $zIndex) {
                  var element = document.createElement('div');
                  var position = $position ? $position : 'absolute';
                  var zIndex = $zIndex ? $zIndex : 1;
                  var x = $x != null && $x != undefind ? $x : -500;
                  var y = $y != null && $y != undefind ? $y : -500;
                  element.id = $id;
                  element.style.width = $width + 'px';
                  element.style.height = $height + 'px';
                  element.style.position = position;
                  element.style.left = x + 'px';
                  element.style.top = y + 'px';
                  element.style.cursor = "default";
                  element.style.zIndex = zIndex;
                  return element;
            },
            createText: function($id, $size, $color, $position, $x, $y) {
                  var text = document.createElement('div');
                  var position = $position ? $position : 'absolute';
                  var x = $x != null && $x != undefind ? $x : -500;
                  var y = $y != null && $y != undefind ? $y : -500;
                  text.id = $id;
                  text.onSelectStart = null;
                  text.style.color = $color;
                  text.style.position = position;
                  text.style.left = x + 'px';
                  text.style.top = y + 'px';
                  text.style.fontFamily = 'actionj';
                  text.style.fontWeight = 100;
                  text.style.textAlign = 'right';
                  text.style.fontSize = $size + 'pt';
                  return text;
            },
            setDIVRotate: function($div, $translateZ) {
                  $div.style.WebkitTransform = 'translateZ(' + $translateZ + ')';
                  $div.style.MozTransform = 'translateZ(' + $translateZ + ')';
                  $div.style.OTransform = 'translateZ(' + $translateZ + ')';
                  $div.style.msTransform = 'translateZ(' + $translateZ + ')';
                  $div.style.transform = 'translateZ(' + $translateZ + ')';
            },
            setDIVPosition: function($div, $x, $y) {
                  $div.style.left = $x + 'px';
                  $div.style.top = $y + 'px';
            },
            createImgInCanvas: function($src, $graphic, $fun) {
                  if (typeof($src) == 'string') {
                        var myImage = new Image();
                        myImage.onload = function() {
                              $graphic.drawImage(myImage, 0, 0);
                              if ($fun) $fun();
                        }
                        myImage.src = $src;
                  } else {
                        $graphic.drawImage($src, 0, 0);
                  }
            },
            createImgInDIV: function($src, $div, $autoSize) {
                  var img;
                  $div = this.autoDom($div);
                  if (typeof($src) == 'string') {
                        var myImage = new Image();
                        myImage.onload = function() {
                              $div.appendChild(myImage);
                              if ($autoSize) {
                                    $div.style.width = myImage.width + 1 + 'px';
                                    $div.style.height = myImage.height + 'px';
                              }
                        }
                        myImage.src = $src;
                        img = myImage;
                  } else {
                        $div.appendChild($src);
                        if ($autoSize) {
                              $div.style.width = myImage.width + 'px';
                              $div.style.height = myImage.height + 'px';
                        }
                        img = $src;
                  }
                  return img;
            },
            autoSizeByWindows: function(idorclass) {
                  if (document.documentElement.clientHeight && document.documentElement.clientWidth) {
                        this.o(idorclass).style.width = document.documentElement.clientWidth + 'px';
                        this.o(idorclass).style.height = document.documentElement.clientHeight + 'px';
                        this.o(idorclass).style.overflow = 'hidden';
                  }
            },
            cssValueToNumber: function(target, prototype) {
                  return parseFloat(this.autoDom(target).style[prototype]);
            },
            autoDom: function(target) {
                  if (typeof(target) == 'string') {
                        return this.o(target);
                  } else {
                        return target;
                  }
            },
            //********************************* Page function *********************************//
            setPrototypeByObject: function(target, prototypeObject) {
                  for (var singlePrototype in prototypeObject) {
                        if (!target.hasOwnProperty(singlePrototype)) {
                              target[singlePrototype] = prototypeObject[singlePrototype];
                        }
                  }
                  return target;
            },
            addfavorite: function($url, $title) {
                  try {
                        window.external.addFavorite($url, $title);
                  } catch (e) {
                        try {
                              window.sidebar.addPanel($title, $url, "");
                        } catch (e) {
                              alert("sorry your browser does not support");
                        }
                  }
            },
            sethome: function(obj, vrl) {
                  try {
                        obj.style.behavior = 'url(#default#homepage)';
                        obj.setHomePage(vrl);
                  } catch (e) {
                        if (window.netscape) {
                              try {
                                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                              } catch (e) {
                                    alert("Your Firefox security limit your clipboard operation, please open 'about:config' Setting signed.applets.codebase_principal_support'to true' then try again!");
                              }
                              var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                              prefs.setCharPref('browser.startup.homepage', vrl);
                        }
                  }
            },
            //********************************* Checking *********************************//
            browser: function() {
                  var browserName = navigator.userAgent.toLowerCase();
                  var ex;
                  if (/msie/i.test(browserName) && !/opera/.test(browserName)) ex = "ie";
                  else if (/firefox/i.test(browserName)) ex = "firefox";
                  else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) ex = "chrome";
                  else if (/opera/i.test(browserName)) ex = "opera";
                  else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) ex = "safari";
                  else ex = "unknow";
                  return ex;
            },
            isPC: function() {
                  var userAgentInfo = navigator.userAgent;
                  var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
                  var flag = true;
                  for (var v = 0; v < Agents.length; v++) {
                        if (userAgentInfo.indexOf(Agents[v]) > 0) {
                              flag = false;
                              break;
                        }
                  }
                  return flag;
            },
            hasWebgl: function() {
                  try {
                        return !!window.WebGLRenderingContext && !! document.createElement('canvas').getContext('experimental-webgl');
                  } catch (e) {
                        return false;
                  }
            },
            hasGetUserMedia: function() {
                  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
            },
            //********************************* Cookies *********************************//
            setCookies: function(name, value, iDay) {
                  if (iDay !== false) {
                        var oDate = new Date();
                        oDate.setDate(oDate.getDate() + iDay);
                        document.cookie = name + '=' + value + ';expires=' + oDate;
                  } else {
                        document.cookie = name + '=' + value;
                  }
            },
            getCookies: function(name) {
                  var arr = document.cookie.split('; ');
                  var i = 0;
                  for (i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('=');
                        if (arr2[0] == name) {
                              return arr2[1];
                        }
                  }
                  return '';
            },
            removeCookies: function(name) {
                  this.setCookies(name, 'a', -1);
            },
            //********************************* LOG *********************************//
            log: function(what, color) {
                  // find output div
                  var elemLog = document.getElementById('otcomlog');
                  // not found -> create one
                  if (elemLog === null) {
                        elemLog = document.createElement('div');
                        elemLog.setAttribute('id', 'otcomlog');
                        // stay visible even with body overvlow:hidden
                        elemLog.setAttribute('style', 'position:absolute; top:0px;z-index:9999');
                        document.body.appendChild(elemLog);
                  }
                  if (color) {
                        elemLog.style.color = color;
                  }
                  elemLog.innerHTML = what;
            },
            trace: function() {
                  if (window.console && window.console.log) {
                        var arg = arguments;
                        if (typeof arguments[0] == 'string') {
                              if (arguments[0].indexOf('+') == 0) {
                                    var n = parseInt(arguments[0]);
                                    if (ppo.once < n) {
                                          delete arg[0];
                                          console.log(arg);
                                          ppo.once++;
                                    }
                              } else {
                                    console.log(arg);
                              }
                        } else {
                              console.log(arg);
                        }
                  }
            },
            //********************************* Component *********************************//
            button: function($id, $funOrUrl) {
                  if (typeof $funOrUrl == 'string') {
                        this.o($id).onclick = function() {
                              window.open($funOrUrl)
                        }
                  } else if (typeof $funOrUrl == 'function') {
                        this.o($id).onclick = $funOrUrl;
                  }
            },
            text: function($divid, $text, $size, $color, $id) {
                  var color = $color ? $color : '#000000';
                  var size = $size ? $size : '12';
                  var newElement = document.createElement('p');
                  newElement.id = $id;
                  newElement.style.color = color;
                  newElement.style.fontsize = size;
                  newElement.innerHTML = $text;
                  this.o($divid).appendChild(newElement);
            }
      }
      //********************************* HashTable *********************************//

            function HashTable() {
                  this.hash = new Object();
                  this.length = 0;
            }
      HashTable.prototype.add = function(key, value) {
            if (typeof key === "string") {
                  this.hash[key] = value;
            } else {
                  if (key._hashtableUniqueId == undefined) key._hashtableUniqueId = UniqueId.prototype.genarateId();
                  this.hash[key._hashtableUniqueId] = value;
            }
            this.length++;
      };
      HashTable.prototype.get = function(key) {
            if (typeof key === "string") {
                  return this.hash[key];
            } else {
                  if (key._hashtableUniqueId == undefined) {
                        return undefined;
                  }
                  return this.hash[key._hashtableUniqueId];
            }
      };
      HashTable.prototype.deleteKey = function(key) {
            if (typeof key === "string") {
                  if (this.get(key)) {
                        this.length--;
                        delete this.hash[key];
                  }
            } else {
                  if (key._hashtableUniqueId != undefined) {
                        if (this.get(key._hashtableUniqueId)) {
                              this.length--;
                              delete this.hash[key._hashtableUniqueId];
                        }
                  }
            }
      }

      function UniqueId() {}
      UniqueId.prototype._id = 0;
      UniqueId.prototype.genarateId = function() {
            return (++UniqueId.prototype._id).toString();
      };
      ppo.HashTable = HashTable;
      ppo.once = 0;
      window.ppo = ppo;
})(window, document);