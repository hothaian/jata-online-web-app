const dbConfig = require("../config/db.config.js");
const UserModel = require("./user.model.js");
const SellPostModel = require("./sellpost.model.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.User = require("./user.model.js")(sequelize, Sequelize);
db.SellPost = require("./sellpost.model.js")(sequelize, Sequelize);
db.Address = require("./address.model.js")(sequelize, Sequelize);
db.Category = require("./category.model.js")(sequelize, Sequelize);
db.Order = require("./order.model.js")(sequelize, Sequelize);
db.Comment = require("./comment.model.js")(sequelize, Sequelize);
db.OrderedItem = require("./orderedItem.model.js")(sequelize, Sequelize);


const { User, SellPost, Address, Category, Order, Comment, OrderedItem } = sequelize.models;
User.hasMany(SellPost, { foreignKey: "seller_id", as: "sellPosts" });
User.hasMany(Address, { foreignKey: "user_id", as: "addresses" });


Address.belongsTo(User, { foreignKey: "user_id", as: "user" });
SellPost.belongsTo(User, { foreignKey: "seller_id", as: "seller" });

Category.belongsToMany(SellPost, { through: 'sellpostcategory',as:'sellposts' ,foreignKey: 'category_id' });

SellPost.belongsToMany(Category, { through: 'sellpostcategory', as:'categories', foreignKey: 'sellpost_id' });
SellPost.hasMany(Comment, { foreignKey: "sellpost_id", as: "comments" });

Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });



Order.belongsTo(User, { foreignKey: "buyer_id", as: "buyer"} );
Order.belongsTo(Address, { foreignKey: "shipping_address_id", as: "shipping_address"} );
Order.hasMany(OrderedItem, { foreignKey: "order_id", as: "items" })
OrderedItem.belongsTo(SellPost, { foreignKey: "sellpost_id", as: "sellpost" });

db.Sequelize = Sequelize;
db.sequelize = sequelize; 







module.exports = db;
