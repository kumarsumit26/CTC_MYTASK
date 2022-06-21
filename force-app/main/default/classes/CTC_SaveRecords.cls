public class CTC_SaveRecords {
@Auraenabled
    public static string saveRecords(Contact contObj){
        System.debug('contact::'+ contObj.FirstName);
        insert contObj;
        return contObj.Id;
    }
}