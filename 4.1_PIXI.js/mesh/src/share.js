var shareData = [];
var url = 'https://zhuan.58.com/zz/transfer/jsticket?url=http%3A%2F%2Fj2.58cdn.com.cn%2Fzhuanzhuan%2Fzzactivity%2Fzhuanzhuan%2Findex.html';
$.getJSON(url, function (res) {
    shareData = res
    console.log('shareData:',JSON.stringify(shareData));
    wx.config({
        debug: false,
        appId: shareData['appId'],
        timestamp: shareData['timestamp'],
        nonceStr: shareData['nonceStr'],
        signature: shareData['signature'],
        jsApiList: [
            // 所有要调用的 API 都要加到这个列表中
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo"
        ]
    });
    wx.ready(wxShare);
});

var link="http://lab.180china.com/zhuanzhuan/index.html";
var proLink="http://lab.180china.com/zhuanzhuan/"
var title="我的专属手机发布会，速度入场！";//分享给朋友和朋友圈的描述和头图一行的文字
var desc="没错，他来了。这场发布会，专门为你而开。";
var friendOption={
    title:title, // 分享标题
    desc: desc, // 分享描述
    link: link, // 分享链接
    imgUrl: proLink+"assets/share.png", // 分享图标
    type: 'link', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
        // 用户确认分享后执行的回调函数
        window["_hmt"].push(['_trackEvent', 'button', 'shareFriendSuccess']);
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
}
var timeLineOption={
    title:desc, // 分享标题
    link: link, // 分享链接
    imgUrl: proLink+"assets/share.png", // 分享图标
    success: function () {
        // 用户确认分享后执行的回调函数
        window["_hmt"].push(['_trackEvent', 'button', 'shareTimelineSuccess']);
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
}

var wxShare=function(){
    console.log('修改分享内容',window['friendOption'],window['timeLineOption']);
    //分享给朋友
    wx.onMenuShareAppMessage(friendOption);
    //分享到朋友圈
    wx.onMenuShareTimeline(timeLineOption);
}