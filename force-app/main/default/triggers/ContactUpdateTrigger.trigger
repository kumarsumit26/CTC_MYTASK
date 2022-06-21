trigger ContactUpdateTrigger on Contact (after insert, after update) {
    List<Contact> listOfContact = Trigger.new ; 
    ContactUpdateHandler.phoneNumberUpdate(listOfContact);
}