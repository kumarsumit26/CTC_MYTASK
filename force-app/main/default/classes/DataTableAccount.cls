public class DataTableAccount {
	@AuraEnabled
    public static List<Account> fetchAccount(){
     return[select Id, Name, Rating, Industry, Phone from Account];   
    }
    
       @AuraEnabled
    public static List < Account > saveAccount(List<Account> lstName) {
        system.debug('****'+lstName);
        try{   update lstName;
           }catch(Exception e){
               system.debug('******'+e.getMessage());
           }
        return lstName;
    }
    
    
}