public class Constructor {
    
    Private String Name;
    Private Integer Age;
    
    public Constructor(){}
    
    public Constructor(String Name, Integer Age){
        this.Name= Name;
        this.Age= Age;
    }
    
    public void Print(){
        System.debug('Name'+Name);
        System.debug('Age'+Age);
    }

}