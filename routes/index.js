const express = require('express');
const storeRouter = require('./storeRouter.js');
const userRouter = require('./userRouter');
const articleRouter = require('./articleRouter')
function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1",router); 
  router.use('/',userRouter);
  router.use('/store', storeRouter);
  router.use('/article', articleRouter);
}

module.exports = routerApi;