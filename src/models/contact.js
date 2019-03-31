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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return contact;
};

export default Contact;