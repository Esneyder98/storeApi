const express = require('express');
const storeRouter = require('./storeRouter.js');


function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1",router); 
  router.use('/store', storeRouter);
}

module.exports = routerApi;