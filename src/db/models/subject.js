"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Direction }) {
      // define association here
      this.belongsTo(Direction, { foreignKey: "direction_id" });
    }
  }
  Subject.init(
    {
      subjectName: DataTypes.STRING,
      direction_id: DataTypes.INTEGER,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Subject",
    }
  );
  return Subject;
};
