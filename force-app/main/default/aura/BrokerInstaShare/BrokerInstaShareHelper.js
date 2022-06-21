({
    previewFile : function(component, event, helper){
        console.log('>>>>>',event.target.getAttribute("id"));
        $A.get('e.lightning:openFiles')
        .fire({
            recordIds : [event.target.getAttribute("id")],
            target:"_blank",
            Edit:'No',
            Delete:'No'
        });
    },
    
    
    preparePagination: function (component, recordList) {
        let countTotalPage = Math.ceil(recordList.length / component.get("v.pageSize"));
        let totalPage = countTotalPage > 0 ? countTotalPage : 1;
        component.set("v.totalPages", totalPage);
        component.set("v.currentPageNumber", 1);
        // this.setPageDataAsPerPagination(component,arrayMapKeys);
        this.setPageDataAsPerPagination(component);
    },
    
    setPageDataAsPerPagination: function (component) {
        let finalData = [];
        let data = [];
        let lstOfContDocIds;
        let displayText;
        let displayDownload;
        let mapOfIdToDocId = component.get("v.documentIds");
        let condIdsLength;
        let pageNumber = component.get("v.currentPageNumber");
        let pageSize = component.get("v.pageSize");
        let filteredLst = component.get('v.finalFilteredData');
        var i=0;
        let x = (pageNumber - 1) * pageSize;
        for (; x < (pageNumber) * pageSize; x++) {
            if (filteredLst[x]) {
                data.push(filteredLst[x]);
            }
        }
        
        console.log('<<<data>>>' + JSON.stringify(data));
        data.forEach(record => {
            
            lstOfContDocIds = "";
            condIdsLength = 0;
            displayDownload = false;
            displayText = 'Download';
            
            mapOfIdToDocId.forEach(element => {
            if (record.Id == element.key) {
            lstOfContDocIds = element.value;
            condIdsLength = lstOfContDocIds.length;
            displayDownload = true; 
        }
        });
            if(i<lstOfContDocIds.length){
            for(i=0;i<lstOfContDocIds.length;i++){
            component.set("v.contentsIds",lstOfContDocIds[i]);
            console.log('lstOfContDocIds',lstOfContDocIds[i]);
            
        }
            
        }
            
            if(displayDownload){
            displayText = 'Download';
        }
            else{
            displayText = 'N/A';
        }
            console.log('<<condIdsLength>>>>>'+condIdsLength);
            finalData.push({ "recordFieldValues": record, "displayText": displayText,"displayDownload": displayDownload, "noOfDocuments": condIdsLength, "lstOfContDocIds": lstOfContDocIds });
        
    });
    console.log('<<<outside record>>>');
    
    console.log('<<<finaldata>>>' + JSON.stringify(finalData));
    // let tabledata = component.get("v.tableData");
    // console.log('<<tabledata.<'+component.get("v.tableData"));
    component.set("v.tableData", finalData)
    
},
 
 filterRecords: function (component, event, helper, recordList) {
    
    let instaStatus = component.get("v.selectedValue");
    console.log('<<<<instaStatus>>>>' + instaStatus);
    // let allData = component.get("v.allData");
    let filteredLst;
    let searchKey = component.get("v.searchPhrase").trim().toLowerCase();
    
    if (instaStatus === 'All Sent Requests') {
        if (!$A.util.isEmpty(searchKey)) {
            filteredLst = recordList.filter(record => record.Status__c == 'Email sent' && (record.Name.toLowerCase().includes(searchKey) || record.Status__c.toLowerCase().includes(searchKey) || record.Email__c.toLowerCase().includes(searchKey)));
        }
        else {
            filteredLst = recordList.filter(record => record.Status__c == 'Email sent');
        }
        
        if (filteredLst.length === 0 && recordList.length === 0) {
            component.set("v.recordsAvailable", false);
            component.set("v.showLastUpdated", false);
            component.set("v.noRecordText", 'You currently do not have any requests sent');
        }
        else if (filteredLst.length === 0) {
            component.set("v.showLastUpdated", true);
            component.set("v.recordsAvailable", false);
            component.set("v.noRecordText", 'You currently do not have any requests sent');
        }
            else {
                component.set("v.showLastUpdated", true);
                component.set("v.recordsAvailable", true);
            }
    }
    
    else if (instaStatus === 'All Completed Requests') {
        if (!$A.util.isEmpty(searchKey)) {
            filteredLst = recordList.filter(record => record.Status__c == 'Completed' && (record.Name.toLowerCase().includes(searchKey) || record.Status__c.toLowerCase().includes(searchKey) || record.Email__c.toLowerCase().includes(searchKey)));
        }
        else {
            filteredLst = recordList.filter(record => record.Status__c == 'Completed');
        }
        
        if (filteredLst.length === 0 && recordList.length === 0) {
            component.set("v.recordsAvailable", false);
            component.set("v.showLastUpdated", false);
            component.set("v.noRecordText", 'You currently do not have any completed requests');
        }
        else if (filteredLst.length === 0) {
            component.set("v.showLastUpdated", true);
            component.set("v.recordsAvailable", false);
            component.set("v.noRecordText", 'You currently do not have any completed requests');
        }
            else {
                component.set("v.showLastUpdated", true);
                component.set("v.recordsAvailable", true);
            }
    }
        else if (instaStatus === 'All Archived Requests') {
            if (!$A.util.isEmpty(searchKey)) {
                filteredLst = recordList.filter(record => record.Status__c == 'Archived' && (record.Name.toLowerCase().includes(searchKey) || record.Status__c.toLowerCase().includes(searchKey) || record.Email__c.toLowerCase().includes(searchKey)));
            }
            else {
                filteredLst = recordList.filter(record => record.Status__c == 'Archived');
            }
            
            if (filteredLst.length === 0 && recordList.length === 0) {
                component.set("v.recordsAvailable", false);
                component.set("v.showLastUpdated", false);
                component.set("v.noRecordText", 'You currently do not have any archived requests');
            }
            else if (filteredLst.length === 0) {
                component.set("v.showLastUpdated", true);
                component.set("v.recordsAvailable", false);
                component.set("v.noRecordText", 'You currently do not have any archived requests');
            }
                else {
                    component.set("v.showLastUpdated", true);
                    component.set("v.recordsAvailable", true);
                }
        }
            else {
                // if (!$A.util.isEmpty(searchKey)) {
                //     filteredLst = allData.filter(record => (record.Name.toLowerCase().includes(searchKey) || record.Status__c.toLowerCase().includes(searchKey) || record.Email__c.toLowerCase().includes(searchKey)));
                // }
                // else {
                //     filteredLst = [...allData];
                // }
                
                if (!$A.util.isEmpty(searchKey)) {
                    filteredLst = recordList.filter(record => (record.Status__c == 'Completed' || record.Status__c == 'Email sent') && (record.Name.toLowerCase().includes(searchKey) || record.Status__c.toLowerCase().includes(searchKey) || record.Email__c.toLowerCase().includes(searchKey)));
                }
                else {
                    filteredLst = recordList.filter(record => (record.Status__c == 'Completed' || record.Status__c == 'Email sent'));
                }
                
                if (filteredLst.length === 0 && recordList.length === 0) {
                    component.set("v.recordsAvailable", false);
                    component.set("v.showLastUpdated", false);
                    component.set("v.noRecordText", 'You currently do not have any requests sent');
                }
                else if (filteredLst.length === 0) {
                    component.set("v.showLastUpdated", true);
                    component.set("v.recordsAvailable", false);
                    component.set("v.noRecordText", 'You currently do not have any requests sent');
                }
                    else {
                        component.set("v.showLastUpdated", true);
                        component.set("v.recordsAvailable", true);
                    }
            }
    
    component.set("v.finalFilteredData", filteredLst);
    component.set("v.totalSize", filteredLst.length);
    if(filteredLst.length>1){
        component.set("v.displayItemsText", true);  
    }
    else{
        component.set("v.displayItemsText", false); 
    }
    
    this.preparePagination(component, filteredLst);
},
    
    sortDataInAscOrder: function (component, event, helper) {
        let allDataInDescOrder = component.get("v.allData");
        let allDataInAscOrder = allDataInDescOrder.slice().sort((a, b) => (new Date(a.LastModifiedDate)) - (new Date(b.LastModifiedDate)));
        console.log('<<<allDataInAscOrder>>>' + JSON.stringify(allDataInAscOrder));
        this.filterRecords(component, event, helper, allDataInAscOrder);
        
    },
        
        handleAscOrDescData: function (component, event, helper) {
            let allData = component.get("v.allData");
            // let dataOrder = component.get("v.dataInAscOrder");
            // console.log('<<<<dataOrder in handleAscOrDescData method>>>'+dataOrder);
            let toggleSortValue = component.get("v.toggleSort");
            console.log('<<<<toggleSortValue in handleAscOrDescData method>>>>' + toggleSortValue);
            if (toggleSortValue) {
                helper.sortDataInAscOrder(component, event, helper);
            }
            else {
                helper.filterRecords(component, event, helper, allData);
            }
        },
            
            lastUpdatedLogic: function (component, latestModifiedRecord) {
                
                console.log('<<<<inside lastUpdatedLogic');
                let currentTimeInSec = Math.round((new Date().getTime()) / 1000);
                console.log('<<<<currentTimeInSec>>>>>>' + currentTimeInSec);
                let recordTimeInSec = Math.round((new Date(latestModifiedRecord.LastModifiedDate).getTime()) / 1000);
                console.log('<<<<recordTimeInSec>>>>>>' + recordTimeInSec);
                
                let timeDifferenceInSec = currentTimeInSec - recordTimeInSec;
                if (timeDifferenceInSec < 60) {
                    timeDifferenceInSec === 1 ? component.set("v.lastUpdated", timeDifferenceInSec + ' second ago') : component.set("v.lastUpdated", timeDifferenceInSec + ' seconds ago');
                    console.log('<<<lastUpdated>>>>' + component.get("v.lastUpdated"));
                }
                else if (timeDifferenceInSec >= 60 && timeDifferenceInSec < 3600) {
                    let timeDifferenceInMin = Math.floor(timeDifferenceInSec / 60);
                    timeDifferenceInMin === 1 ? component.set("v.lastUpdated", timeDifferenceInMin + ' minute ago') : component.set("v.lastUpdated", timeDifferenceInMin + ' minutes ago');
                    console.log('<<<lastUpdated>>>>' + component.get("v.lastUpdated"));
                }
                    else if (timeDifferenceInSec >= 3600 && timeDifferenceInSec < 86400) {
                        let timeDifferenceInHrs = Math.floor(timeDifferenceInSec / 3600);
                        timeDifferenceInHrs === 1 ? component.set("v.lastUpdated", timeDifferenceInHrs + ' hour ago') : component.set("v.lastUpdated", timeDifferenceInHrs + ' hours ago');
                        console.log('<<<lastUpdated>>>>' + component.get("v.lastUpdated"));
                    }
                        else if (timeDifferenceInSec >= 86400 && timeDifferenceInSec < 2629746) {
                            let timeDifferenceInDays = Math.floor(timeDifferenceInSec / 86400);
                            timeDifferenceInDays === 1 ? component.set("v.lastUpdated", timeDifferenceInDays + ' day ago') : component.set("v.lastUpdated", timeDifferenceInDays + ' days ago');
                            console.log('<<<lastUpdated>>>>' + component.get("v.lastUpdated"));
                        }
                            else if (timeDifferenceInSec >= 2629746 && timeDifferenceInSec < 31556952) {
                                let timeDifferenceInMonths = Math.floor(timeDifferenceInSec / 2629746);
                                timeDifferenceInMonths === 1 ? component.set("v.lastUpdated", timeDifferenceInMonths + ' month ago') : component.set("v.lastUpdated", timeDifferenceInMonths + ' months ago');
                                console.log('<<<lastUpdated>>>>' + component.get("v.lastUpdated"));
                            }
                                else {
                                    let timeDifferenceInYears = Math.floor(timeDifferenceInSec / 31556952);
                                    timeDifferenceInYears === 1 ? component.set("v.lastUpdated", timeDifferenceInYears + ' year ago') : component.set("v.lastUpdated", timeDifferenceInYears + ' years ago');
                                    console.log('<<<lastUpdated>>>>' + component.get("v.lastUpdated"));
                                }
                
            } ,
                nextClick: function(component,event,indexNumber) {
                    var desktopList = component.get("v.currentFileSelect");
                    component.set("v.startPage", indexNumber);
                    component.set("v.endPage", indexNumber);
                    component.set('v.dektopBannerList', desktopList[indexNumber]);
                },
})