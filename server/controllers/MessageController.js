import messageData from '../models/Message';
import moment from 'moment';

class Message {
  /**
   * Method to sent message
   * 
   * @static 
   * @param {Request} req
   * @param {Response} res
   * @return {obj} return json object Message.
   */
  create(req, res) {
    const { subject, message, status } = req.body;

    const newMessage = {
      id: messageData.length + 1,
      createdOn: moment(new Date()),
      subject,
      message,
      parentMessageId: messageData.length + 3,
      status
    }

    messageData.push(newMessage);

    return res.status(201)
      .json({
        status: 201,
        data: messageData[messageData.length - 1]
      });
  }

  
}

export default new Message;



