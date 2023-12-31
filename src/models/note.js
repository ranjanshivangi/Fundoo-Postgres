'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  note.init(
    {
      createdBy: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      color: DataTypes.STRING,
      isTrash: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
      },
      isArchive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
      }
    },
    {
      sequelize,
      modelName: 'note'
    }
  );
  return note;
};
