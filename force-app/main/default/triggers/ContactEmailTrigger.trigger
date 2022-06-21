trigger ContactEmailTrigger on contact (before update) {
List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
for (Contact myContact : Trigger.new) {
    if (myContact.Loan__c == 'Application' || myContact.Loan__c == 'Active' || myContact.Loan__c == 'Commitment') {
    Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
    List<String> sendTo = new List<String>();
    sendTo.add(myContact.Email);
    mail.setToAddresses(sendTo);
    mail.setSubject('Your Loan Status is changed'); 
    String body = 'Dear ' + myContact.FirstName + myContact.LastName + ', '; 
    body += 'Your Loan Status is changed to' + myContact.Loan__c  ;
    mail.setHtmlBody(body);
    mails.add(mail);
    }
}
  Messaging.sendEmail(mails);
}