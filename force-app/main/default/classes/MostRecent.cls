public with sharing class MostRecent {
    @AuraEnabled(cacheable=true)
    public static List<Most_Recent_Deals__c> getMostRecentList() {
        return [SELECT Id, Deals__c, Status__c, Borrower_Name__c, Property_Address__c,Anticip_Fund_Date__c
            FROM Most_Recent_Deals__c];
    }
}