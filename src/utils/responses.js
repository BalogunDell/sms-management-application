
const customResponseObject = (
    res, 
    message, 
    statusCode, 
    otherFields=null
  ) => {
    if (otherFields) {
      return res.status(statusCode).json({ message, details: { ...otherFields } });
    }
    return res.status(statusCode).json({ message });
  };

export default customResponseObject;
