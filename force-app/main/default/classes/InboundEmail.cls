public class InboundEmail implements Messaging.InboundEmailHandler {
    public Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email,Messaging.InboundEnvelope env){
        Messaging.InboundEmailResult result = new  Messaging.InboundEmailResult();
        try{
            String fromAdd = email.fromAddress;
            Contact[] con=[select id,email from Contact where email=:fromAdd];
            Case c= new Case();
            //list<Case> cases = new list<Case>();
            if(con.size()>1){
                c.Status='New';
                c.Priority='Normal';
                c.origin='Email';       
                c.subject=email.Subject;
                c.description=email.plainTextBody;
                c.contactId=con[0].Id;
                c.Multiple_Contacts_Accounts__c=true;
                insert c;
            }
            //for(Contact ct:con){
                system.debug('Contact>>>>>>>>>>>>');
           
                c.Status='New';
                c.Priority='Normal';
                c.origin='Email';       
                c.subject=email.Subject;
                c.description=email.plainTextBody;
                c.contactId=con[0].Id;
                insert c;
            
               
                //cases.add(c);
            //}
            
            List<Messaging.InboundEmail.BinaryAttachment> binaryAttachments = email.binaryAttachments;
            List<Attachment> attachments = new List<Attachment>();
            //for(Case c : cases){
                for(Messaging.InboundEmail.binaryAttachment b : binaryAttachments){
                    Attachment a= new Attachment();
                    a.ParentId = c.Id;
                    a.Body = b.body;
                    a.name=b.fileName;
                    attachments.add(a);
                }
            //}
            Insert attachments;
            result.success=true;
        }
        catch(Exception e){
            result.success=false;
            system.debug('c>>>>>>>>>>>');
        }
        
        return result;  
    }
}