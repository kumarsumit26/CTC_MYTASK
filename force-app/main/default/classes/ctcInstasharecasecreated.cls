global  class ctcInstasharecasecreated implements Database.Batchable<sObject>, Database.Stateful{

    global Database.QueryLocator start(Database.BatchableContext BC){
        return Database.getQueryLocator([Select Id,Name,Status__c,Unique_code__c,
        Residential_Mortgage__r.Underwriter__r.Id ,
        Residential_Mortgage__r.Name,
        Residential_Mortgage__r.LMS_Loan_Number__c, 
        Residential_Mortgage__r.Mortgage_Officer__r.Id 
        FROM InstaShare_Request__c 
        WHERE CTC_Is_Case_Created__c = false AND Status__c ='Completed'
        AND Residential_Mortgage__c != null 
        AND (Residential_Mortgage__r.Underwriter__r.Id !=null 
        OR Residential_Mortgage__r.Mortgage_Officer__r.Id!=null)]);
    }   

    public void execute(Database.BatchableContext BC, List<InstaShare_Request__c> instShareList){		
        List<Case> caseList = new List<Case>();
        List<InstaShare_Request__c> instaShareList = new List<InstaShare_Request__c>();
        List<Residential_Mortgage__c> rmList = new List<Residential_Mortgage__c>();
        Map<Id,String> dealName = new Map<Id,String>(); 
        Set<Id> instShareId = new Set<Id>();
        Set<Id> setOfRmId = new Set<Id>();
        Map<Id,Id> mapOfCaseIds = new Map<Id,Id>();
	    Map<Id,Id> mapOfOwnerIds = new Map<Id,Id>();
        Map<Id,String> mapOfInstaShareNames = new Map<Id,String>();
        Id typeId = [SELECT Id FROM CustomNotificationType WHERE DeveloperName = 'Sent_Bell_Notification'].Id;
        //Id recordTypeId = Schema.SObjectType.Case.getRecordTypeInfosByName().get('CTC Contact Center').getRecordTypeId();
        List<Messaging.CustomNotification> customNotificationList = new List<Messaging.CustomNotification>();
        
        for(InstaShare_Request__c request : instShareList ){
            System.debug('instShareList>>>>>>'+instShareList);
            instShareId.add(request.Id);
            System.debug('instShareId>>>>>>'+instShareId);
            setOfRmId.add(request.Residential_Mortgage__c);
            System.debug('setOfRmId>>>>>>'+setOfRmId);
            mapOfInstaShareNames.put(request.Id,request.Name);
            System.debug('mapOfInstaShareNames>>>>>>'+mapOfInstaShareNames);
            dealName.put(request.Residential_Mortgage__c,request.Residential_Mortgage__r.LMS_Loan_Number__c);
            System.debug('dealName>>>>>>'+dealName);
            request.CTC_Is_Case_Created__c = true;
            instaShareList.add(request);
            Case caseObj = new Case();
            caseObj.Subject = 'Created Bell Notification';
            // caseObj.Body = 'Flinks Document Case has been created for the deal'+request.Residential_Mortgage__r.Name;
            caseObj.OwnerId = request.Residential_Mortgage__r.Mortgage_Officer__r.Id != NULL? request.Residential_Mortgage__r.Mortgage_Officer__r.Id: request.Residential_Mortgage__r.Underwriter__r.Id;
            caseObj.InstaShare_Request__c = request.Id;
            caseObj.Residential_Mortgage__c = request.Residential_Mortgage__c;
            caseList.add(caseObj);
        }

        System.debug('CaseList>>>>'+caseList);
        if(caseList.size()>0){
            Insert caseList;
            //system.assert(caseList != null);

 
        }

        for(Case instaCase : caseList)
        {
            System.debug('instaCase>>>>'+instaCase.Residential_Mortgage__c);
            mapOfCaseIds.put(instaCase.InstaShare_Request__c,instaCase.Id);
            mapOfOwnerIds.put(instaCase.InstaShare_Request__c,instaCase.OwnerId);
            Messaging.CustomNotification notification = new Messaging.CustomNotification();
            notification.setBody('Flinks Document Case has been created for the deal '+dealName.get(instaCase.Residential_Mortgage__c));
            notification.setTitle('One case is created in your Profile.');
            notification.setSenderId(instaCase.OwnerId);
            notification.setNotificationTypeId(typeId);
            notification.setTargetId(instaCase.Id); // target object id
            notification.send(new Set<String> {instaCase.OwnerId});
        }
        
        List<ContentDocumentLink> lstOfCD =  new List<ContentDocumentLink>();
        for(ContentDocumentLink cdl : [SELECT ContentDocumentId, Id, LinkedEntityId,
                                       ShareType, SystemModstamp, Visibility 
                                       FROM ContentDocumentLink where LinkedEntityId= :instShareId]){
                                       cdl.Id=null;
                                       cdl.LinkedEntityId = mapOfCaseIds.get(cdl.LinkedEntityId);
                                       lstOfCD.add(cdl);
                                       System.debug('cdl>>>>>>>>>>>>>>>>>>>>>'+cdl);
                                       }
        
        if(lstOfCD.size()>0){
            Insert lstOfCD;
            system.assert(lstOfCD != null);
        }
        
        if(instaShareList.size()>0){
            Update instaShareList;
            system.assert(instaShareList != null);
        }
        
        // for(Residential_Mortgage__c rm : [SELECT Id,Flinks_Documents__c 
        //                                   FROM Residential_Mortgage__c 
        //                                   WHERE ID =: setOfRmId ]){
        //     rm.Flinks_Documents__c = true;
        //     rmList.add(rm);                                 
        // }
        
        // if(rmList.size()>0){
        //     Update rmList;
        // }
    }
    global void finish (Database.BatchableContext BC ) {}
}