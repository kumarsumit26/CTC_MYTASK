@isTest
public class ctcInstaShareFileDeleteTest {

    static TestMethod void test(){
        InstaShare_Request__c instaShare = new InstaShare_Request__c();
        instaShare.Name='Kumar';
        instaShare.Email__c='Kumar@gmail.com';
        insert instaShare;
        system.assert(instaShare != null);
        

        Case cases = new Case();
        cases.Status='New';
        cases.Origin='Phone';
        insert cases;
        system.assert(cases != null);
        

        ContentVersion contentVersion = new ContentVersion(
                Title = 'Files',
                PathOnClient = 'Files.jpg',
                VersionData = Blob.valueOf('Test Content'),
                IsMajorVersion = true
                
        );
            insert contentVersion;
        system.assert(contentVersion != null);

        ContentDocument cd = [SELECT Id FROM ContentDocument WHERE LatestPublishedVersionId = :contentVersion.Id];
        ContentDocumentLink cdl = new ContentDocumentLink(
            ContentDocumentId = cd.Id,
            LinkedEntityId = instaShare.Id
        );
        
        ContentDocumentLink cd2 = new ContentDocumentLink(
            ContentDocumentId = cd.Id,
            LinkedEntityId = cases.Id
        );

            Test.startTest();
            ctcInstaShareFileDelete obj = new ctcInstaShareFileDelete();
            DataBase.executeBatch(obj);   
            Test.stopTest();
    }
   
}