const { DataTypes } = require("sequelize"); // Import DataTypes instead of Sequelize
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const SellPost = sequelize.define("SellPost", {
      sellpost_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      item_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Unisex'),
        allowNull: true
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: true
      },
      picUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      condition: {
        type: DataTypes.ENUM('New', 'Used'),
        allowNull: true
      }
    },{
      tableName: 'sellpost'
     
    });

    // SellPost.belongsTo(sequelize.models.User, {
    //   foreignKey: 'seller_id',
    //   as: 'seller'
    // });
   
  
    return SellPost;
  };
  