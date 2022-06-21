({
	inlineEditName : function(component, event, helper) {
        component.set("v.EditMode", true); 
        setTimeout(function(){ 
            component.find("inputId").focus();
        }, 100);
    },
     onNameChange : function(component,event,helper){ 
        // if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value") != undefined && event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
 	closeNameBox : function (component, event, helper) {
        // on focus out, close the input section by setting the 'nameEditMode' att. as false   
        component.set("v.EditMode", false); 
        // check if change/update Name field is blank, then add error class to column -
        // by setting the 'showErrorClass' att. as True , else remove error class by setting it False   
        if(event.getSource().get("v.value") != undefined && event.getSource().get("v.value").trim() == ''){
            component.set("v.showErrorClass",true);
        }else{
            component.set("v.showErrorClass",false);
        }
    },
  
    
    inlineEditRating : function(component, event, helper) {
        component.set("v.EditRating", true); 
        setTimeout(function(){ 
            component.find("inputId1").focus();
        }, 100);
    },
     onRatingChange : function(component,event,helper){ 
        // if edit field value changed and field not equal to blank,
        // then show save and cancel button by set attribute to true
        if(event.getSource().get("v.value") != undefined && event.getSource().get("v.value").trim() != ''){ 
            component.set("v.showSaveCancelBtn",true);
        }
    },
 	closeRatingBox : function (component, event, helper) {
        // on focus out, close the input section by setting the 'nameEditMode' att. as false   
        component.set("v.EditRating", false); 
        // check if change/update Name field is blank, then add error class to column -
        // by setting the 'showErrorClass' att. as True , else remove error class by setting it False   
        if(event.getSource().get("v.value") != undefined && event.getSource().get("v.value").trim() == ''){
            component.set("v.showErrorClass",true);
        }else{
            component.set("v.showErrorClass",false);
        }
    },
})