/**
* @File Name          : ContactUpdateHandler.cls
* @Description        : In Contact object if changed the Phone Number, It will send auto mail by using Email Templates.
* @Author             : Kumar Sumit 
* @Group              : 
* @Last Modified By   : Kumar Sumit
* @Last Modified On   : 24/02/2022
* @Modification Log   : 
* Ver       Date            Author      		 Modification
* 1.0    24/02/2022       Kumar Sumit            Initial Version
**/

public class ContactUpdateHandler {
    public static void phoneNumberUpdate(List<Contact> listOfContact){
       List<Messaging.SingleEmailMessage> mail = new List<Messaging.SingleEmailMessage>();  
        for(Contact loopcontacts : listOfContact){
            if(loopcontacts.Phone !=null ){
                 List<EmailTemplate> emailTemplates = [SELECT Id, Body, Subject FROM EmailTemplate WHERE DeveloperName = 'Contact_Update'];
             	Messaging.SingleEmailMessage mail2 = new Messaging.SingleEmailMessage();
             	mail2.setTemplateId(emailTemplates[0].Id);
             	mail2.setSaveAsActivity(false);
             	mail2.setTargetObjectId(loopcontacts.Id);// Any contact or User id of your record
             	mail2.setToAddresses(new List<String> {loopcontacts.Email});
             	// Enter your record Id whose merge field you want to add in template
             	Messaging.SendEmailResult[] resultMail = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail2 });
                 
            }
            
        }
    }
}