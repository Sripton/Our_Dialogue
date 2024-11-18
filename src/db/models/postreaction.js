"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Postreaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(Post, { foreignKey: "post_id" });
    }
  }
  Postreaction.init(
    {
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
      reaction_type: DataTypes.ENUM("like", "dislike"),
    },
    {
      sequelize,
      modelName: "Postreaction",
    }
  );
  return Postreaction;
};
