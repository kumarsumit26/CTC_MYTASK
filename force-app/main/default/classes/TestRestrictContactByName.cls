@isTest
public class TestRestrictContactByName {
	@isTest
    public static void testContact(){
        Contact ct = new Contact();
        ct.LastName = 'InvalidName';
        Database.SaveResult res= Database.insert(ct,false);
        System.assertEquals('The Last Name "InvalidName" is not allowed for DML',res.getErrors()[0].getMessage());
    }
}