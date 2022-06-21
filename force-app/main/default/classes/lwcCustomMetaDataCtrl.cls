public with sharing class lwcCustomMetaDataCtrl {
    @AuraEnabled( cacheable=true )  
    public static List < Approved_Appraiser__c > fetchMetaListLwc() {
        
        List < Approved_Appraiser__c > fetchMeta = [ SELECT Id, Phone__c, Province__c, Municipality__c, Fax__c, Email__c FROM Approved_Appraiser__c ];
        return fetchMeta;
 
    }
}