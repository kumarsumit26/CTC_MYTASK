trigger ContactTrigger on Account (after insert, after update) {
    List<Account> accounts = Trigger.new ;  
    ContactTriggerHandler.contactUpdate(accounts);
}