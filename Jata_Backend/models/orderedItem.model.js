module.exports = (sequelize, Sequelize) => {
    const OrderedItem = sequelize.define("OrderedItem", {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sellpost_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    },{
        tableName: 'ordereditem'
      });
  
    return OrderedItem;
  };
  