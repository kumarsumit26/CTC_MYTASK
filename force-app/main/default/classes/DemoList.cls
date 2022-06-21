public class DemoList {
    public void demo(){
        	List<Account> acc= new List<Account>();
        	acc= [select id,Name from account Limit 5];
        System.debug('acc--->>'+acc);
    }
}