"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Subject, Comment, Postreaction }) {
      // define association here
      this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(Subject, { foreignKey: "subject_id" });
      this.hasMany(Comment, { foreignKey: "post_id" });
      this.hasMany(Postreaction, { foreignKey: "post_id" });
    }
  }
  Post.init(
    {
      posttitle: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      subject_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
