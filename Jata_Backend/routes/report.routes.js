module.exports = (app) => {
  const report = require("../controllers/report.controller");

  var router = require("express").Router();


  router.get("/order-by-category", report.findTotalOrderByCategory);
  router.get("/top-buyer", report.findTopBuyer);
  app.use("/api/report", router);
};