import { nameErrors, phoneNumberErrors } from './messages';
import statusCodes from './statusCodes';

export const errorHandler = (error) => {
  const { name } = error; 
  const { path } = error.errors[0];
  switch(name) {
    case 'SequelizeUniqueConstraintError': {
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
    default: return 'Something happened on the server';
  }
};