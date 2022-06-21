import { LightningElement ,api,track,wire} from 'lwc';
import getDeal from '@salesforce/apex/MostRecentController.getDeal';
import getAllDeal from '@salesforce/apex/MostRecentController.getAllDeal';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';



export default class MostRecentDealCTC extends LightningElement {

    @api recordId;
    isloading;
    @track contactList;
    renderTable = false;

    connectedCallback() {
        this.isLoading = true;
        getDeal({ sourceAccount: this.recordId })
            .then(result => {
                this.contactList = result;
                if (this.contactList.length === 0) {
                    this.renderTable = false;
                }
                else {
                    this.renderTable = true;
                }
            })
            this.isLoading = false;
    }

    handleViewAll(event){
        this.isLoading = true;
        getAllDeal({ sourceAccount: this.recordId })
            .then(result => {
                this.contactList = result;
                if (this.contactList.length === 0) {
                    this.renderTable = false;
                }
                else {
                    this.renderTable = true;
                }
            })
            this.isLoading = false;

    }

    //To navigate to record edit page for selected record
    // navigateToRecordEditPage(event) {
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__recordPage',
    //         attributes: {
    //             recordId: event.currentTarget.dataset.recid,
    //             objectApiName: 'Contact',
    //             actionName: 'edit'
    //         }
    //     });
    // }

    //To delete the selected contact
    // deleteContact(event) {
    //     this.isLoading = true;
    //     deleteRecord(event.currentTarget.dataset.recid)
    //         .then(() => {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Success',
    //                     message: 'Record Is Deleted',
    //                     variant: 'success',
    //                 }),
    //             );
    //             this.connectedCallback();
    //             this.isLoading = false;
    //         })
    //         .catch(error => {
    //             this.dispatchEvent(
    //                 new ShowToastEvent({
    //                     title: 'Error',
    //                     message: error.message,
    //                     variant: 'error',
    //                 }),
    //             );
    //             this.connectedCallback();
    //             this.isLoading = false;
    //         });
    // }

     // To navigate to contact new functionality aura component
    //  navigateToNewPage() {
    //     const defaultValues = encodeDefaultFieldValues({
    //         AccountId: this.recordId

    //     });
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__objectPage',
    //         attributes: {
    //             objectApiName: 'Contact',
    //             actionName: 'new'
    //         },
    //         state: {
    //             defaultFieldValues: defaultValues
    //         }
    //     });
    // }


}