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
    .demoUl li{height: 100px;line-height: 50px;margin-top: 30px;width: 100%;
        text-align: center;color: #fff;background: #04be02;font-size: 40px;}
</style>
<html>
<body>
    <ul class="demoUl">
        <li id="startRecord">开始录音</li>
        <li id="stopRecord">停止录音</li>
        <li id="uploadVoice">上传语音</li>
        <li id="downloadVoice">下载语音并播放</li>
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
            'uploadVoice',
            'downloadVoice',
            'translateVoice'
        ]
    });

    var sharePath="http://h5.180network.com.cn/TYdemo/uploadVoice1.php";
    
    wx.ready(function(){


        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: '微信语音Demo', // 分享标题
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
            title: '微信语音Demo', // 分享标题
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

        //开始录音
        document.querySelector("#startRecord").onclick = function(){
            wx.startRecord();
        }

        //停止录音
        document.querySelector("#stopRecord").onclick = function(){
            wx.stopRecord({
                success: function (res) {
                    var localId = res.localId;
                    alert(localId);
                    voice.localId = localId;
                }
            });
        }

        wx.onVoiceRecordEnd({
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
                var localId = res.localId; 
                alert(localId);
                voice.localId = localId;
            }
        });

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
                    alert("录音上传完成:"+voice.serverId);
                }
            });
        }

        //下载语音接口
        document.querySelector("#downloadVoice").onclick = function(){
            wx.downloadVoice({
                serverId: voice.serverId, 
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                    var localId = res.localId; // 返回音频的本地ID
                    alert("下载完成并播放:"+localId);
                    // 播放
                    wx.playVoice({localId: localId});
                }
            });
        }
        //识别音频并返回识别结果接口
        document.querySelector("#translateVoice").onclick = function(){
            if(voice.localId.length<=0){
                alert("你还没录音呢！")
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

    });
</script>