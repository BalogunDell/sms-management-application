import { nameErrors, phoneNumberErrors, smsErrors } from './messages';
import statusCodes from './statusCodes';

export const errorHandler = (error) => {
  const { name } = error; 
 
  switch(name) {
    case 'SequelizeUniqueConstraintError': {
      const { path } = error.errors[0];
      const statusCode = statusCodes.duplicate;
       if (path === 'name') {
        return {
          message: nameErrors.duplicateError,
          statusCode,
        }; 
       }

       if (path === 'phoneNumber') {
        return {
          message: phoneNumberErrors.duplicateError,
          statusCode,
        }; 
       }
    };

    case 'SequelizeForeignKeyConstraintError': {
      const statusCode = statusCodes.notFound;
      return {
        message: smsErrors.contactNotFound,
        statusCode
      }
    }
    default: return 'Something happened on the server';
  }
};