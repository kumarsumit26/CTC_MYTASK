import { LightningElement,wire } from 'lwc';
import fetchMetaListLwc from '@salesforce/apex/lwcCustomMetaDataCtrl.fetchMetaListLwc';
const COLUMNS = [
    
    { label: 'Phone', fieldName: 'Appraiser_Film__c' },
    { label: 'Phone', fieldName: 'Province__c' },
    { label: 'Phone', fieldName: 'Municipality__c' },
    { label: 'Phone', fieldName: 'Fax__c' },
    { label: 'Email', fieldName: 'Email__c' },
  
];
export default class LwcFetchCustomMetaData extends LightningElement {
    records;
    wiredRecords;
    error;
    columns = COLUMNS;
    draftValues = [];
 
    @wire( fetchMetaListLwc )  
    wiredRecs( value ) {
 
        this.wiredRecords = value;
        const { data, error } = value;
 
        if ( data ) {
                        
            this.records = data;
            this.error = undefined;
 
        } else if ( error ) {
 
            this.error = error;
            this.records = undefined;
 
        }
 
    } 
}