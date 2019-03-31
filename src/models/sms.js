const SMS = (sequelize, DataTypes) => {
  const sms = sequelize.define('SMs', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Contacts',
        key: 'id'
      }
    },
    recipientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Contacts',
        key: 'id'
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ['delivered', 'read'],
      defaultValue: 'delivered'
    },
  });
      sms.associate = (models) => {
       sms.belongsTo(models.Contact, {
         foreignKey: 'senderId',
         onDelete: 'CASCADE',
       }),
       sms.belongsTo(models.Contact, {
        foreignKey: 'recipientId',
        onDelete: 'CASCADE',
      })
  };
  return sms;
};

export default SMS;