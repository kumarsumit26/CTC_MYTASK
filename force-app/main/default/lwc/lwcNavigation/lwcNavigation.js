import { LightningElement,track,api } from 'lwc';

export default class LwcNavigation extends LightningElement {

    @track label;
    @api menuItems;
    @track int;
    @track menuItem;
   // @api menuItemId;
   // @api labelHome = false;
   // @track labelDeal;

    //    labelHome(){
    //     console.log('menuItems>>>>>>>>>.'+JSON.stringify(this.menuItems));
    //     this.menuItems.forEach(element => {
    //         console.log('inside element>>>>>>>.'+element.label);
    //         if(element.label === 'Home')
    //             console.log('inside element****************.'+element.label);
    //             console.log("Inside If");
    //             this.label = 'Home';
    //             console.log('checklabel>>>>>>>>>>>>'+ this.label);
    //             // this.labelHome = true;
    //             // console.log('inside home check****************.'+this.labelHome);
    //             return true;
           
    //     });

            
    // }

    // connectedCallback(){
    //    console.log('menuItems>>>>>>>>>'+this.menuItems);
    //     this.menuItems.forEach(element => {
    //         if(element.label == 'Home'){
    //             this.labelhome=true;
    //         }
           
    //         if(element.label == 'Deal'){
    //             this.labelDeal = true;
    //         }
            

    //     });

    // }
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