import models from '../models';

import { errorHandler } from '../utils/errorHandler';
import { responseStatusMessage } from '../utils/messages';

import customResponseObject from '../utils/responses';
import statusCodes from '../utils/statusCodes';

const { SMs } = models;

exports.messageController = {

    /** 
    * Create a contact
    * 
    * @param {object} - contactDetails
    * 
    * @returns {object} - saved details
    **/
    create: (req, res) => {
      const { senderId, recipientId, message } = req.body;
      SMs.create({ senderId, recipientId, message })
      .then((response) => {
        const { senderId, recipientId, message, id } = response.dataValues;
        const otherFields = { id, senderId, recipientId, message };
        const { success } = responseStatusMessage;

        return customResponseObject(res, success, statusCodes.created, otherFields);
      })
      .catch((error) => {
        const { message, statusCode } = errorHandler(error);
        return customResponseObject(res, message, statusCode);
      });
  },

    /** 
    * Get a contact
    * 
    * @param {integer} - contactId
    * 
    * @returns {object} - saved details
    **/
    read: (req, res) => {
      const { id } = req.body;
      const { smsNotFound, noSMS } = responseStatusMessage;
      const queryString = id ? 'findByPk' : 'findAll';
      const message = id ? smsNotFound : noSMS;
      const queryBuilder = (queryString) => {
        if (queryString === 'findAll') {
          return SMs[queryString]();
        }
        return SMs[queryString](id);

      };
      queryBuilder(queryString).then((response) => {
        if (!response) {
          return customResponseObject(res, message, statusCodes.notFound);
        }
        const responseObject = id ? response.dataValues : response;
        const { success } = responseStatusMessage;
        return customResponseObject(
          res, 
          success, 
          statusCodes.success, 
          { messages: responseObject });
      })
      .catch(() => {});
  },

  /** 
    * Delete a contact
    * 
    * @param {integer} - contactId
    * 
    * @returns {object} - Delete status
    **/
   delete: (req, res) => {
     const { id } = req.body;
     SMs.destroy({ where: { id }})
      .then((response) => {
        if (response === 0) {
          const { smsNotFound } = responseStatusMessage;
          return customResponseObject(res, smsNotFound, statusCodes.notFound);
        }
        const { success } = responseStatusMessage;
        return customResponseObject(res, success, statusCodes.success);
      })
      .catch(() => {});
  }

}