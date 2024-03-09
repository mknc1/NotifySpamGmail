function notifySpamMail() {
  const threads = GmailApp.search('in:spam');
  const threadsLen = threads.length;
  
  if (threadsLen <= 0) {
    Logger.log('No spam mails');
    return;
  }

  let body = "";
  let count = 0;
  for (let i = 0; i < threadsLen; i++) {
    const messages = threads[i].getMessages();
    for (let j = 0; j < messages.length; j++) {
      const message = messages[j];
      const sender = message.getFrom();
      const subject = message.getSubject();
      const dateStr = Utilities.formatDate(message.getDate(), 'Asia/Tokyo', 'yyyy-MM-dd HH:mm:ss');
      body += dateStr + ', from: ' + sender + ', subject: ' + subject + '\n';
      count++;
    }
  }

  const subject = 'There is' + count + 'spam email in your mailbox';      
  body = 'There is' + count + 'spam email in your mailbox.\n\n' + body;
  
  const mailaddress = Session.getActiveUser().getEmail();
  GmailApp.sendEmail(mailaddress, subject, body);
  Logger.log('send Email: ' + mailaddress);

  return;
}
