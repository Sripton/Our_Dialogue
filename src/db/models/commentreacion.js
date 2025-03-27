"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commentreaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Comment }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(Comment, { foreignKey: "comment_id" });
    }
  }
  Commentreaction.init(
    {
      user_id: DataTypes.INTEGER,
      comment_id: DataTypes.INTEGER,
      reaction_type: DataTypes.ENUM("like", "dislike"),
    },
    {
      sequelize,
      modelName: "Commentreaction",
    }
  );
  return Commentreaction;
};
