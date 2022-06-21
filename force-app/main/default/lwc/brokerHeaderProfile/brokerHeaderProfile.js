import { LightningElement,track } from 'lwc';
export default class BrokerHeaderProfile extends LightningElement {

    @track selectedOption;
    @track isModalOpen;

    changeHandler(event) {
    const field = event.target.name;
    if (field === 'optionSelect') {
        this.selectedOption = event.target.value;
            alert("you have selected : ",this.selectedOption);
        } 
    }

    // @track isModalOpen = false;
    openModal() {
        console.log('retryug');
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        console.log('retryxsxug');
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        console.log('retrereyug');
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }




    //   handleClick : function(component, event, helper) {
    //     var userId = $A.get("$SObjectType.CurrentUser.Id");
    //     var source = event.getSource();
    //     var label = source.get("v.label");
    //     console.log('label'+label);
    //     if(label=="Home"){
    //         var navEvt = $A.get('e.force:navigateToURL');
    //         navEvt.setParams({url: '/'});
    //         navEvt.fire();
    //     } else if(label=="My Profile"){
    //         var urlEvent = $A.get("e.force:navigateToURL");
    //         urlEvent.setParams({ "url": "/user-profile/" });
    //         urlEvent.fire();
    //     }else if(label=="My Settings"){
    //         var navEvt = $A.get('e.force:navigateToURL');
    //         navEvt.setParams({url: '/settings/'+userId});
    //         navEvt.fire();
    //     }else if(label=="Logout"){
    //         let hostname = window.location.hostname;
	// 		console.log('window.location.hostname',window.location.hostname);
    //        // window.location.replace('https://preprod-questrade.cs123.force.com/BrokersPortal/secur/logout.jsp?retUrl=https%3A%2F%2Fpreprod-questrade.cs123.force.com%2FBrokersPortal%2FBrokerlogin');
    //         window.location.replace($A.get("$Label.c.Broker_logout_URL"));
    //         //window.location.replace("https://questrade.force.com/BrokersPortal/secur/logout.jsp?retUrl=https%3A%2F%2Fquestrade.force.com%2FBrokersPortal%2F%2FBrokerlogin");
    //         //window.location.replace('https://ctcstage-questrade.cs14.force.com/BrokersPortal/secur/logout.jsp?retUrl=https%3A%2F%2Fctcstage-questrade.cs14.force.com%2FBrokersPortal%2FBrokerlogin');
    //     }
        
    // }
}