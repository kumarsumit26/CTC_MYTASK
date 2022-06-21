public without sharing class BrokerInstaShareRequestController {
    @AuraEnabled
    public static instaShareRecordWrapper getInstaShareRecords(){
        Set<Id> setOfInstaShareReqIds = new Set<Id>();
        Map<Id,List<Id>> mapOfRecordIdToDocId = new Map<Id,List<Id>>();
        List<InstaShare_Request__c> lstOfRecords = new List<InstaShare_Request__c>();
        List<Id> lstOfDocRecords = new List<Id>();
        InstaShare_Dynamic_Values__c instaShareDynamicVal = InstaShare_Dynamic_Values__c.getValues('InstaShareListViewXDays');
        Integer lastNdays=Integer.valueOf(instaShareDynamicVal.Value__c);
        for(InstaShare_Request__c instaReqObj: [SELECT Id, Email__c, Name, Status__c, CreatedDate,LastModifiedDate
                                                FROM InstaShare_Request__c
                                               ]){
                                                   Datetime startDate = instaReqObj.CreatedDate;
                                                   Datetime endDate = system.now();
                                                   if(startDate.Date().daysBetween(endDate.Date()) <=lastNdays){
                                                       lstOfRecords.add(instaReqObj);
                                                       setOfInstaShareReqIds.add(instaReqObj.Id);
                                                   }
                                               }
        System.debug('<<<<<userinfo.getUserId()>>>>'+userinfo.getUserId());
        System.debug('<<<<<lstOfRecords>>>>'+lstOfRecords);
        System.debug('<<<<<lstOfRecords size>>>>'+lstOfRecords.size());
        if(lstOfRecords.size()>0){
            System.debug('<<<<<setOfInstaShareReqIds>>>>'+setOfInstaShareReqIds);
            for(ContentDocumentLink cdLink:[SELECT Id,LinkedEntityId,ContentDocumentId
                                            FROM ContentDocumentLink
                                            WHERE LinkedEntityId IN :setOfInstaShareReqIds]){
                                                if(cdLink != null){
                                                    if(mapOfRecordIdToDocId.containsKey(cdLink.LinkedEntityId)){
                                                        mapOfRecordIdToDocId.get(cdLink.LinkedEntityId).add(cdLink.ContentDocumentId);
                                                    }
                                                    else{
                                                        mapOfRecordIdToDocId.put(cdLink.LinkedEntityId,new list<Id>{cdLink.ContentDocumentId});
                                                    }
                                                }
                                            }
            for(ContentDocumentLink cdLinks:[SELECT Id,LinkedEntityId,ContentDocumentId
                                             FROM ContentDocumentLink
                                             WHERE LinkedEntityId IN :setOfInstaShareReqIds]){
                                                 if(cdLinks != null){
                                                     lstOfDocRecords.add(cdLinks.ContentDocumentId);
                                                 }
                                             }
            System.debug('<<<<<mapOfRecordIdToDocId>>>>'+mapOfRecordIdToDocId);
            instaShareRecordWrapper wrapperObj = new instaShareRecordWrapper();
            wrapperObj.instaShareReqRecords = lstOfRecords;
            wrapperObj.mapOfIdToContDocId = mapOfRecordIdToDocId;
            wrapperObj.instaShareDocumentsRecords =lstOfDocRecords;
            system.debug('<<<<wrapperObj>>>>>'+wrapperObj);
            return wrapperObj;
        }
        else{
            return null;
        }
    }
    public class instaShareRecordWrapper{
        @AuraEnabled
        public List<InstaShare_Request__c> instaShareReqRecords;
        @AuraEnabled
        public List<Id> instaShareDocumentsRecords;
        @AuraEnabled
        public Map<Id,List<Id>> mapOfIdToContDocId;
    }
}