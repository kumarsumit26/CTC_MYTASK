trigger OpportunityTrigger on Opportunity (before insert,after insert,before update,after update,before delete, after delete) {
    
    if(Trigger.isBefore && Trigger.isInsert){
        System.debug('This will fire only on Before Insert.');
        System.debug('Trigger Old'+Trigger.old);
        System.debug('Trigger New'+Trigger.new);
    }
    
    if(Trigger.isAfter && Trigger.isInsert){
        System.debug('This will fire only on After Insert.');
        System.debug('Trigger Old'+Trigger.old);
        System.debug('Trigger New'+Trigger.new);
    }
    
    if(Trigger.isBefore && Trigger.isUpdate){
        System.debug('This will fire only on Before Update.');
        System.debug('Trigger Old'+Trigger.old);
        System.debug('Trigger New'+Trigger.new);
    }
    
    if(Trigger.isAfter && Trigger.isUpdate){
        System.debug('This will fire only on After Update.');
        System.debug('Trigger Old'+Trigger.old);
        System.debug('Trigger New'+Trigger.new);
    }
    
    if(Trigger.isBefore && Trigger.isDelete){
        System.debug('This will fire only on Before Delete.');
        System.debug('Trigger Old'+Trigger.old);
        System.debug('Trigger New'+Trigger.new);
    }
    
    if(Trigger.isAfter && Trigger.isDelete){
        System.debug('This will fire only on After Delete.');
        System.debug('Trigger Old'+Trigger.old);
        System.debug('Trigger New'+Trigger.new);
    }
}