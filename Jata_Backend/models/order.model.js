module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("Order", {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      buyer_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sellpost_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      order_shipping_state: {
        type: Sequelize.ENUM('Pending', 'Shipped', 'Delivered'),
        defaultValue: 'Pending'
      },
      shipping_address_id: {
        type: Sequelize.INTEGER
      }
    },{
        tableName: 'order'
      });
  
    return Order;
  };
  