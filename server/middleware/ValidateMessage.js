import validator from 'validator';

class MessageValidation {
  send(req, res, next) {
    const { subject, message, status } = req.body,
      errorMessage = {};

    if (subject === undefined || message === undefined || status === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'All or some of the field is/are undefined'
      });
    }
    if (status !== 'read' || status !== 'draft' || status === 'sent') {
      return res.status(400).json({
        status: 400,
        error: 'status must be read, draft or sent'
      });
    }
    if (!validator.isLength(subject, { min: 3, max: 35 })) {
      errorMessage.subject = 'subject must not be less than 3 or above 35 characters';
    }
    if (!validator.isLength(message, { min: 3, max: 200 })) {
      errorMessage.message = 'message must not be less than 3 or above 200 characters';
    }
    if (!validator.isLength(status, { min: 4, max: 5 })) {
      errorMessage.status = 'status must not be less than 3 or above 200 characters';
    }
    if (status.search(/^[a-zA-Z]*$/) === -1) {
      errorMessage.status = 'status should be all alphalbet';
    }
    if (!(Object.keys(errorMessage).length === 0)) {
      return res.status(400).json({ status: 400, error: errorMessage });
    }
    return next();
  }

}

export default new MessageValidation();