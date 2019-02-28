const Messages = [
  {
    id: 1,
    createdOn: '2/20/2019',
    subject: 'epicMail',
    message: 'Developing an epic mail application',
    parentMessageId: 11,
    status: 'read' // draft, sent or read
  },
  {
    id: 2,
    createdOn: '2/21/2019',
    subject: 'my diary',
    message: 'Develop my diary application',
    parentMessageId: 11,
    status: 'draft' // draft, sent or read
  },
  {
    id: 3,
    createdOn: '2/28/2019',
    subject: 'Event manager',
    message: 'Develop an event manager application',
    parentMessageId: 2,
    status: 'sent' // draft, sent or read
  },
];
export default Messages;