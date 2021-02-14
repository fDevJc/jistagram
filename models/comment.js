const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        content: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        nick: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.Post);
  }
};
