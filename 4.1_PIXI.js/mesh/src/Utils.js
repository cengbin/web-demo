GAME.Utils=GAME.Utils||{};
GAME.Utils.inherit = function(ctor, superCtor)
{
    ctor.superClass = superCtor;
    ctor.prototype = Object.create(superCtor.prototype);
    ctor.prototype.constructor = ctor;
};
GAME.Utils.extend = function(origin, add)
{
    // Don't do anything if add isn't an object
    if (!add || typeof add !== 'object')
        return origin;

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--)
    {
        origin[keys[i]] = add[keys[i]];
    }
    return origin;
};
GAME.Utils.isAndroid=function()
{
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "SymbianOS", "Windows Phone");
    var flag = false;
    for (var v = 0; v < Agents.length; v++)
    {
        if (userAgentInfo.indexOf(Agents[v]) > 0)
        {
            flag = true;
            break;
        }
    }
    return flag;
}

GAME.Utils.isM2=function()
{
    var userAgentInfo = navigator.userAgent;
    var flag = false;
    if (userAgentInfo.indexOf("m2") > 0)
    {
        flag = true;
    }
    return flag;
}
/*
 pc锁屏
 */
GAME.Utils.Mobile=function (){
    var userAgentInfo = navigator.userAgent;
    if (userAgentInfo.indexOf("Mobile")>0)
    {
        //document.getElementById("viewport").content="width=device-width,user-scalable=0";
        return true;
    }
    return false;
}
GAME.isMobile=GAME.Utils.Mobile()

/*
 禁止pc访问
 */

GAME.Utils.banPc=function(){

        GAME.isbanPc=true;
        var jq = document.createElement("script");
        jq.src = "libs/jquery-3.1.1.min.js";
        document.body.appendChild(jq);
        jq.onload=function(){

            var code = document.createElement("script");
            code.src = "libs/jquery.qrcode.min.js";
            document.body.appendChild(code);
            code.onload=function(){

                var div = document.createElement("div");
                div.style.position = "absolute";
                div.style.width = "100%";
                div.style.height = "100%";
                div.style.background = "#000000";
                div.style.zIndex = "9999999999";

                var co = document.createElement("div");
                co.id = "code";
                co.style.position = "absolute";
                co.style.left = "50%";
                co.style.top = "50%";
                co.style.marginLeft = "-100px";
                co.style.marginTop = "-100px";
                div.appendChild(co)
                document.body.appendChild(div);

                $("#code").empty();
                $("#code").qrcode({
                    render: "canvas",
                    width: 200,
                    height:200,
                    text: GAME.location
                });
                var txt = document.createElement("p");
                txt.id = "codetxt";
                div.appendChild(txt);
                $("#codetxt").html("请用手机微信浏览");
                $("#codetxt").css({
                    "position":"absolute",
                    "top":"50%",
                    width:"100%",
                    "margin-top":"122px",
                    "color":"#ffffff",
                    "font-size":"40px",
                    "text-align":"center",
                });
            }
        }
}
GAME.Utils.isWechat=function()
{
    var userAgentInfo = navigator.userAgent;
    //alert(userAgentInfo)
    var flag = false;
    if (userAgentInfo.indexOf("MicroMessenger") > 0)
    {
        flag = true;
        if(userAgentInfo.indexOf("Version") > 0 &&userAgentInfo.indexOf("iPhone") > 0)
        {
            flag = false;
        }

    }
  return flag;
}
