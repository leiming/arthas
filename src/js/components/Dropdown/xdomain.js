/**
 * @fileOverview xdomain.js addFrame, removeIframe
 * @description 用于和游戏内iframe通信，游戏内iframe去遮罩flash，app的弹出框才能遮罩住内部flash。(仅在chrome2x~3x之间有这个
 * 无法覆盖iframe内flash的情况，经发现，360极速浏览器chrome42也有此问题)
 * global U8.xdomain
 *
 * usage:
 *
 * U8.xdomain.addIframe(selector, appName, windowObject)
 * U8.xdomain.removeIframe(selector, appName, windowObject)
 *
 *
 */


//  浏览器嗅探
var Sys = {};
(function getAgent() {
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
      (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1].split('.')[0] :
          (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
            (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

})()

function sendMessage(windowObject, data, name) {
  var message = '';
  if(name) {
    message = name + '||' + data;
  } else {
    message = data;
  }
  if(window.postMessage){
    windowObject.postMessage(message,'*');
  } else {
    windowObject.name = message;
  }
}

var U8 = U8 || {};


U8.xdomain = function($) {
  if(parseInt(Sys.chrome) < 45) {
    var ifr = $('#gameinfo')[0];
    if (ifr) {
      var windowObject = ifr.contentWindow;
      $(window).resize(function(){
        var ifr_offset = $(ifr).offset();
        var iframes = $('iframe:visible').not('#gameinfo');
        $.each(iframes,function(i,n){
          var offset = $(this).offset();
          var iframeId = $(this).attr('id');
          var message = '{ "op": "change", "id": "'+ iframeId + '", "offset": {"left":'+(offset.left-ifr_offset.left)+',"top":'+(offset.top-ifr_offset.top)+'} }';
          sendMessage(windowObject,message,'toolbar');
        });
      });
      $(window).scroll(function(){
        var ifr_offset = $(ifr).offset();
        var iframes = $('iframe:visible').not('#gameinfo');
        $.each(iframes,function(i,n){
          var offset = $(this).offset();
          var iframeId = $(this).attr('id');
          var message = '{ "op": "change", "id": "'+ iframeId + '", "offset": {"left":'+(offset.left-ifr_offset.left)+',"top":'+(offset.top-ifr_offset.top)+'} }';
          sendMessage(windowObject,message,'toolbar');
        });
      });
    }
  }

  var iframeCounter = 0;

  return {
    addIframe : function(selector, name, windowObject){
      if(parseInt(Sys.chrome) < 45) {
        if(!windowObject) {
          var ifr = $('#gameinfo')[0];
          if(!ifr) {
            return false;
          }
          var ifr_offset = $(ifr).offset();
          windowObject = ifr.contentWindow;
        }

        var dropdownObj = $(selector);
        $.each(dropdownObj,function(i, n){
          var self = $(this);
          if (!self.attr('id')) {
            self.attr('id', 'iframe_wan360u8_' + iframeCounter);
            iframeCounter++;
          }
          var offset = self.offset();
          var width = self.width();
          var height = self.height();
          var iframeId = self.attr('id');
          var message = '{ "op": "add", "id": "' + iframeId+ '", "offset": {"left":'+(offset.left-ifr_offset.left)+',"top":'+(offset.top-ifr_offset.top)+'}, "width": "'+ width + '", "height": "' + height + '" }';
          sendMessage(windowObject,message,'toolbar');
        });
      }
    },
    removeIframe : function(selector, name, windowObject){
      if(parseInt(Sys.chrome) < 45) {
        if(!windowObject) {
          var ifr = $('#gameinfo')[0];
          if(!ifr) {
            return false;
          }
          windowObject = ifr.contentWindow;
        }

        var dropdownObj = $(selector);
        $.each(dropdownObj,function(i,n){
          var iframeId = $(this).attr('id');
          if(!iframeId) {
            return true;
          }
          var message = '{ "op": "remove", "id": "' + iframeId + '" }';
          sendMessage(windowObject,message,'toolbar');
          $(this).removeAttr('id');
        });
      }
    }
  };

}(jQuery);

module.exports = U8;

