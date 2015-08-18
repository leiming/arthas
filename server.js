"use strict";

var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-static');
var app = koa();
var users = require('./server/controllers/users');

/**
 * Test
 */
app.use(serve('./dist'));

router.get('/', function * index(next) {
  this.redirect('/bundle.html');
  yield next
});

/**
 * 用户信息
 */
router.get('/users/:yid', users.get);

app.use(router.routes());

app.listen(3000);

