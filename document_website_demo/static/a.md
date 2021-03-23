# 多点文档特工队

<video src="https://github.com/siyuanqiao/html5-video-player/blob/master/example/movie.mp4" controls="controls" width="500" height="300">您的浏览器不支持播放该视频！</video>

![](http://localhost:8081/static/cx.jpg)

```
// 我是注释文本
{
  url: '',
  method: 'GET',
  success (res) {
    console.log(res)
    document.getElementById('content').innerHTML = window.marked(res, {
      // pedantic: true,
      langPrefix: 'language-cd',
      highlight: function (code, lang, callback) {
        return _this.hljs.highlightAuto(code).value;
      }
    })
  }
}
```

 `bbbb,console.log(b)`

  |a|b|
 |---|---|
 |a|b|

 [dmall](https://i.damll.com)

 > 注视

## 第二期

主题：微前端

1. 前端工程化的历史（石轶舟/陈思言）
	* ANT、YUI Compressor、Google Closure
	* NodeJS
	* Grunt、Gulp、Webpack详解
	* ...
2. 市面上现有的微前端方案/框架（贵福/鸿武）
	* 对比优劣，组件级别的微前端方案如何弄
	* 不同版本的库如何解决方案
	* 资源加载方案
	* ...
3. 多点微前端方案（周雄/曾彬）
	* Kayak
	* sea.js 详解，改造了哪些？
	* 目前的问题
	* ...

## 第一期

目标：以一个新人身份为着陆点，通过不同的技术开发项目整理出快速上手指南。

* Web
    * pc cabin2.0 (贵福)
    * pc cabinx(维彬)
    * moble(周雄)
    * Dshop（石轶舟)
* 小程序（陈思言)
* ReactNative（普鸿武)
* 技术沉淀（所有人)
	* 工程化

