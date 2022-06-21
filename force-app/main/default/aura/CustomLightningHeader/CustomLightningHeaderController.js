({
    doInit: function (component, event, helper) {
    },
    openModel: function (component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
    },

    closeModel: function (component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpen", false);
    },
    onClick: function (component, event, helper) {
        var id = event.target.dataset.menuItemId;
        if (id) {
            component.getSuper().navigate(id);
        }
        if (id == undefined) {
            var elements = document.getElementsByClassName("showDropDown");
            if (component.get("v.showRCTab")) {
                elements[0].style.display = 'none';
                component.set("v.showRCTab", false);
            } else {
                elements[0].style.display = 'block';
                component.set("v.showRCTab", true);

            }
        }
    },
    onClickParent: function (component, event, helper) {
        var id = event.target.dataset.menuItemId;
        if (id) {
            component.getSuper().navigate(id);
        }
    },
    openSearchModel: function (component, event, helper) {
        console.log('Id>>>>>openSearchModel>>>>');
        component.set("v.openSearchBar", true);

    },
    closeSearchModel: function (component, event, helper) {
        component.set("v.openSearchBar", false);

    },
    onClickIcon: function (component, event, helper) {
        console.log('>>>>onClickIcon value>>>>', event.currentTarget.getAttribute("data-attriVal"));
        var tabName = event.currentTarget.getAttribute("data-attriVal")
        var navEvt = $A.get('e.force:navigateToURL');
        if (tabName == 'Dashboard') {
            navEvt.setParams({ url: '/' });
        } else if (tabName == 'deal') {
            navEvt.setParams({ url: '/deal-list' });
        }
        else if (tabName == 'messageCentre') {
            navEvt.setParams({ url: '/messageCentre' });
        }
        else if (tabName == 'ContactUs') {
            navEvt.setParams({ url: '/contact-us' });
        }
        navEvt.fire();
    },

    handleNavigation: function (component, event) {
        console.log('inside the aura comp');
        var id = event.getParam("menuItemId");
        var id1 = 1;
        console.log('id>>>>>>>>>>' + id);
        if (id) {
            component.getSuper().navigate(id);
        }
        var tabName = event.getParam("name");
        console.log('get tabname in aura' + tabName);
        var navEvt = $A.get('e.force:navigateToURL');
        if (tabName == 'Dashboard') {
            navEvt.setParams({ url: '/' });
        } else if (tabName == 'deal') {
            navEvt.setParams({ url: '/deal' });
        }
        else if (tabName == 'messageCentre') {
            navEvt.setParams({ url: '/message-centre' });
        }
        else if (tabName == 'ContactUs') {
            navEvt.setParams({ url: '/contactus' });
        }
        navEvt.fire();
    },
})