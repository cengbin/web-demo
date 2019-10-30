<?php
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $url = rawurlencode("$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
    $signPackage = json_decode(file_get_contents("http://h5.180network.com.cn/wx/api/jssdk/getSignPackage?path=$url"),true);
    //$data = json_decode($_POST['user_info']);//授权调用代码，不授权不需调用
?>
<!DOCTYPE html>
<meta charset="utf-8" /> 
<style type="text/css">
    body{margin: 0px;padding: 0px;line-height: 1.6;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        background-color: #f1f0f6;
    }
    .demoUl{overflow: hidden;margin: 5px 10px;}
    .demoUl li{height: 80px;line-height: 50px;margin-top: 30px;width: 100%;
        text-align: center;color: #fff;background: #04be02;font-size: 40px;}
</style>
<html>
<body>
    <ul class="demoUl">
        <li id="translateVoice">识别语音</li>
    </ul>
</body>
</html>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript"></script>
<script>
    wx.config({
        debug: false,
        appId: '<?php echo $signPackage["appId"];?>',
        timestamp: <?php echo $signPackage["timestamp"];?>,
        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
        signature: '<?php echo $signPackage["signature"];?>',
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'translateVoice'
        ]
    });

    var sharePath="http://h5.180network.com.cn/TYdemo/translateVoice.php";
    
    wx.ready(function(){



        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: '微信语音识别', // 分享标题
            link: sharePath, // 分享链接
            imgUrl: 'http://h5.180network.com.cn/rjzf/img/share.jpg', // 分享图标
            success: function () {
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: '微信语音识别', // 分享标题
            desc: '录音与识别', // 分享描述
            link: sharePath, // 分享链接
            imgUrl: 'http://h5.180network.com.cn/rjzf/img/share.jpg', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });


        //语音接口
        var voice = {localId: [],serverId: []};

        
        document.querySelector("#translateVoice").onclick = function()
        {
            //开始录音
            wx.startRecord();
            setTimeout(stopAndPlayVoice,10000);
            changeTime();
        }
        function stopAndPlayVoice()
        {
            //停止录音
            wx.stopRecord({
                success: function (res) {
                    var localId = res.localId;
                    voice.localId = localId;

                    translateVoice();
                    // 播放
                    wx.playVoice({localId: voice.localId});
                }
            });
        }
        //识别音频
        function translateVoice()
        {
            wx.translateVoice({
                localId: voice.localId,
                isShowProgressTips: 1,
                success: function(res)
                {
                    document.getElementById("translateVoice").innerHTML=res.translateResult;
                    _isEnd=true;
                }
            });

            changeHeight();
        }
    });






var _isEnd=false;
var _h=80;
function changeHeight()
{
    if(_isEnd)return;
    _h+=2;
    document.getElementById("translateVoice").style.height=_h+"px";
    setTimeout("changeHeight()",30);
}


var _t=10;
function changeTime()
{
    _t--;
    if(_t>=0){
        document.getElementById("translateVoice").innerHTML=_t;
        setTimeout("changeTime()",1000);  
    }else{
        document.getElementById("translateVoice").innerHTML="语音识别中...";
    }

}


</script>