import { LightningElement , track,api} from 'lwc';
import myResource from '@salesforce/resourceUrl/CTC_LOGO';
import myResourceMenu from '@salesforce/resourceUrl/BrokerMenuIcon';

export default class CTC_HomePageHeader extends LightningElement {
    CTC_LOGOurl= myResource;
    BrokerMenuIcon = myResourceMenu;
    @track label;
    @api menuItems;
    @track int;
    @track menuItem;
    @track isOpen = false;

    @track openSearchBar= false;

    openModel (event) {
        this.isOpen = true;
    }
    closeModel (event) {
        this.isOpen = false;
    }
    openSearchModel(event) {
        this.openSearchBar = true;
    }
    closeSearchModel(event) {
        this.openSearchBar = false ;
    }
    navigateToMenu(event) {
        console.log("menuItems****************"+JSON.stringify(this.menuItems));
        console.log('inside Lwc comp');
        console.log('check param'+ event.target.dataset.menuItemId);
        this.dispatchEvent(new CustomEvent('navigateto', {
            detail: {
                menuItemId : event.target.dataset.menuItemId
                
            }
        }));  
    }
    handleNavigation(event){
        console.log("menuItems>>>>>>>>>>>>>"+JSON.stringify(this.menuItems));
        console.log('inside parent lwc component');
        var id = event.detail.menuItemId;
        var gettabName = event.detail.tabName;
        console.log('get tabname in parent lwc>>>>>>>'+gettabName);
        console.log('check id in parent lwc comp>>>>>>>>'+ id);
        
        this.dispatchEvent(new CustomEvent('navigateto', {
            detail: {
                menuItemId : id,
                name : gettabName
                
            }
        }));

    }
}


// import { LightningElement, track } from 'lwc';
// import CTC_LOGO from '@salesforce/resourceUrl/CTC_LOGO';
// import BrokerMenuIcon from '@salesforce/resourceUrl/BrokerMenuIcon';
// export default class CTC_HomePageHeader extends LightningElement {
//     CTC_LOGOurl= CTC_LOGO;
//     BrokerMenuIconurl= BrokerMenuIcon;

//     @track openSearchBar=false;
//     @track isOpen=false;
//     @track openSearchBar=false;

//     openModel(event) {
//         // for Display Model,set the "isOpen" attribute to "true"
//         this.isOpen=true;
//     }
    
//     closeModel(event) {
//         // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
//        // component.set("isOpen", false);
//         this.isOpen=false;
//     }

//     openSearchModel(event){
//         //console.log('Id>>>>>openSearchModel>>>>');
//        // component.set("openSearchBar", true);
//        this.openSearchBar= true; 
//     }

//     closeSearchModel(event) {
//        // component.set("openSearchBar", false);
//         this.openSearchBar= false; 
//     }
   
// }