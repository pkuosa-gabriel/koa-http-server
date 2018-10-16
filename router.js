const debug = require('debug')('server:router');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const router = require('koa-router')();

const FILE_SIZE_LIMIT = 5 * 1024;
const route = router.use('*', recv)
  .get('home', '/', home)
  .get('about', '/about', about)
  .get('github', '/github', github)
  .get('not-found', '*', fallback)
  .post('upload-text', '/upload/text', uploadText)
  .post('upload-file', '/upload/file', uploadFile);

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
  await ctx.render('index');
}

/**
 * Handle about
 * @param {*} ctx
 */
async function about(ctx) {
  ctx.body = 'This is a simple http-server powered by koa.js';
}


/**
 * Redirect to github
 * @param {*} ctx
 */
async function github(ctx) {
  ctx.redirect('https://github.com/pkuosa-gabriel/koa-http-server');
}

/**
 * Fallback for routes not found
 * @param {*} ctx
 */
async function fallback(ctx) {
  debug(`No route found for ${ctx.path}`);
  ctx.status = 404;
  ctx.body = 'Maybe you have entered a wrong path';
}

/**
 * Handle text upload
 * @param {*} ctx
 */
async function uploadText(ctx) {
  const text = ctx.request.body.textLayout;
  debug(`Receive text: ${text}`);
  ctx.body = `You've sent the text: ${text}`;
}

/**
 * Handle file upload
 * @param {*} ctx
 */
async function uploadFile(ctx) {
  if (ctx.request.files === undefined) {
    ctx.status = 406;
    ctx.body = 'You must upload a file';
    return;
  }
  const file = ctx.request.files.upload;
  const reader = fs.createReadStream(file.path);
  const fileName = file.name;
  const fileSize = file.size;
  if (fileSize > FILE_SIZE_LIMIT) {
    ctx.status = 406;
    ctx.body = 'The file is too large';
    return;
  }
  debug(`Receive file: ${fileName}, size: ${fileSize / 1024} kB`);
  const stream = fs.createWriteStream(path.join(
    __dirname, '/public/' + uuid.v4() + fileName.substr(fileName.lastIndexOf('.'))
  ));
  reader.pipe(stream);
  debug('uploading %s -> %s', file.name, stream.path);
  ctx.body = `You've uploaded the file: ${fileName}`;
}

module.exports = {
  route,
};
