trigger LoanHandler on Contact (after insert, after update) {
     //for(Contact c : trigger.new){
      //if(c.Loan__c == 'Commitment' || c.Loan__c == 'Application' || c.Loan__c == 'Active' ){
            //List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
            //EmailTemplate emailTemp = [Select Id,subject,Body from EmailTemplate where DeveloperName='Loan_Status'];
            //Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            //mail.setTemplateId(emailTemp.Id);
            //mail.setTargetObjectId(c.Id);
            //mail.setToAddresses(new List<String> {c.Email});
            //emailList.add(mail);
            //if(emailList.isEmpty())
            //Messaging.sendEmail(emailList);
            //System.debug('email sent');
            
     
}