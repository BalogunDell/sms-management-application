import models from '../models/';

import { errorHandler } from '../utils/errorHandler';
import { responseStatusMessage } from '../utils/messages';

import customResponseObject from '../utils/responses';
import statusCodes from '../utils/statusCodes';

const { Contact } = models;
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

      Contact.findByPk(id)
      .then((response) => {
        if (!response) {
          const { contactNotFound } = responseStatusMessage;

          return customResponseObject(res, contactNotFound, statusCodes.notFound);
        }
        const { name, phoneNumber, id } = response.dataValues;
        const otherFields = { id, name, phoneNumber };
        const { success } = responseStatusMessage;

        return customResponseObject(res, success, statusCodes.created, otherFields);
      })
      .catch(() => {});
  },

    /** 
    * Update a contact
    * 
    * @param {integer} - contactId
    * 
    * @returns {object} - Updated details
    **/
  update: (req, res) => {
    return res.status(200).json({ message: 'update' })
  },

  /** 
    * Delete a contact
    * 
    * @param {integer} - contactId
    * 
    * @returns {object} - Delete status
    **/
   delete: (req, res) => {
    return res.status(200).json({ message: 'delete' })
  }

}