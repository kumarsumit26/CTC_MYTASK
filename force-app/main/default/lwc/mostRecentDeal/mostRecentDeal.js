import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class MostRecentDeal extends LightningElement {
 
    @api recordId;
    isloading;
    @track Most_Recent_Deals__c;
    renderTable = false;

    connectedCallback() {
        this.isLoading = true;
        getContacts({ sourceAccount: this.recordId })
            .then(result => {
                this.Most_Recent_Deals__c = result;
                if (this.Most_Recent_Deals__c.length === 0) {
                    this.renderTable = false;
                }
                else {
                    this.renderTable = true;
                }
            })
            this.isLoading = false;
    }

    //To navigate to record edit page for selected record
    navigateToRecordEditPage(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.currentTarget.dataset.recid,
                objectApiName: 'Contact',
                actionName: 'edit'
            }
        });
    }

    //To delete the selected contact
    deleteContact(event) {
        this.isLoading = true;
        deleteRecord(event.currentTarget.dataset.recid)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record Is Deleted',
                        variant: 'success',
                    }),
                );
                this.connectedCallback();
                this.isLoading = false;
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error',
                    }),
                );
                this.connectedCallback();
                this.isLoading = false;
            });
    }

     // To navigate to contact new functionality aura component
     navigateToNewPage() {
        const defaultValues = encodeDefaultFieldValues({
            AccountId: this.recordId

        });
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
    }

}