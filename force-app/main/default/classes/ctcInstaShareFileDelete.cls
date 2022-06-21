global class ctcInstaShareFileDelete implements Database.Batchable<sObject> {

    global Database.QueryLocator start(Database.BatchableContext BC){
        return Database.getQueryLocator([Select Id,InstaShare_Request__r.Id FROM Case ]); //WHERE CreatedDate < LAST_N_DAYS:180
    }

    global void execute(Database.BatchableContext BC, List<Case> FilesDel){
        Set<Id> caseId = new Set<Id>(); 
        
        for(Case caseFile : FilesDel){
            caseId.add(caseFile.Id);  
            caseId.add(caseFile.InstaShare_Request__r.Id);          
        }
        List<ContentDocumentLink> lstOfCD = [SELECT ContentDocumentId, Id, LinkedEntityId,
        ShareType, SystemModstamp, Visibility 
        FROM ContentDocumentLink where LinkedEntityId= :caseId];
        delete lstOfCD;
    }

    global void finish(Database.BatchableContext BC){
    }
}