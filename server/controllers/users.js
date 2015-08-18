"use strict";

exports.get = function * getUser(next) {
  this.body = {uid: this.params.yid,
    avatar: "http://p7.qhimg.com/d/inn/2edf2228/aqrj/weishi_60.png"
  };
  yield next;
};
