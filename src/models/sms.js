const SMS = (sequelize, DataTypes) => {
  const sms = sequelize.define('SMS', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipientId: DataTypes.INTEGER,
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['read', 'unread', 'delivered']
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return sms;
};

export default SMS;