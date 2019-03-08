import messageData from '../models/Message';
import moment from 'moment';
import inboxData from '../models/Inbox';
import sendMessage from '../controllers/sendMessage';
import sentData from '../models/Sent';

class Message {
  /**
   * Method to create or send message for user
   * 
   * @static 
   * @param {Request} req
   * @param {Response} res
   * @return {object} return create message for user.
   */
  create(req, res) {
    const { subject, message, messageStatus } = req.body;

    if (messageStatus === 'send') {
      return sendMessage(req, res);
    }

    const draftMessage = {
      id: messageData.length + 1,
      createdOn: moment(new Date()),
      subject,
      message,
      parentMessageId: 1,
      status: 'draft',
      userId: req.user.id // Owner of the message
    }

    messageData.push(draftMessage);
    return res.status(201)
      .json({
        status: 201,
        data: draftMessage
      });
  }
  /**
   * Method to get user received messages
   * 
   * @static 
   * @param {Request} req
   * @param {Response} res
   * @return {object} return Inbox message for user.
   */

  getInbox(req, res) {
    let userInbox = [];
    let filterUserInbox = inboxData.filter((inbox) => {
      if (inbox.receiverId == req.user.id) {
        userInbox.push(inbox);
      }
    });

    return res.status(200).json({
      status: 200,
      data: userInbox
    });
  }

  /**
  * Method to fetch user sent messages
  * 
  * @static 
  * @param {Request} req
  * @param {Response} res
  * @return {object} return sent message by user.
  */

  getSentMessage(req, res) {
    let sentMessage = [];
    let filterSentMessage = sentData.filter((outbox) => {
      if (outbox.senderId == req.user.id) {
        sentMessage.push(outbox);
      }
    });

    return res.status(200).json({
      status: 200,
      data: sentMessage
    });
  }

  /**
  * Method to fetch user unread received messages
  * 
  * @static 
  * @param {Request} req
  * @param {Response} res
  * @return {object} return sent message by user.
  */
  getUnreadMessages(req, res) {
    let userInbox = [];
    let filterUserInbox = inboxData.filter((inbox) => {
      if (inbox.receiverId == req.user.id && inbox.read == 'false') {
        userInbox.push(inbox);
      }
    });

    return res.status(200).json({
      status: 200,
      data: userInbox
    });
  }
}

export default new Message;



