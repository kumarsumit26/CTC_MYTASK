public class SendEmailHandler {
    @AuraEnabled
    public static string processEmail(String email){
        String sMessage='';
        try{
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {email}; 
                mail.setToAddresses(toAddresses);
            mail.setSubject('Instashare Request');
            mail.setHtmlBody('Your Instashare Request is created.');
            Messaging.SendEmailResult [] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
            sMessage='Success';
        }
        catch(Exception ex){
            sMessage=ex.getLineNumber()+'\n'+ex.getCause()+'\n'+ex.getMessage()+'\n'+ex.getStackTraceString();
        }
        system.debug('sMessage');
        return sMessage;
    }
    
    @AuraEnabled
    public Static String createInstashare(String name, String email, String status){
        String Result;
        Try
        {
            InstaShare__c inst = new InstaShare__c();
            inst.Name__c=name;
            inst.Email__c=email;
            inst.Status__c = status;
            Insert inst ;
            Result = 'Success';
        }
        catch(exception e)
        {
            Result = e.getMessage();
        }
        Return Result;
    }
    
    @AuraEnabled
    public Static List<InstaShare__c> getList(){
        List<InstaShare__c> instalist = [Select Id ,Name__c, Email__c ,Status__c FROM InstaShare__c ];
        return instalist;
        
        
    }
}