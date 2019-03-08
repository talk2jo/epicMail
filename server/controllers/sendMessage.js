import sentMessage from '../models/Sent';
import contactsData from '../models/Contacts';
import messageData from '../models/Message';
import inboxData from '../models/Inbox';
import moment from 'moment';


function sendMessage(req, res) {

  /** validate receiver Id */
  const { receiverId, subject, message } = req.body;
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


  /** push message to receiver Inbox list */
  inboxData.push({
    id: inboxData.length + 1,
    createdOn: moment(new Date()),
    subject,
    message,
    senderId: req.user.id,
    receiverId,
    parentMessageId: messageData.length + 3,
    status: 'recieved'
  });
  /** push message to sender sent list */
  sentMessage.push({
    id: sentMessage.length + 1,
    createdOn: moment(new Date()),
    subject,
    message,
    senderId: req.user.id,
    receiverId,
    parentMessageId: messageData.length + 3,
    status: 'sent'
  });

  /** return message create */
  return res.status(201).json({
    status: 200,
    data: sentMessage//sendMessage
  });
}

export default sendMessage;