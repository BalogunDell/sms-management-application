
 export const nameErrors = {
    lengthError: 'Name should be 2 to 20 characters long.',
    duplicateError: `The name already exists.`,
    emptyError: 'Name cannot be empty.',   
    requiredError: 'Name is required.'
  };

  export const phoneNumberErrors = {
    lengthError: 'Phone number should be 11 digits long.',
    duplicateError: 'The phone number already exists.',
    emptyError: 'Phone number cannot be empty.',
    formatError: 'Invalid phone number.',
    requiredError: 'Phone number is required.'
  };

  export const smsErrors = {
    IdTypeError: (type) => `${type} should be a number.`,
    missingIdError: (type) => `${type} is required.`,
    requiredError: (type) => `${type} is required.`,
    lengthError: (type) => `${type} is too short.`,
    contactNotFound: 'No contact with such id.'
  };

  export const responseStatusMessage = {
    success: 'Success',
    error: 'error',
    contactNotFound: 'Contact not found!',
    noContacts: 'No contacts yet!',
    smsNotFound: 'Message not found.',
    IdError: 'Id should be a number.',
  }

  export const appWelcomeMessage = 'Welcome to SMS management system.';
  export const IdError = 'valid Id required';

