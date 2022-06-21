/**
* @File Name          : FirstLastNameTriggerTest.apxc
* @Description        : Test Class
* @Author             : Kumar Sumit
* @Group              : 
* @Last Modified By   : Kumar Sumit
* @Last Modified On   : 1/03/2022
* @Modification Log   : 
* Ver       Date            Author      		    Modification
* 1.0    1/03/2022        Kumar Sumit              Initial Version
**/

@isTest
public class FirstLastNameTriggerTest {
	
    @isTest
    static void userNameTest(){
        User userToCreate = new User();
        userToCreate.FirstName='Adiyogi';
        userToCreate.LastName= 'Sambhoo';
        userToCreate.Alias = 'Rudra';
        userToCreate.Email = 'kumar.sumit@raagvitech.com';
        userToCreate.Username = 'Adiyogi@gmail.com';
        userToCreate.ProfileId = '00e5j0000016PctAAE';
        userToCreate.EmailEncodingKey = 'UTF-8';
        userToCreate.TimeZoneSidKey = 'America/Los_Angeles';
        userToCreate.LocaleSidKey = 'en_US';
        userToCreate.LanguageLocaleKey = 'en_US';
        Test.startTest();
        insert userToCreate;
		Test.stopTest();

		User nickname = [SELECT Id, CommunityNickName FROM User WHERE Id =: userToCreate.Id];
		System.assertEquals('AS', nickname.CommunityNickname);        
        
            
            
        
        
    }
}