<?php
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $url = rawurlencode("$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
    $signPackage = json_decode(file_get_contents("http://h5.180network.com.cn/wx/api/jssdk/getSignPackage?path=$url"),true);
    //$data = json_decode($_POST['user_info']);//授权调用代码，不授权不需调用
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>微信js sdk测试</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">
  <style type="text/css">
  body{margin: 0px;padding: 0px;line-height: 1.6;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        background-color: #f1f0f6;
  }
  ul,li,p,h1,h2,h3,h4,h5,h6{margin: 0px;padding: 0px;}
  .page{max-width: 640px;min-width: 320px;width: 100%;margin: 0 auto;
  	padding: 0px 10px;
  	box-sizing: border-box;
  }
  .page .title{padding-top: 16px;
        font-size: 20px;font-weight: bold;
        color: #3e3e3e;position: relative;
        text-align: center;

   }
   .page p{margin-bottom: 10px;line-height: 21px;font-size: 14px;}
  .demoUl{overflow: hidden;margin: 10px 0px;}
  .demoUl li{height: 35px;line-height: 35px;margin-bottom: 10px;width: 100%;
        text-align: center;color: #fff;background: #04be02;}
   img{max-width: 100%;height: auto;}

  </style>
</head>
<body>
	<div class="page">
	    <h3 class="title">分享接口</h3>
	    <ul class="demoUl">
	        <li class="checkJsApi" id="checkJsApi">checkJSApi</li>
	        <li id="onMenuShareAppMessage">分享给朋友</li>
	        <li id="onMenuShareTimeline">分享到朋友圈</li>
	    </ul>

	    <h3 class="title">图片接口</h3>
	    <ul class="demoUl">
	        <li id="chooseImage">选择照片</li>
	        <li id="previewImage">预览图片</li>
	        <li id="uploadImage">上传图片</li>
	        <li id="downloadImage">下载图片</li>
	    </ul>

	    <h3 class="title">语音接口</h3>
	    <ul class="demoUl">
	    	<li id="startRecord">开始录音</li>
	    	<li id="stopRecord">停止录音</li>
	    	<li id="playVoice">播放语音</li>
	    	<li id="pauseVoice">暂停播放语音</li>
	    	<li id="stopVoice">停止播放</li>
	    	<li id="uploadVoice">上传语音</li>
	    	<li id="downloadVoice">下载语音</li>

	    </ul>

	    <h3 class="title">智能接口</h3>
	    <ul class="demoUl">
	    	<li id="translateVoice">识别语音</li>
	    </ul>


	    <h3 class="title">设备接口</h3>
	    <ul class="demoUl">
	    	<li class="" id="getNetworkType">获取当前的网络状况</li>
	    </ul>

	    <h3 class="title">地理位置接口</h3>
	    <ul class="demoUl">
	    	<li id="getLocation">获取当前地理位置接口</li>
	    	<li id="openLocation">查看地理位置</li>
	    </ul>	
	    
	    <h3 class="title">微信原生接口</h3>
	    <ul class="demoUl">
	    	<li id="scanQRCode">扫一扫接口</li>
	    	<li id="scanQRCode1">扫一扫直接返回结果</li>
	    </ul>	



	    <div id="imageList"></div>
	    <P>1.在调用checkjsapi，chooseImage接口时提示，errmsg：function not exist;是因为版本没有升级</P>
	    <P>2.在版本没有升级到6.0.2,分享到朋友圈，分享给好友的接口可用；</P>
    </div>
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
  /*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 如有问题请通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
  wx.config({
    debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
      'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
    ]
  });
  wx.error(function(res){
    alert(res.errMsg);
  })
  wx.ready(function () {
    // 在这里调用 API
    document.querySelector('#checkJsApi').onclick = function () {
      wx.checkJsApi({
        jsApiList: [
          'getNetworkType',
          'previewImage',
          'onMenuShareTimeline',
          'chooseImage',
        ],
        success: function (res) {
          alert(JSON.stringify(res));
        }
      });
    };

    
    //微信分享接口必须用微信认证
    // 2. 分享接口
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    document.querySelector('#onMenuShareAppMessage').onclick = function () {
        wx.onMenuShareAppMessage({
          title: '微信测试Demo',
          desc: '微信测试Demodesc',
          link: 'http://h5.180network.com.cn/TYdemo/weChatJsApi.php',
          imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
          trigger: function (res) {
            alert('用户点击发送给朋友');
          },
          success: function (res) {
            alert('已分享');
          },
          cancel: function (res) {
            alert('已取消');
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
        alert('已注册获取“发送给朋友”状态事件');
    };

     // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    document.querySelector('#onMenuShareTimeline').onclick = function () {
        wx.onMenuShareTimeline({
          title: '微信测试Demo',
          link: 'http://h5.180network.com.cn/TYdemo/weChatJsApi.php',
          imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
          trigger: function (res) {
            alert('用户点击分享到朋友圈');
          },
          success: function (res) {
            alert('已分享');
          },
          cancel: function (res) {
            alert('已取消');
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
        alert('已注册获取“分享到朋友圈”状态事件');
    };


     // 5 图片接口
    // 5.1 拍照、本地选图
    var images = {
        localId: [],
         serverId: []
    };
    document.querySelector('#chooseImage').onclick = function () {
         wx.chooseImage({
	         success: function (res) {
	                images.localId = res.localIds;
	                var image = document.createElement("img");
	                image.src = res.localIds;
	                document.querySelector("#imageList").appendChild(image);
	         }
         });
         
    }

    document.querySelector("#previewImage").onclick = function(){
      wx.previewImage({
        current: "http://img5.douban.com/view/photo/photo/public/p1353993776.jpg",
        urls :  [
                  "http://img3.douban.com/view/photo/photo/public/p2152117150.jpg",
                  "http://img3.douban.com/view/photo/photo/public/p2152117150.jpg"
        ]
      })
    }

  document.querySelector("#uploadImage").onclick = function(){
  	if(images.localId.length <= 0){
  		alert("请选择照片");
  		return false;
  	}
  	var i = 0, len = images.localId.length;
  	function upload(){
  		wx.uploadImage({
	  		localId: images.localId[i],
	  		isShowProgressTips:1,
	  		success : function(res){
		  			i++;
		  			images.serverId.push(res.serverId);
		  			if(i<len){
		  				upload();
		  			}
	  		},
	  		fail: function(res){
	  			alert(JSON.stringify(res));
	  		}
  		})	
  	}
  	upload();
  };

  document.querySelector("#downloadImage").onclick = function(){
  	if(images.serverId.length<=0){
  		alert("服务器端暂无照片");
  		return false;	
  	}
  	var i = 0,len = images.serverId.length;
  	alert(len);
  	function down(){
  		wx.downloadImage({
  			serverId: images.serverId[i],
  			isShowProgressTips: 1,
  			success: function(res){
          alert(JSON.stringify(res))
  				i++;
  				alert(res.localId);
  				if(i<len){
  					down();
  				}
  			}
  		})
  	}
  	down();
  }

  //语音接口
  var voice = {
  	localId: [],
  	serverId: []
  }
  //开始录音
  document.querySelector("#startRecord").onclick = function(){
  	wx.startRecord({
  		cancel: function(){
  			alert("用户取消了授权");
  		}
  	});
  }

  //停止录音
  document.querySelector("#stopRecord").onclick = function(){
  	wx.stopRecord({
  		success: function(res){
  			var localId = res.localId;
  			voice.localId = localId;
  		}
  	})
  }
  //播放音频
  document.querySelector("#playVoice").onclick = function(){
    alert(voice.localId)
  	if(voice.localId.length <= 0){
  		alert("请先秀一段");
  		return false;
  	}
  	wx.playVoice({
  		localId: voice.localId
  	})
  }
  //暂停播放
  document.querySelector("#pauseVoice").onclick = function(){
  	wx.pauseVoice({
  		localId: voice.localId
  	})
  }
  
  //停止播放
  document.querySelector("#stopVoice").onclick = function(){
  	wx.stopVoice({
  		localId: voice.localId
  	})
  }

  //上传语音接口
  document.querySelector("#uploadVoice").onclick = function(){
  	if(voice.localId.length<=0){
  		alert("你还没录音呢！")
  		return false;
  	}
  	wx.uploadVoice({
  		localId: voice.localId,
  		isShowProgressTips: 1,
  		success:function(res){
  			voice.serverId = res.serverId;
        alert("录音长传完成"+voice.serverId);
  		}
  	})
  }

  //下载语音接口
  document.querySelector("#downloadVoice").onclick = function(){
  	if(voice.serverId.length<=0){
  		alert("你还没传语音呢！");
  		return false;
  	}
  	wx.downloadVoice({
  		serverId: voice.serverId,
  		success: function(res){

  		}
  	})
  }
  //智能接口
  //识别音频并返回识别结果接口
  document.querySelector("#translateVoice").onclick = function(){
  	if(voice.serverId.length<= 0){
  		alert("请先秀一段");
  		return false;
  	}
  	wx.translateVoice({
  		localId: voice.localId,
  		isShowProgressTips: 1,
  		success: function(res){
  			alert(res.translateResult);
  		}
  	})
  }


  //获取设备信息
  //获取网络的状态接口
  document.querySelector("#getNetworkType").onclick = function(){
  	wx.getNetworkType({
  		success: function(res){
  			var network = res.NetworkType;
  			alert(network);
  		}
  	})
  }
  var addr = {
    latitude: '',
    longitude: '',

  };
  //地理位置接口
  //获取地理位置
  document.querySelector("#getLocation").onclick = function(){
  	wx.getLocation({
  		timestamp: 0,
  		nonceStr: "",
  		addrSign: "",
  		success: function(res){
  			var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        addr.latitude = latitude;
        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        addr.longitude = longitude;
        var speed = res.speed; // 速度，以米/每秒计
      	var accuracy = res.accuracy; // 位置精度
  		},
  		cancel: function(){
  			alert("用户拒绝授权获取地理位置");
  		}
  	})
  }
  //查看地理位置
  document.querySelector("#openLocation").onclick = function(){
  	wx.openLocation({
  		latitude: 39.99569,
      longitude: 116.4736,
      name: "望京soho",
      address: "北京朝阳区望京",
      scale: 14,
      infoUrl: "http://game.180china.com"
    })

  }

  //微信原生接口
  //扫一扫 返回微信处理的结果
  document.querySelector("#scanQRCode").onclick = function(){
  	wx.scanQRCode({
  		desc: 'scanQRCode desc'
  	})
  }

  //直接返回结果
  document.querySelector("#scanQRCode1").onclick = function(){
  	wx.scanQRCode({
  		desc: 'scanQRCode desc',
  		needResult: 1,
  		scanType:[],
  		success: function(res){
  			alert(res.resultStr);
  		}

  	})
  }

  
});


</script>
</html>
