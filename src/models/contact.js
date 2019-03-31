import { nameErrors, phoneNumberErrors } from '../utils/messages';

const Contact = (sequelize, DataTypes) => {
  const contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
          args: true,
          msg: nameErrors.duplicateError
        },
      validate: {
        len: {
          args: [2, 20],
          msg: nameErrors.lengthError
        },
        notEmpty: {
          args: true,
          msg: nameErrors.emptyError
        },
      }

    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
          args: true,
          msg: phoneNumberErrors.duplicateError
        },
      validate: {
        len: {
          args: [2, 20],
          msg: phoneNumberErrors.lengthError
        },
        notEmpty: {
          args: true,
          msg: phoneNumberErrors.emptyError
        },
      }
    }
  });
     contact.associate = (models) => {
        contact.hasMany(models.SMs, {
          foreignKey: 'senderId',
          onDelete: 'CASCADE',
          as: 'sentMessages'
        }),
        contact.hasMany(models.SMs, {
          foreignKey: 'recipientId',
          onDelete: 'CASCADE',
          as: 'recievedMessages'
        })
  };
  return contact;
};

export default Contact;