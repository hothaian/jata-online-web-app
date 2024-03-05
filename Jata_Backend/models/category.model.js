module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        tableName: 'Category'
      });
  
    return Category;
  };
  