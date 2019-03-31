import express from 'express';

// Controllers
import { contactController } from '../controllers/contactController';


// Middlewares
import { contactValidator } from '../middlewares/contactValidator';

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
router.post(
  '/contacts',
  contactValidator.validateDetails,
  contactController.create
  );

router.route(
  '/contacts/:id'
  ).get(contactValidator.validateId, contactController.read)
   .put(contactValidator.validateDetails, contactController.update)
   .delete(contactValidator.validateDetails, contactController.delete)

export default router;