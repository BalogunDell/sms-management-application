
// Utils
import customResponseObject from '../utils/responses';
import statusCodes from '../utils/statusCodes';
import { nameErrors, phoneNumberErrors } from '../utils/messages';

exports.contactValidator = {

  /** 
   * 
   * Validate contact id
   * 
  **/
  validateId: (req, res, next) => {
   const { id } = req.params;
   if (!id) {
    return customResponseObject(res, nameErrors.requiredError, badRequest);
   }
   req.body.id = parseInt(id, 10);
    return next();
  },

  /** 
   * 
   * Validate contact details
   * 
  **/
 validateDetails: (req, res, next) => {
  const { name, phoneNumber } = req.body;
  const { badRequest } = statusCodes;
    if (!name) {
      return customResponseObject(res, nameErrors.requiredError, badRequest);
    }

    if (!phoneNumber) {
      return customResponseObject(res, phoneNumberErrors.requiredError, badRequest);
    }

    if (name.length < 2 || name.length > 20 ) {
      return customResponseObject(res, nameErrors.lengthError, badRequest);
    }

    if (phoneNumber.length !== 11 ) {
      return customResponseObject(res, phoneNumberErrors.lengthError, badRequest);
    }
    return next();
  },
}