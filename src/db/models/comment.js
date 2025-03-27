"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post, Comment, Commentreaction }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(Post, { foreignKey: "post_id" });
      // Связь с родительским комментарием
      this.belongsTo(Comment, { as: "ParentComment", foreignKey: "parent_id" });
      // Связь с дочерними комментариями
      this.hasMany(Comment, { as: "Replies", foreignKey: "parent_id" });
      this.hasMany(Commentreaction, {
        foreignKey: "comment_id",
        as: "reactions",
      });
    }
  }
  Comment.init(
    {
      commenttitle: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
      parent_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
