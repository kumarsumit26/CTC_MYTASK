public class ResidentialMortgageTriggerHandler {
public static void setFeedItemOnUpdate(List<Residential_Mortgage__c> RMList, Map<Id, Residential_Mortgage__c> rMOldValue){
        Set<Id> setOfBrokerId = new Set<Id>();
      //  Set<Id> setOfNewAndOldBrokerId = new Set<Id>();
        List<FeedItem> posts = new List<FeedItem>();
        Map<Id,Id> mapOfBrokerWithUserId =  new Map<Id, Id>();
        Map<Id, List<Residential_Mortgage__c>> mapOfBrokerIdWithDeals = new Map<Id, List<Residential_Mortgage__c>>();
        RMList = [SELECT Id, Underwriter__r.Name, Broker__c,
                  Loan_Status__c, Broker__r.Name, Owner.Id, Owner.Name,
                  Name, createdById , LMS_Loan_Number__c
                  FROM Residential_Mortgage__c
                  WHERE Id IN:Trigger.newMap.keySet()
                  AND Underwriter__r.Name != null];
         System.debug('RMList>>>>>>...'+RMList);
        //Source_System__c='CTC'
        List<Residential_Mortgage__c> objRM =[SELECT Id, Underwriter__r.Name, Broker__c,
                                              Loan_Status__c, Broker__r.Name, Owner.Id, Owner.Name,
                                              Name, createdById , LMS_Loan_Number__c
                                              FROM Residential_Mortgage__c
                                              WHERE Id IN:Trigger.newMap.keySet()
                                              AND Underwriter__r.Name != 'Eric Botham' AND Underwriter__r.Name != 'Kyle Bloemink'];
         System.debug('objRM>>>>>>>>>>>>>>>....'+objRM);
        List<Residential_Mortgage__c> objRMPost =[SELECT Id,Underwriter__r.Name, Broker__c,Borker_Email__c,
                                                  Loan_Status__c, Broker__r.Name, Owner.Id, Owner.Name,IsStatusProcessed__c,
                                                  Name, createdById , LMS_Loan_Number__c,Broker_Loan_Status__c
                                                  FROM Residential_Mortgage__c
                                                  WHERE Id IN:Trigger.newMap.keySet()
                                                 ];
         System.debug('objRMPost>>>>>>>>>>>>>>>....'+objRMPost);
        for(Residential_Mortgage__c RMobj : RMList){
            if(RMobj.Broker__c != null){
                System.debug('Inside If>>>>>>>>>>>>>Is Broker');
                setOfBrokerId.add(RMobj.Broker__c);
                System.debug('setOfBrokerId>>>>>>>>>.'+setOfBrokerId);
            }
        }
        for(User userObj :[SELECT Id, ContactId FROM User WHERE ContactId IN: setOfBrokerId]){
            System.debug('Inside For>>>>>>>>... for user');
            System.debug('InsideuserObj'+userObj);
            mapOfBrokerWithUserId.put(userObj.ContactId, userObj.Id);
        }
        // This is to send notification to broker as well as to display update on Chatter when a underwriter is assigned to a broker
        List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
        for(Residential_Mortgage__c obj : objRM){
            System.debug( obj.Underwriter__c+ ' Comparing+ '+ rMOldValue.get(obj.Id).Underwriter__c);
            if( obj.Underwriter__c != rMOldValue.get(obj.Id).Underwriter__c){
                if(obj.Broker__c != null){
                    System.debug('Inside for and if>>>>>>>>>.');
                    String status = '<b>'+obj.LMS_Loan_Number__c+' Underwriter assigned </b><p>&nbsp;</p>';
                    status+= obj.Underwriter__r.Name+' has been assigned to '+obj.LMS_Loan_Number__c;
                    FeedItem post = createFeed(mapOfBrokerWithUserId.get(obj.Broker__c),
                                               obj.Id, obj.Name, status);
                    posts.add(post);
                    System.debug('post....'+post);
                }
            }
        }
        // This is to send notification to broker as well as to display update on Chatter when deal loan status is changed
        for(Residential_Mortgage__c obj : objRMPost)
        {
            if(obj.Loan_Status__c != rMOldValue.get(obj.Id).Loan_Status__c && obj.IsStatusProcessed__c==false
               && (obj.Loan_Status__c =='Application'|| obj.Loan_Status__c =='Commitment')){
                   if(obj.Broker__c != null){
                        System.debug('Inside for and if 2222>>>>>>>>>.');
                       String status =  '<b>'+obj.LMS_Loan_Number__c+' Status Update</b><p>&nbsp;</p>';
                      // status+= 'This deal has changed from '+rMOldValue.get(obj.Id).Loan_Status__c + ' to '+obj.Loan_Status__c;
                       status+= 'This deal has changed from '+rMOldValue.get(obj.Id).Broker_Loan_Status__c + ' to '+obj.Broker_Loan_Status__c;
                       FeedItem post = createFeed(mapOfBrokerWithUserId.get(obj.Broker__c),
                                                  obj.Id, obj.Name, status);
                       System.debug('Status'+ status +''+mapOfBrokerWithUserId.get(obj.Broker__c)+obj.Id+obj.Name);
                       System.debug('Post>>>>>>>>.....'+post);
                       posts.add(post);
                   }
               }
            else if(obj.Loan_Status__c != rMOldValue.get(obj.Id).Loan_Status__c && (obj.Loan_Status__c !='Application'&& obj.Loan_Status__c !='Commitment'))
            {
                if(obj.Broker__c != null){
                     System.debug('Inside for and if 2222 else condition>>>>>>>>>.');
                    String status =  '<b>'+obj.LMS_Loan_Number__c+' Status Update</b><p>&nbsp;</p>';
                   // status+= 'This deal has changed from '+rMOldValue.get(obj.Id).Loan_Status__c + ' to '+obj.Loan_Status__c;
                    status+= 'This deal has changed from '+rMOldValue.get(obj.Id).Broker_Loan_Status__c + ' to '+obj.Broker_Loan_Status__c;
                    FeedItem post = createFeed(mapOfBrokerWithUserId.get(obj.Broker__c),
                                               obj.Id, obj.Name, status);
                    System.debug('Before last Post'+post);
                    posts.add(post);
                    System.debug('List Of Posts'+ posts);
                }
            }
        }
        if(!posts.isEmpty()){
            System.debug('inside last if');
            insert posts;
        }
     }
     Public static FeedItem createFeed(Id brokerId, Id recordId, String title, String Body){
         System.debug('Inside createfeed');
        FeedItem post = new FeedItem(
            createdById = brokerId,
            ParentId = recordId,
            Title = title,
            Body = Body,
            Visibility = 'AllUsers',
            IsRichText =true,
            NetworkScope='AllNetworks'
        );
         System.debug(post);
        return post;
    }
}