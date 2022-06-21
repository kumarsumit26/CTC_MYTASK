trigger FirstLastNameTrigger on User (before insert) {
    if(Trigger.isInsert && Trigger.isBefore){
	List<User> user= Trigger.new;
    FirstLastNameHandler.userName(User);
    }
}