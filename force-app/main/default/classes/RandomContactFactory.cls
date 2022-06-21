public class RandomContactFactory {
    public static List<Contact> generateRandomContacts(Integer num, String lastName){
        List<Contact> contactList = new List<Contact>();
        for(integer i=1;i<=num;i++){
            Contact ct= new Contact(FirstName = 'Test' + i, LastName= lastName);
            contactlist.add(ct);
        }
        return contactList;
    }
}