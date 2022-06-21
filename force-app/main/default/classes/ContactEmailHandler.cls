/**
* @File Name          : ContactEmailHandler.cls
* @Description        : In Contact object if changed the Loan Status, It will send auto mail by using Email Templates.
* @Author             : Kumar Sumit 
* @Group              : 
* @Last Modified By   : Kumar Sumit
* @Last Modified On   : 24/02/2022
* @Modification Log   : 
* Ver       Date            Author      		 Modification
* 1.0    24/02/2022       Kumar Sumit            Initial Version
**/


public class ContactEmailHandler {
    public static void emailHandler(List<Contact> contacts) {
        
        List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
        for(Contact myContact : contacts){
            
            if (myContact.Loan__c == 'Application' || myContact.Loan__c == 'Active' || myContact.Loan__c == 'Commitment') {
                
            List<EmailTemplate> lstEmailTemplates = [SELECT Id, Body, Subject from EmailTemplate where DeveloperName = 'Loan_Status'];
            Messaging.SingleEmailMessage mail1 = new Messaging.SingleEmailMessage();
            mail1.setTemplateId(lstEmailTemplates[0].Id);
            mail1.setSaveAsActivity(false);
            mail1.setTargetObjectId(myContact.Id);// Any contact or User id of your record
            mail1.setToAddresses(new List<String>  {myContact.Email});
            // Enter your record Id whose merge field you want to add in template
            Messaging.SendEmailResult[] resultMail = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail1 });
                
                /*List<EmailTemplate> FirstEmailTemplate = [Select Id, Body, Subject FROM EmailTemplate WHERE DeveloperName = 'Loan_Status'];
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            	List<String> sendTo = new List<String>();
            	sendTo.add(myContact.Email);
                mail.setToAddresses(sendTo);
                mails.add(mail);
                
                mail.setSubject('Your Loan Status is changed'); 
                String body = 'Dear ' + myContact.FirstName + myContact.LastName + ', '; 
                body += 'Your Loan Status is changed to' + myContact.Loan__c  ;
                mail.setHtmlBody(body);
                mails.add(mail);*/
        	}
		}
  		Messaging.sendEmail(mails);
    }
}