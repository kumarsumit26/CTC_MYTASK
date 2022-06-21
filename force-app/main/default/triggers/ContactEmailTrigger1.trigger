trigger ContactEmailTrigger1 on Contact (after insert, after update) {
    List<Contact> contacts = Trigger.new;
    ContactEmailHandler.emailHandler(contacts);
}