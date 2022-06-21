import { LightningElement, track,api,wire } from 'lwc';
import initRecords from '@salesforce/apex/DataTableController.initRecords';
import getsObjectRecords from '@salesforce/apex/DataTableController.getsObjectRecords';


const columns = [{
    label: 'Province',
    fieldName: 'Province__c',
    sortable: true
},
{
    label: 'Municipality',
    fieldName: 'Municipality__c',
    sortable: true
},
{
    label: 'Appraiser Film',
    fieldName: 'Appraiser_Film__c',
    sortable: true
},
{
    label: 'Email',
    fieldName: 'Email__c',
    sortable: true,
    cellAttributes: { iconName: 'utility:email' }
},
{
    label: 'Phone',
    fieldName: 'Phone__c',
    sortable: true
}
];



export default class ApprovedAppraiser extends LightningElement {
    
     ObjectName = 'Approved_Appraiser__c';
     inlineEdit= true;
     enableColAction= true;
     pageSize =10;
     pageNumber=1;
     columns =[];
     sortedBy='Name';
     sortedDirection='';
     miniSearchKey= '';
     recordId;
     @track test = [];
     @api recordId;
     @track adjustBrokerDevice = '7';
     @track columns; 
     columns = columns;
     @track handlePrev = true;
     @track handleNext = true;
     totalNumberOfRows= 0;
     
     
     
    
    @wire(initRecords, { ObjectName : '$ObjectName',searchKey: '$miniSearchKey',Orderby:'$sortedBy',OrderDir:'$sortedDirection',inlineEdit:'$inlineEdit',enableColAction:'$enableColAction',pageSize:'$pageSize',pageNumber:'$pageNumber',adjustDevice:'$adjustBrokerDevice'})
    wiredApprovedData({data, error}){
        if(data){

            this.test = data.sobList;
            console.log('check data>>>>>>>>>>``12>>>.'+JSON.stringify(this.test));
            this.error = undefined;
           
        }
        else if (error) {
            this.error = error;
            this.contacts = undefined;
            console.log('check error message>>>>>>>>>>>>.'+JSON.stringify(this.error))
        }
        
    }

    // handleNext(){
    //     this.pageNumber = this.pageNumber+1;
    //     this.wiredApprovedData();
    // }
 
    // handlePrev(){
    //     this.pageNumber = this.pageNumber-1;
    //     this.wiredApprovedData();
    // }

    // get disableButtonRight(){
    //     return !(pageNumber*10 >= totalNumberOfRows);
    // }
    // get disableButtonLeft(){
    //     return !(pageNumber == 1);
    // }
    // get pagination(){
    //     return ({this.pageNumber == 1? '1 - '+((this.pageNumber-1)*this.pageSize+this.dataSize): ((this.pageNumber-1)*this.pageSize)+' - '+((this.pageNumber-1)*this.pageSize+dataSize)} of {this.totalNumberOfRows});
    // }
    
    
}