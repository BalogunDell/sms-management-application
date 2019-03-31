import express from 'express';

// Controllers
import { contactController } from '../controllers/contactController';
import { messageController } from '../controllers/messageController';


// Middlewares
import { contactValidator, smsValidator } from '../middlewares/validator';

// Utils
import customResponseObject from '../utils/responses';
import { appWelcomeMessage } from '../utils/messages';
import statusCodes from '../utils/statusCodes';

const router = express.Router();

// Home page
router.get('/',(req, res) => {
    const { success } = statusCodes;
    return customResponseObject(res, appWelcomeMessage, success, null);
  });

// Create, edit, and delete Contact
router.route(
  '/contacts',
  ).get(contactController.read)
    .post(contactValidator.validateDetails, contactController.create);



router.route(
  '/contacts/:id'
  ).get(contactValidator.validateId, contactController.read)
   .put(
      contactValidator.validateId,
      contactValidator.validateDetails,
      contactController.update
      )
   .delete(
      contactValidator.validateId,
      contactController.delete);


// Create, edit, and delete sms
router.route(
  '/messages',
  ).get(messageController.read)
    .post(smsValidator.validateDetails, messageController.create);



router.route(
  '/messages/:id'
  ).get(contactValidator.validateId, messageController.read)
   .delete(
      contactValidator.validateId,
      messageController.delete);

    

export default router;