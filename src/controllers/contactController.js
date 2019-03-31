import models from '../models/';
import Sequelize from 'sequelize';

import { errorHandler } from '../utils/errorHandler';
import { responseStatusMessage } from '../utils/messages';

import customResponseObject from '../utils/responses';
import statusCodes from '../utils/statusCodes';

const { Contact, SMs } = models;

exports.contactController = {

    /** 
    * Create a contact
    * 
    * @param {object} - contactDetails
    * 
    * @returns {object} - saved details
    **/
    create: (req, res) => {
      const { name, phoneNumber } = req.body;

     Contact.create({ name, phoneNumber })
      .then((response) => {
        const { name, phoneNumber, id } = response.dataValues;
        const otherFields = { id, name, phoneNumber };
        const { success } = responseStatusMessage;

        return customResponseObject(res, success, statusCodes.created, {details: otherFields });
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
      const { contactNotFound, notContacts } = responseStatusMessage;
      const queryString = id ? 'findByPk' : 'findAll';
      const message = id ? contactNotFound : notContacts;
      const queryBuilder = (queryString) => {
        if (queryString === 'findAll') {
          return Contact[queryString]();
        }
        return Contact[queryString](id, { 
          include: [ 
            { model: SMs, as: 'recievedMessages' },
            { model: SMs, as: 'sentMessages' },

          ] 
        });

      };
      queryBuilder(queryString).then((response) => {
        if (!response) {
          return customResponseObject(res, message, statusCodes.notFound);
        }        
        const responseObject = id ? response.dataValues : response;
        const key = id ? 'contact' : 'contacts';
        const { success } = responseStatusMessage;
        return customResponseObject(res, success, statusCodes.success, { [key]: responseObject });
      })
      .catch(() => {});
  },

    /** 
    * Update a sms
    * 
    * @param {integer} - contactId
    * 
    * @returns {object} - Updated details
    **/
  update: (req, res) => {
    const { name, phoneNumber, id } = req.body;
  
    Contact.update({ name, phoneNumber}, { where: { id }})
      .then((response) => {
        if (response[0] === 0) {
          const { contactNotFound } = responseStatusMessage;
          return customResponseObject(res, contactNotFound, statusCodes.notFound);
        }
        const otherFields = { id, name, phoneNumber };
        const { success } = responseStatusMessage;
        return customResponseObject(res, success, statusCodes.success, { details: otherFields });
      })
      .catch((error) => {
        const { message, statusCode } = errorHandler(error);
        return customResponseObject(res, message, statusCode);
      });
  },

  /** 
    * Delete a sms
    * 
    * @param {integer} - contactId
    * 
    * @returns {object} - Delete status
    **/
   delete: (req, res) => {
     const { id } = req.body;
     Contact.destroy({ where: { id }})
      .then((response) => {
        if (response === 0) {
          const { contactNotFound } = responseStatusMessage;
          return customResponseObject(res, contactNotFound, statusCodes.notFound);
        }
        const { success } = responseStatusMessage;
        return customResponseObject(res, success, statusCodes.success);
      })
      .catch(() => {});
  }

}