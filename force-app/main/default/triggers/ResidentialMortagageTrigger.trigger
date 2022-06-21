trigger ResidentialMortagageTrigger on Residential_Mortgage__c (before insert,before Update,after insert,after update) {
if (trigger.isAfter ){
        if( trigger.isInsert){
           
               // ResidentialMortgageTriggerHandler.setFeedItemOnInset(trigger.new);
                            
            
        }
       if(trigger.isUpdate){
                ResidentialMortgageTriggerHandler.setFeedItemOnUpdate(trigger.new, trigger.oldMap);
           
            
        }
    }
}