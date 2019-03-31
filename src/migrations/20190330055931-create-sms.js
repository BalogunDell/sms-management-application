module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('SMs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Contacts',
          key: 'id'
      }
      },
      recipientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Contacts',
          key: 'id'
        }
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['read', 'unread', 'delivered'],
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('SMs');
  }
};