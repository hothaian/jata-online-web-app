const { DataTypes } = require("sequelize"); 
module.exports = (sequelize) => {
    const  comment = sequelize.define("Comment", {
      comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      sellpost_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }

    },{
      tableName: 'comment'
    });

    return comment;
  };
  