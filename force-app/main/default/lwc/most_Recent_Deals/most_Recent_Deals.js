import { LightningElement,api, wire, track } from 'lwc';
// import getMostRecentList from '@salesforce/apex/MostRecentController.getDeal';
export default class Most_Recent_Deals extends LightningElement {

    @track columns = [
    {
        label: 'Deal #',
        fieldName: 'Deals__c',
        type: 'text',
        sortable: true
    },
    {
        label: 'Status',
        fieldName: 'Status__c',
        type: 'text',
        sortable: true
    },
    {
        label: 'Borrower Name',
        fieldName: 'Borrower_Name__c',
        type: 'text',
        sortable: true
    },
    {
        label: 'Property Address',
        fieldName: 'Property_Address__c',
        type: 'text',
        sortable: true
    },
    {
        label: 'Anticip. Fund Date',
        fieldName: 'Anticip_Fund_Date__c',
        type: 'Date',
        sortable: true
    },
    
    ];

    @track error;
    @track dealList ;
    // @wire(getMostRecentList)
    wiredAccounts({error, data}) {
        if (data) {
            this.dealList = data;
            console.log(this.dealList)
        } else if (error) {
            this.error = error;
        }
    }
    
}