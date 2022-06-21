public with sharing class cTC_HomePageCafeAlertsCtrl {
    @AuraEnabled (cacheable=true)
    public static List<CTC_Cafe_Alert__c> getCTCCafeAlerts(){
       return  [SELECT Id, Title__c,Message__c,URL__c
                FROM CTC_Cafe_Alert__c
                WHERE Active__c = true
                ORDER BY LastModifiedDate DESC];
    }
}