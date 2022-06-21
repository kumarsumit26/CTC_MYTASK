public with sharing class CTCHomePageBannersController {
    @AuraEnabled(cacheable=true)
    public Static WrapPromoBannerIds getPromoBanner() {
        List<WrapHomePageBannerDetails>  lstOfDeskFolderItem =  new List<WrapHomePageBannerDetails>();
        List<WrapHomePageBannerDetails>  lstOfTabFolderItem =  new List<WrapHomePageBannerDetails>();
        List<WrapHomePageBannerDetails>  lstOfMobFolderItem =  new List<WrapHomePageBannerDetails>();
        Set<Id> desktopFolderId =  new Set<Id>();
        Set<Id> mobileFolderId =  new Set<Id>();
        Set<Id> tabletFolderId =  new Set<Id>();
        
        for (ContentFolderItem obj :   [SELECT Id
                                        FROM ContentFolderItem
                                        WHERE ParentContentFolderId IN (SELECT Id FROM ContentFolder
                                        WHERE Name = 'BrokerPortalHomePageBannersDesktop')]) {
                                        desktopFolderId.add(obj.Id);
        }
        for (ContentVersion obj : [SELECT ContentDocumentId
                                  FROM ContentVersion
                                  WHERE ContentDocumentId IN: desktopFolderId
                                  ]) {
                                    lstOfDeskFolderItem.add (new WrapHomePageBannerDetails (obj.ContentDocumentId));
        }
        for (ContentFolderItem obj: [SELECT Id FROM ContentFolderItem
                                    WHERE ParentContentFolderId IN (SELECT Id FROM ContentFolder
                                    WHERE Name = 'BrokerPortalHomePageBannersMobile')]) {
                                        mobileFolderId.add(obj.Id);
        }
        for (ContentVersion obj : [SELECT ContentDocumentId
                                  FROM ContentVersion
                                  WHERE ContentDocumentId IN: mobileFolderId]){
                                    lstOfMobFolderItem.add(new WrapHomePageBannerDetails(obj.ContentDocumentId));
        }
        for (ContentFolderItem obj : [SELECT Id, Title, FileExtension FROM ContentFolderItem
                                    WHERE ParentContentFolderId IN (SELECT Id FROM ContentFolder
                                    WHERE Name = 'BrokerPortalHomePageBannersTablet')]) {
                                        tabletFolderId.add(obj.Id);
        }
        for (ContentVersion obj : [SELECT ContentDocumentId
                                  FROM ContentVersion
                                  WHERE ContentDocumentId IN: tabletFolderId ]) {
                                    lstOfTabFolderItem.add(new WrapHomePageBannerDetails(obj.ContentDocumentId));
        }
        return new WrapPromoBannerIds(lstOfDeskFolderItem,lstOfMobFolderItem,lstOfTabFolderItem);
    }
    public class WrapPromoBannerIds {
        @AuraEnabled
        public   List<WrapHomePageBannerDetails> desktopBannerId;
        @AuraEnabled
        public   List<WrapHomePageBannerDetails> mobileBannerId;
        @AuraEnabled
        public   List<WrapHomePageBannerDetails> tabletBannerId;
        public WrapPromoBannerIds(List<WrapHomePageBannerDetails> desktopBannerId,  List<WrapHomePageBannerDetails> mobileBannerId,  List<wrapHomePageBannerDetails> tabletBannerId){
            this.desktopBannerId = desktopBannerId;
            this.mobileBannerId = mobileBannerId;
            this.tabletBannerId = tabletBannerId;
        }
    }
    public class WrapHomePageBannerDetails{
        @AuraEnabled
        public Id recordId;
        @AuraEnabled
        public String url;
        public WrapHomePageBannerDetails(Id recordId) {
            this.recordId = recordId;
            this.url = 'https://golu26-developer-edition.ap27.force.com/CTCHeader/sfc/servlet.shepherd/document/download/'+recordId;
        }
    }
}