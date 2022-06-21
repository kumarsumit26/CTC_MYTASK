({
    openModel: function(component, event, helper) {
        // Set isModalOpen attribute to true
        component.set("v.isModalOpen", true);
    },
    
    closeModel: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalOpen", false);
    }, 
    closeModel1: function(component, event, helper) {
        // Set isModalOpen attribute to false  
        component.set("v.isModalOpen1", false);
    }, 
    activeButton : function(component, event, helper){
        var checkCmp=component.set('v.checkbox',true);
        var inputText =component.find('txtName').get('v.value');
        var inputText1 =component.find('txtEmail').get('v.value');
        var inputText2 =component.find('txtCnfmEmail').get('v.value');
        var check = component.find("checkbox").get('v.value');
        var checkCmp = component.get('v.checkbox');
        var email = component.get('v.email')
        console.log('email--------',email);
        var confirmemail = component.get('v.confirmemail');
        console.log('confirmemail',confirmemail);
        var confEmail = component.find('txtCnfmEmail');
        console.log('inputText---------',inputText);
        console.log('inputText1---------',inputText1);
        console.log('inputText2---------',inputText2);
        console.log('check---------',check);
        component.set('v.isButtonActive',false);
        if(inputText != null && inputText1 != null && inputText2 !=null && (email == confirmemail) ){
            confEmail.setCustomValidity('');
            component.set('v.isButtonActive',false);
        }else{   
            confEmail.setCustomValidity('Please make sure your email match');
            component.set('v.isButtonActive',true);    
        }
    },
    
    Send : function(component, event, helper) {
        console.log('start main');
        //var email=helper._e('txtEmail').value;
        var email=component.get("v.email");
        // console.log('email=======',mail);
        console.log("start");
        //var email=this._e('txtEmail').value;
        
        var action=component.get("c.processEmail");
        action.setParams({
            email:email,
        })
        action.setCallback(this,function(e){
            if(e.getState()=='SUCCESS'){
                var result=e.getReturnValue();
                console.log(result);
                if(result=='Success'){
                    //alert('Email Request Send Successfully!');
                    component.set('v.name',null),
                        component.set('v.email',null),
                        // console.log('email====123456===',email);
                        //var mail = componenet.get('!v.email');
                        component.set('v.confirmemail',null),
                        component.set('v.checkbox',null);
                }
                else{
                    alert(result);
                }
            }
            else{
                alert(JSON.stringify(e.getError()));
            }
        });
        $A.enqueueAction(action); 
        component.set("v.isModalOpen", false);
        component.set("v.isModalOpen1", true);
        component.set("v.status",'Email Sent');
        
        
        
        // Save records
        helper.helperinstashare(component);    
    },
    handleKeyUp: function (cmp, evt) {
        var isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            var queryTerm = cmp.find('enter-search').get('v.value');
            alert('Searched for "' + queryTerm + '"!');
        }
    },
    
    showSpinner: function(component, event, helper) {        
        component.set("v.Spinner", true); 
    },
    
    hideSpinner : function(component,event,helper){        
        component.set("v.Spinner", false);
    },
    
    init: function (component, event, helper) {
        var columns = [
            {label: 'Name', fieldName: 'Name__c', type: 'text'},
            {label: 'Email', fieldName: 'Email__c', type: 'text'},
            {label: 'Status', fieldName: 'Status__c', type: 'text'},
            
        ];
            component.set('v.columns',columns);
            var action = component.get('c.getList');
            action.setCallback(this,function(response){
            var state = response.getState();
            console.log('state',state);
            
            if(state=='SUCCESS'){
            	var result = response.getReturnValue();
            	console.log('res',result);
            	component.set('v.data',result);
            }
            });
            $A.enqueueAction(action);
            },
            
            
            
})