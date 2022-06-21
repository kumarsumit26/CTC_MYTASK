/**
* @File Name          : ContactTriggerHandler.cls
* @Description        : In Contact object if changed the Contact Number, It will send auto mail by using Email Templates.
* @Author             : Kumar Sumit 
* @Group              : 
* @Last Modified By   : Kumar Sumit
* @Last Modified On   : 24/02/2022
* @Modification Log   : 
* Ver       Date            Author      		 Modification
* 1.0    24/02/2022       Kumar Sumit            Initial Version
**/

public class ContactTriggerHandler {
    public static void contactUpdate(List<Account> accounts){
        List<Messaging.SingleEmailMessage> mail23 = new List<Messaging.SingleEmailMessage>();
        for(Account account : accounts){
            List<Contact> contacts = [select Email, Id from Contact where Email= 'kumar.sumit@raagvitech.com'];
            for(Contact contactss : contacts){
            
            if(account.AccountNumber != null ){
             List<EmailTemplate> lstEmailTemplates = [SELECT Id, Body, Subject from EmailTemplate where DeveloperName = 'Contact_Update'];
             Messaging.SingleEmailMessage mail2 = new Messaging.SingleEmailMessage();
             mail2.setTemplateId(lstEmailTemplates[0].Id);
             mail2.setSaveAsActivity(false);
             mail2.setTargetObjectId(contactss.Id);// Any contact or User id of your record
             mail2.setToAddresses(new List<String> {contactss.Email});
             // Enter your record Id whose merge field you want to add in template
             Messaging.SendEmailResult[] resultMail = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail2 });
                 
            }
           	
        }
        }
  
        
    }
}