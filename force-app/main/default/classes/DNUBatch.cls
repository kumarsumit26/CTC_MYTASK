global class DNUBatch implements Database.Batchable<sObject>,Database.Stateful{
    
Set<Id> setAccountIds = new Set<Id>();
    global DNUBatch(set<Id> ids){
    setAccountIds = ids;
    System.debug('ids>>'+ids);
    }

    public Database.QueryLocator start(Database.BatchableContext BC){
	return Database.getQueryLocator([Select Id, DNU__c, AccountId,Email
                                    FROM Contact
                                    Where AccountId=: setAccountIds]);
    }

    public void execute(Database.BatchableContext BC, List<Contact> DNU){
        System.debug('DNU'+ DNU);
		
        
        List<Contact> contactList = new List<Contact>();
        for(Contact conObj : DNU){
            conObj.DNU__c = true;
            conObj.Added_To_DNU_List__c = System.Today();
            System.debug('contactList'+contactList);
            contactList.add(conObj);
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
            Id templateId =  [select id, name from EmailTemplate where developername = 'DNUEmail'].id;
            System.debug('emaill'+ templateId);
            email.setToAddresses(new List<String>{conObj.Email});
            email.setTargetObjectId(conObj.Id);
            email.setTemplateId(templateId);
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
          }
            update contactList;
        

    }
    public void finish(Database.BatchableContext BC){
        
    }
}