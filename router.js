const debug = require('debug')('server:router');
const router = require('koa-router')();

const route = router.use('*', recv)
  .get('home', '/', home)
  .get('about', '/about', about);

/**
 * Before routing
 * @param {*} ctx
 * @param {*} next
 */
async function recv(ctx, next) {
  debug(`Request for ${ctx.path} received.`);
  await next();
}

/**
 * Handle home
 * @param {*} ctx
 */
async function home(ctx) {
  ctx.body = 'Hello World';
}

/**
 * Handle about
 * @param {*} ctx
 */
async function about(ctx) {
  ctx.body = 'This is a simple http-server powered by koa.js';
}

module.exports = {
  route,
};
