const db = require('../models/connection'); // Adjust the path based on your file structure

const findTotalOrderByCategory = (req, res) => {
  db.sequelize.query(
    `SELECT c.category_name, COUNT(o.order_id) AS order_count
    FROM jatadata.category c
    JOIN jatadata.sellpostcategory sc ON c.category_id = sc.category_id
    JOIN jatadata.ordereditem o ON sc.sellpost_id = o.sellpost_id
    GROUP BY c.category_name;`,
    { type: db.sequelize.QueryTypes.SELECT }
  )
  .then(data => {
    res.status(200).json({
      message: 'Orders grouped by category retrieved successfully',
      data: data
    });
  })
  .catch(err => {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving orders grouped by category',
      error: err.message
    });
  });
};

const findTopBuyer = (req, res) => {
  db.sequelize.query(
    `SELECT
    u.username AS buyer_username,
    o.buyer_id,
    SUM(o.total_price) AS total_spending
    
  FROM
    jatadata.order o
  JOIN
    jatadata.user u ON o.buyer_id = u.user_id
  GROUP BY
    o.buyer_id
  ORDER BY
    total_spending DESC
  LIMIT 5;`,
    { type: db.sequelize.QueryTypes.SELECT }
  )
  .then(data => {
    res.status(200).json({
      message: 'Top buyers retrieved successfully',
      data: data
    });
  })
  .catch(err => {
    res.status(500).json({
      status: 'error',
      message: 'Error retrieving top buyers',
      error: err.message
    });
  });
};

module.exports = {
  findTotalOrderByCategory,
  findTopBuyer,
};
