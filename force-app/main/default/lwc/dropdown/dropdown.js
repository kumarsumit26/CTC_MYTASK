import { LightningElement } from 'lwc';
// import { NavigationMixin } from 'lightning/navigation';
export default class Dropdown extends LightningElement {

    handleOnselect(event) {

        var selectedVal = event.detail.value;
        console.log( 'Selected button is ' + selectedVal );

        // this[NavigationMixin.Navigate]({
        //     type: 'standard__objectPage',
        //     attributes: {
        //         objectApiName: selectedVal,
        //         actionName: 'new'
        //     }
        // });

    }
}