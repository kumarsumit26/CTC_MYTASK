({
    doInit: function (component, event, helper) {
        console.log('>>>>>inside doinit>>>>');
        var action = component.get("c.getInstaShareRecords");
        action.setParams({
            
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            console.log('<<<<state>>>>' + state)
            if (state === 'SUCCESS') {
                component.set('v.showSpinner', false);
                console.log('outside of if++++++++++++++++++++++++++++++++++++++++++++++++++');
                
                if(response.getReturnValue()) {
                    console.log('inside of if++++++++++++++++++++++++++++++++++++++++++++++++++');
                    console.log('<<<response>>>>' + (response.getReturnValue()));
                    let recordList = response.getReturnValue().instaShareReqRecords;
                    console.log('<<<<recordList>>>>>' + JSON.stringify(recordList));
                    let mapOfRecordIdToDocId = response.getReturnValue().mapOfIdToContDocId;
                    console.log('<<<<mapofrecords>>>>>' + JSON.stringify(mapOfRecordIdToDocId));
                   

                
                 component.set("v.startPage", 0);                
                 component.set("v.endPage", pageSize - 1);
                 var PagList = [];
               
               var i=0;
                
                 if ( response.getReturnValue().desktopBannerId.length > i){
                     for ( var i=0; i< pageSize; i++ ) {
                        PagList.push(response.getReturnValue().desktopBannerId[i]); 
                    }
                    component.set('v.dektopBannerList', PagList);
                }

                 
                         window.setInterval(
                    $A.getCallback(() => {
                        component.set("v.truthy",false);
                        if(i < response.getReturnValue().desktopBannerId.length ) {
                        helper.nextClick(component, event, i);
                        	i++;
                    	}else{
                        	i=0;
                            helper.nextClick(component, event, i);
                        	//i++;
                        }

              }), 5000
            ); 
            
                  
                    
                    
                    
                    component.set("v.toggleSort", false);
                    component.set("v.showLastUpdated", true);
                    component.set("v.recordsAvailable", true);
                    let latestModifiedRecord = recordList[0];
                    component.set('v.allData', recordList);
                    component.set('v.finalFilteredData', recordList);
                    component.set("v.totalSize", recordList.length);
                    if(recordList.length>1){
                        component.set("v.displayItemsText", true);  
                    }
                    else{
                        component.set("v.displayItemsText", false); 
                    }
                    
                    
                    var arrayMap = [];
                    if (mapOfRecordIdToDocId != null) {
                        for (var key in mapOfRecordIdToDocId) {
                            arrayMap.push({ key: key, value: mapOfRecordIdToDocId[key] });
                        }
                        console.log('<<<<arrayMap>>>>' + JSON.stringify(arrayMap));
                    }
                    component.set('v.documentIds', arrayMap);
                    console.log('>>>>>>>>>>>>arrayMap',arrayMap);
                    
                    console.log('<<<<recordList.length>>>>' + recordList.length);
                    
                    // if(selectedStatusValue != "All InstaShare Requests"){
                    //     console.log('<<<inside not All InstaShare Requests');
                    //     this.filterRecords(component, event, helper);
                    // }
                    // else{
                    //     console.log('<<<<inside All InstaShare Requests');
                    //     this.preparePagination(component, recordList);
                    // }
                    
                    
                    this.filterRecords(component, event, helper, recordList);
                    this.lastUpdatedLogic(component, latestModifiedRecord);
                }
                else {
                    component.set("v.recordsAvailable", false);
                    component.set("v.showLastUpdated", false);
                    component.set("v.noRecordText", 'You currently do not have any requests sent');
                }
                
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    }, 
    
    // callInitMethod  : function(component, event, helper) {
    
    //      window.setTimeout(
    //         $A.getCallback(function () {
    //             helper.getInstashareValue(component, event, helper);
    //         }), 3000);
    
    // },
    handleChange: function (component, event, helper) {
        helper.handleAscOrDescData(component, event, helper);
        
    },
    
    handleListItem: function (component, event, helper) {
        if (event.target.dataset.value) {
            console.log("<<<<<event.target.dataset.value"+event.target.dataset.value);
            // let allData = component.get("v.allData");
            component.set("v.selectedValue", event.target.dataset.value);
            component.set("v.showListItems", false);
            //component.set("v.toggleSort", false);
            
            helper.handleAscOrDescData(component, event, helper);
        }
    },
    
    closeListItemsSection: function (component, event, helper) {
        window.setTimeout(
            $A.getCallback(function () {
                component.set("v.showListItems", false);
                console.log('Toggle on Blur event');
            }), 250);
    },
    
    toggleListItems: function (component, event, helper) {
        console.log('<<<showListItems>>>>' + component.get("v.showListItems"));
        if (component.get("v.showListItems")) {
            component.set("v.showListItems", false);
        }
        else {
            component.set("v.showListItems", true);
        }
        console.log('<<<showListItems>>>>' + component.get("v.showListItems"));
        //helper.filterRecords(component, event, helper);
    },
    
    next: function (component, event, helper) {
        let pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber + 1);
        helper.setPageDataAsPerPagination(component, event, helper);
    },
    
    previous: function (component, event, helper) {
        let pageNumber = component.get("v.currentPageNumber");
        component.set("v.currentPageNumber", pageNumber - 1);
        helper.setPageDataAsPerPagination(component, event, helper);
        
    },
    
    downloadfile: function (component, event, helper) {
        let CDIdsLsts = event.target.getAttribute("id");
        console.log('CDIdsLsts>>>>>>>>>>>>>>>>>>>>>>',CDIdsLsts);
        let CDIdsLst = event.target.getAttribute("id").split(",").join("/");
        console.log('<<<$A.get("$Label.c.Broker_Download_URL")>>>'+$A.get("$Label.c.Broker_Download_URL"));
        if (CDIdsLst) {
            // console.log('<<<URL>>>>'+$A.get("$Label.c.Broker_Download_URL") + '/sfc/servlet.shepherd/document/download/' + CDIdsLst + '?operationContext=S1')
            window.location.href = $A.get("$Label.c.Broker_Download_URL") + '/sfc/servlet.shepherd/document/download/' + CDIdsLst + '?operationContext=S1';
            
        }
    },

  previewFiles: function(component, event, helper) {
        let instaId = event.target.getAttribute("id").split(",");
        component.set("v.InstaTotalDoc ",instaId);
        console.log('<<<instaId>>>>', instaId);
        // Set isModalOpen attribute to true
        component.set("v.isModalOpen", true);
    },
    
    handleMobileSort: function (component, event, helper) {
        console.log('<<<<inside handleMobileSort >>>');
        let toggleSortValue = component.get("v.toggleSort");
        console.log('<<<<toggleSortValue>>>'+toggleSortValue);
        let allDataInDescOrder = component.get("v.allData");
        if(!toggleSortValue){
            component.set("v.toggleSort", true);
            //component.set("v.dataInAscOrder", true);
            helper.sortDataInAscOrder(component, event, helper);
        }
        else{
            component.set("v.toggleSort", false);
            //component.set("v.dataInAscOrder", false);
            helper.filterRecords(component, event, helper, allDataInDescOrder);
        }
        
    },
    
    /*doRefresh : function(component, event) {
        console.log('param1>>>');
        var params = event.getParam('arguments');
        console.log('param1>>>',params);
        if (params) {
            var param1 = params.param1;
            console.log('param1>>>',param1);
            if(param1 == 'TRUE')
            {
                $A.get('e.force:refreshView').fire();
            }
        }
    }*/
    
    
    openModel: function(component, event, helper) {
        // Set isModalOpen attribute to true
        component.set("v.isModalOpen", true);
    },
    
    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalOpen", false);
    },
    
   
    nextdoc: function (component, event, helper) {
        console.log('<<<<<<<<<<<<next>>>>>>>>>>>>>>>>');
        component.set("v.truthy",false);
        var desktopList = component.get("v.InstaTotalDoc");
        console.log('<<<<<<<<<<<<desktopList>>>>>>>>>>>>>',desktopList);
        var end = component.get("v.endPage");
        console.log('<<<<<<<<<<<<end>>>>>>>>>>>>>',end);
        var start = component.get("v.startPage");
        console.log('<<<<<<<<<<<<start>>>>>>>>>>>>>',start);
        var pageSize = component.get("v.pageSize");
        console.log('<<<<<<<<<<<<pageSize>>>>>>>>>>>>>',pageSize);
        console.log('length',desktopList.length);
        var PagList = [];
        var counter = 0;
        for ( var i = end + 1; i < end + pageSize + 1; i++ ) {
            if ( desktopList.length > i) {
                PagList.push(desktopList[i]);
            }
            console.log('pagList>>>>>>>>>>>>',PagList);
            counter ++ ;
        }
        start = start + counter;
        end = end + counter;
        component.set("v.startPage", start);
        component.set("v.endPage", end);
        component.set('v.dektopBannerList', PagList);
    },
    previousdoc: function (component, event, helper) {
        console.log('<<<<<<<<<<<<<<<previous>>>>>>>>>>>>>>>>>>>');
        component.set("v.truthy",false);
        var desktopList = component.get("v.InstaTotalDoc");
        console.log('<<<<<<<<<<<<<<<desktopList>>>>>>>>>>>>>>>>>>>',desktopList);
        var end = component.get("v.endPage");
        
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var PagList = [];
        var counter = 0;
        for ( var i= start-pageSize; i < start ; i++ ) {
            if ( i > -1 ) {
                PagList.push(desktopList[i]);
                counter ++;
            }else {
                start++;
            }
        }
        start = start - counter;
        console.log(start);
        end = end - counter;
        console.log(end);
        component.set("v.startPage", start);
        component.set("v.endPage", end);
        component.set('v.dektopBannerList', PagList);
    },
    buttonClick : function(component, event, helper) {
        console.log('<<<<<<<<<<<buttonClick>>>>>>>>>>');
        component.set("v.truthy",false);
        console.log('<<<<<<<<<<<truthy>>>>>>>>>>');
        var index = event.target.getAttribute("data-nag-index");
        console.log('<<<<<<<<<<<index>>>>>>>>>>',index);
        helper.nextClick(component, event, parseInt(index));
        
    }
    
    
})