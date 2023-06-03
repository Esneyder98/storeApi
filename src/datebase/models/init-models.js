let DataTypes = require("sequelize").DataTypes;
let _article = require("./article");
let _store = require("./store");
let _usuario = require("./usuario");

function initModels(sequelize) {
  let article = _article(sequelize, DataTypes);
  let store = _store(sequelize, DataTypes);
  let usuario = _usuario(sequelize, DataTypes);

  article.belongsTo(store, { as: "store", foreignKey: "store_id"});
  store.hasMany(article, { as: "articles", foreignKey: "store_id"});

  return {
    article,
    store,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
