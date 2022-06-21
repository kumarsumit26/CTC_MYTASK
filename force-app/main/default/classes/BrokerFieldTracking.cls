public with sharing class BrokerFieldTracking {
    @AuraEnabled
    public static List<FeedItem> getLoanstatusFromFeed()
    {
        //list to store the feedItem with body This deal has changed from
        List<FeedItem> feedItemList = new List<FeedItem>();
        //get the loggedIn user Id
        Id brokerId = UserInfo.getUserId();
        System.debug('brokerId'+brokerId);
        //get the user deatail of loggedin User
        User user = [select Id,ContactId from user where Id =:brokerId ]; 
        System.debug('user'+user.ContactId);
        
        //get the feedItem which belongs to loggedIn user
        for(FeedItem feedItemObj : [SELECT ID, Title, Body, NetworkScope,ParentId,CreatedDate
                                    FROM FEEDItem 
                                    WHERE ParentId IN (SELECT Id FROM Residential_Mortgage__c)
                                    AND Type ='TextPost' AND NetworkScope = 'AllNetworks' ORDER BY CreatedDate DESC])
        {
            System.debug('feedItemObj'+feedItemObj);
            //check the feedItem Body
            if(feedItemObj.Body.contains('This deal has changed from'))
            {
                if(feedItemList.size()>= 3){
                    System.debug('feedItemList'+feedItemList.size());
                    break;
                }else{
                    feedItemList.add(feedItemObj);
                }
            }
        }
        if(feedItemList.size()>0){
             return feedItemList;
        }
        else{
            return null;
        }
       
    }  
}