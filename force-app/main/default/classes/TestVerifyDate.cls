@isTest
public class TestVerifyDate {
    @isTest static void dateCheck(){
        Date dateCheck= VerifyDate.CheckDates(Date.parse('11/26/1999'),Date.parse('11/28/1999'));
        System.assertEquals(Date.parse('11/28/1999'),dateCheck);
    }
    @isTest static void dateCheck1(){
        Date date1= VerifyDate.CheckDates(Date.parse('01/01/1988'),Date.parse('02/02/1988'));
        System.assertEquals(Date.parse('01/31/1988'),date1);
    }
}