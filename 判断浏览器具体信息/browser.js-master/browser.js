/*=============================================================================
#     FileName: browser.js
#         Desc: 判断浏览器和操作系统
#       Author: Zhiya Zang
#        Email: zangzhiya@gmail.com
#     HomePage: http://www.simpleapples.com
#      Version: 0.0.1
#   LastChange: 2012-12-11 17:17:45
#      History:
=============================================================================*/
var browser = function () {
    var ua = navigator.userAgent.toLowerCase(),
        opera = window.opera,
        result = {
            engine: 0,
            system: 0,
            browser: 0,
            version: 0
        }, 
        systemList = {},
        ieBrowserList = {},
        engineList = {},
        i;
    // 操作系统列表
    systemList = {
        /**
         * 是否是Macintosh
         * @name macintosh
         * @grammar systemList.macintosh => true | false
         */
        macintosh: ua.indexOf('macintosh') > -1,
        /**
         * 是否是Windows
         * @name windows
         * @grammar systemList.windows => true | false
         */
        windows: ua.indexOf('windows') > -1,
        /**
         * 是否是Linux
         * @name linux
         * @grammar systemList.linux => true | false
         */
        linux: ua.indexOf('linux') > -1,
        /**
         * 是否是Android
         * @name android
         * @grammar systemList.android => true | false
         */
        android: ua.indexOf('android') > -1,
        /**
         * 是否是iPad
         * @name ipad
         * @grammar systemList.ipad => true | false
         */
        ipad: ua.indexOf('ipad') > -1,
        /**
         * 是否是iPhone
         * @name iphone
         * @grammar systemList.iphone => true | false
         */
        iphone: ua.indexOf('iphone') > -1
    }
    // IE浏览器列表
    ieBrowserList = {
        /**
         * 是否IE6
         * @name ie6
         * @grammar ieBrowserList.ie6 => true | false
         */
        ie6: !window.XMLHttpRequest || engineList.quirk, // IE6不支持XHR
        /**
         * 是否IE7
         * @name ie7
         * @grammar ieBrowserList.ie7 => true | false
         */
        ie7: ieBrowserList.ie6 && ieBrowserList.ie8,
        /**
         * 是否IE7兼容模式
         * @name ie7Compat
         * @grammar ieBrowserList.ie7Compat => true | false
         */
        ie7Compat: document.documentMode == 7,
        /**
         * 是否IE8
         * @name ie8
         * @grammar ieBrowserList.ie8 => true | false
         */
        ie8: !!document.documentMode,
        /**
         * 是否IE8兼容模式
         * @name ie8Compat
         * @grammar ieBrowserList.ie8Compat => true | false
         */
        ie8Compat: document.documentMode == 8,
        /**
         * 是否IE9
         * @name ie9
         * @grammar ieBrowserList.ie9 => true | false
         */
        ie9: document.documentMode == 9,
    }
    // 浏览器引擎列表
    engineList = {
        /**
         * 检测是否为IE
         * @name ie
         * @grammar engineList.ie => true | false
         */
        //ie: !-[1,], // IE中toString不会将最后一个逗号去掉
        ie: !!window.ActiveXObject,
        /**
         * 检测是否为怪异模式
         * @name quirk
         * @grammar engineList.quirk => true | false
         */
        quirk: document.compatMode == 'BackCompat', 
        /**
         * 检测是否为WebKit
         * @name webkit
         * @grammar engineList.webkit => true | false
         */
        webkit: ua.indexOf(' applewebkit/') > -1,
        /**
         * 检测是否为Opera
         * @name opera
         * @grammar engineList.opera => true | false
         */
        opera: (!!opera && opera.version), 
        /*
         * 检测是否Gecko
         * @name gecko
         * @grammar engineList.gecko => true | false
         */
        gecko: navigator.product == "Gecko" && !engineList.webkit && !engineList.opera,
    };
    // 判断为IE哪个版本
    if (engineList.ie) {
        // 尝试所有IE版本
        for(i in ieBrowserList) {
            if(ieBrowserList[i]) {
                result.engine = "ie";
                result.browser = i;
                result.version = parseInt(ua.match(/msie (\d+)/)[1]);
                getSystem();
                return result;
            } 
        }
    }
    // 判断是否为Webkit
    if (engineList.webkit) {
        if (ua.indexOf('safari') > -1) {
            // 有safari和chrome字段,则认为是chrome
            if (ua.indexOf('chrome') > -1) {
                result.browser = "chrome"; 
                result.version = "latest";
            // 有safari没chrome字段,则认为是safari
            } else {
                result.browser = "safari";
                result.version = parseInt(ua.match(/ applewebkit\/(\d+)/)[1]);
            } 
        } else {
            result.browser = "webkit"; 
            result.version = "unknown";
        }
        result.engine = "webkit";
        getSystem();
        return result;
    }
    // 判断是否为Opera
    if (engineList.opera) {
        result.engine = "opera";
        result.browser = "opera";
        result.version = parseInt(opera.version());
        getSystem();
        return result; 
    }
    // 判断是否为Gecko
    if (engineList.gecko) {
        // 有firefox字段则为firefox
        if(ua.indexOf('firefox') > -1) {
            result.browser = "firefox"; 
            result.version = ua.match(/rv:(\d+)/)[1];
        } else {
            result.browser = "unknown"; 
            result.version = "unknown";
        } 
        result.engine = "gecko";
        getSystem();
        return result;
    }
    /**
     * 获取操作系统
     * @name getSystem
     * @grammar getSystem => void
     */
    function getSystem() {
        var i;
        for (i in systemList) {
            if (systemList[i]) {
                result.system = i; 
            } 
        } 
    }
} ();
