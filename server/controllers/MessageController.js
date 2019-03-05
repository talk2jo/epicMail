import messageData from '../models/Message';
import sentMessage from '../models/Sent';
import moment from 'moment';
import contactsData from '../models/Contacts';
import inbox from '../models/Inbox';
import { userInfo } from 'os';

class Message {
  /**
   * Method to create message and save as draft
   * 
   * @static 
   * @param {Request} req
   * @param {Response} res
   * @return {object} return create message for user.
   */
  create(req, res) {
    const { receiverId, subject, message, messageStatus } = req.body;

    const newMessage = {
      id: messageData.length + 1,
      createdOn: moment(new Date()),
      subject,
      message,
      parentMessageId: messageData.length + 3,
      messageStatus
    }

    if (newMessage.messageStatus === 'send') {
      /** validate receiver Id */
      if (!receiverId) {
        res.status(400).json({
          status: 400,
          error: 'Receiver id require and should be integer or change status to draft to save message'
        });
      }
      /* check if reciever(contact) with the given receiving id and the login user id exist */
      let contact = contactsData.find(c => c.id == receiverId && (c => c.UserId == req.user.id));
      if (!contact) {
        return res.status(400).json({
          status: 400,
          error: 'Contact with the giving receiving id does not exist'
        });
      }

      const sendMessage = {
        id: messageData.length + 1,
        createdOn: moment(new Date()),
        subject,
        message,
        senderId: userInfo.id,
        receiverId,
        parentMessageId: messageData.length + 3,
        messageStatus
      }

      /** push message to receiver Inbox list */
      inbox.push(sendMessage);
      /** push message to sender sent list */
      sentMessage.push(sendMessage);

      /** return message create */
      return res.status(201).json({
        status: 200,
        data: newMessage
      });

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



