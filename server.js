const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaJSON = require('koa-json');
const serve = require('koa-static');
const dotenv = require('dotenv');
const { createReadStream } = require('fs');
const path = require('path');

dotenv.config();

const server = new Koa();
const router = new KoaRouter();

server.use(KoaJSON());
server.use(serve(__dirname + '/client/build/'));

router.get('/api/item', (ctx) => {
  ctx.body = {
    itemName: "Backend Item Name",
    itemPrice: "9.99",
    itemCurrency: "USD"
  }
  return;
});

router.get('*', (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream(path.join(__dirname + '/client/build/index.html'));
  return;
});

server.use(router.allowedMethods());
server.use(router.routes());

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`🚀 Ready on port http://localhost:${port}`);
});