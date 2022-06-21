({
    handleClick: function (component, event, helper) {
        console.log('Notification>>>>>>>>>>>>>>');
        component.set("v.openModal", true);
    },
    closeOpenModal: function (component, event, helper) {
        console.log('Notification>>>>>>>>>>>>>>');
        component.set("v.openModal", false);
    }
})