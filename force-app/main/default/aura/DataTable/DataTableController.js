({
	doInit : function(component, event, helper) {
        var coloumn = [
            {label:"Name",fieldName:"Name", type:"text",editable: true},
            {label:"Rating",fieldName:"Rating", type:"text",editable: true},
  			{label:"Industry",fieldName:"Industry", type:"text",editable: true},
  			{label:"Phone",fieldName:"Phone", type:"text",editable: true},
  
        ];
        component.set("v.col",coloumn);
        var action = component.get('c.fetchAccount');
        action.setCallback(this,function(response){
        var state = response.getState();
        console.log('state',state);
        //alert(state);
        if(state=='SUCCESS' || state == 'DRAFT'){
           var res = response.getReturnValue();
           console.log('res',res);
           component.set("v.data",res);
             console.log('res');
    }
    });
    $A.enqueueAction(action);
	},
            
            

   
        Save : function(component, event, helper) {
        // Check required fields(Name) first in helper method which is return true/false
        if (helper.requiredValidation(component, event)){
            // call the saveContact apex method for update inline edit fields update 
            var action = component.get("c.saveAccount");
            action.setParams({
                lstName: component.get("v.data")
            });
            action.setCallback(this, function(response) {
                console.log(response.getError()+"error");
                if ( response.getState() == "SUCCESS") {
                    // set ContactList list with return value from server.
                    console.log(response.getReturnValue()+"result");
                    component.set("v.data", response.getReturnValue());
                    // Hide the save and cancel buttons by setting the 'showSaveCancelBtn' false 
                    component.set("v.showSaveCancelBtn",false);
                    alert('Updated...');
            console.log("Successs");
                }
            });
            $A.enqueueAction(action);
        } 
    },
    
    Cancel : function(component,event,helper){
        // on cancel refresh the view (This event is handled by the one.app container. It’s supported in Lightning Experience, the Salesforce app, and Lightning communities. ) 
        var action = component.get("c.fetchAccount");
        action.setCallback(this, function(response) {
            
            if (response.getState() === "SUCCESS") {
                // set ContactList list with return value from server.
                component.set("v.data", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        component.set("v.showSaveCancelBtn",false);
    } 
    
})