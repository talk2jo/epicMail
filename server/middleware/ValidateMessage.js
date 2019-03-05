import validator from 'validator';

class MessageValidation {
  send(req, res, next) {
    const { subject, message, messageStatus } = req.body,
      errorMessage = {};

    if (subject === undefined || message === undefined || messageStatus === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'All or some of the field is/are undefined'
      });
    }

    if (!validator.isLength(subject, { min: 3, max: 35 })) {
      errorMessage.subject = 'subject must not be less than 3 or above 35 characters';
    }
    if (!validator.isLength(message, { min: 3, max: 200 })) {
      errorMessage.message = 'message must not be less than 3 or above 200 characters';
    }
    if (!validator.isLength(messageStatus, { min: 4, max: 5 })) {
      errorMessage.messageStatus = 'status must not be less than 3 or above 200 characters';
    }
    if (messageStatus.search(/^[a-zA-Z]*$/) === -1) {
      errorMessage.messageStatus = 'status should be all alphalbet';
    }
    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(400).json({ status: 400, error: errorMessage });
    }
    return next();
  }

}

export default new MessageValidation();