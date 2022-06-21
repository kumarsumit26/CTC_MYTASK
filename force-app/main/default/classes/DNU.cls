global class DNU {
    @InvocableMethod(label='DNU')
    global static void dnuList (List<Id> ids){
        system.debug('>>>>>>>>>>'+ids);
        DNUBatch BC = new DNUBatch(new Set<Id> (ids)) ;
        Id batchProcessId = Database.executeBatch(BC,150);   
    }
}