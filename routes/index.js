const express = require('express');
const storeRouter = require('./storeRouter.js');
const userRouter = require('./userRouter');

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1",router); 
  router.use('/',userRouter);
  router.use('/store', storeRouter);
}

module.exports = routerApi;