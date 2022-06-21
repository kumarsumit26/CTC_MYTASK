/**
* @File Name          : FirstLastNameHandler.apxc
* @Description        : Nickname should be the first letter of user First name and last name respectively, 
						If Nickname repeats we need to add a count to the nick name.
* @Author             : Kumar Sumit
* @Group              : 
* @Last Modified By   : Kumar Sumit
* @Last Modified On   : 28/02/2022
* @Modification Log   : 
* Ver       Date            Author      		    Modification
* 1.0    28/02/2022        Kumar Sumit              Initial Version
**/

public class FirstLastNameHandler {
    public static void userName(List<User> Users){
        
        for(User un : Users){
         	un.CommunityNickName = un.FirstName.subString(0,1) + un.LastName.subString(0,1);
            string k = '%' + un.CommunityNickname + '%' ;
            List<User> getRepeated =[Select CommunityNickname FROM User WHERE CommunityNickname LIKE : k];
            System.debug(getRepeated);
            if(getRepeated.size()>0){
                un.CommunityNickname = un.CommunityNickname + '(' + getRepeated.size() + ')';      
            }
            System.debug(getRepeated.size());       
        }
    } 
}