module.exports = app => {
    const customController = require("../controllers/custom.controller.js");
  
    var router = require("express").Router();
  
    router.get('/:userId/:sellpostId', customController.customFunction);


    app.use('/api/custom', router);
  };