
// Utils
import customResponseObject from '../utils/responses';
import statusCodes from '../utils/statusCodes';
import { nameErrors, phoneNumberErrors, smsErrors, IdError } from '../utils/messages';

exports.contactValidator = {

  /** 
   * 
   * Validate contact id
   * 
  **/
  validateId: (req, res, next) => {
   const { id } = req.params;

   const { badRequest } = statusCodes;
   if (!id || /[a-zA-Z]+/.test(id)) {
    return customResponseObject(res, IdError, badRequest);
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

exports.smsValidator = {
 /** 
  * 
  * Validate sms details
  * 
 **/
validateDetails: (req, res, next) => {
 const { senderId, recipientId, message } = req.body;
 const { badRequest } = statusCodes;
 const reg = /[a-zA-Z]+/;

   if (!senderId) {
     return customResponseObject(res, smsErrors.requiredError('senderId'), badRequest);
   }

   if (!recipientId) {
     return customResponseObject(res, smsErrors.requiredError('recipientId'), badRequest);
   }

   if (message.length === 0) {
    return customResponseObject(res, smsErrors.lengthError('message'), badRequest);
  }

   if (!message) {
     return customResponseObject(res, smsErrors.requiredError('message'), badRequest);
   }
  
   if (reg.test(senderId) || reg.test(recipientId)) {
     return customResponseObject(res, smsErrors.IdTypeError('senderId or recipientId'), badRequest);
   }
   return next();
 },
}