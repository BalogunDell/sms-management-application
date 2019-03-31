import express from 'express';

// Controllers
import { contactController } from '../controllers/contactController';
import { smsController } from '../controllers/smsController';


// Middlewares
import { contactValidator, smsValidator } from '../middlewares/contactValidator';

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
  ).get(smsController.read)
    .post(smsValidator.validateDetails, smsController.create);



router.route(
  '/messages/:id'
  ).get(contactValidator.validateId, smsController.read)
   .delete(
    contactValidator.validateId,
      smsController.delete);

    

export default router;