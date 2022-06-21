import { LightningElement, api, track, wire } from 'lwc';
import getCTCCafeAlerts from '@salesforce/apex/cTC_HomePageCafeAlertsCtrl.getCTCCafeAlerts';
export default class CTC_HomePageCafeAlerts extends LightningElement {
    alertsHistoryList;
    showSpinner ;
    @api getTitle;
    totalRecords = true;
    @api alertComponentName;
    @track TotalList;
    allAlerts;
    @track title =[];
    

    @wire(getCTCCafeAlerts) wiredAccounts({ data, error }) {

        if (data) {
            this.allAlerts = data;
            for(let i=0; i<this.allAlerts.length; i++){
                this.title = this.allAlerts;

                console.log('title<<<>>>',this.title);
                console.log('<<<<All Data>>>>',this.allAlerts[i]);
                console.log('<<<<All Data>>>>',this.allAlerts[i].Title__c);
            }
            
            console.log('all<<<>>>',this.allAlerts);

        }
        else if (error) {
            console.log(error);
        }
    }

    totalRecords(){ 
        if (totalRecords > 0){
            this.totalRecords=true;
        }
    }

    get allTitle(){
        for(let i=0; i<this.allAlerts.length; i++){
            this.title = this.allAlerts[i].Title__c;
            if(this.title != ''){
                console.log('title if>>>>>>',this.title );
                return true;

            }
            else{
                console.log('title else>>>>>>',this.title );
                return false;
            }     
        }
    }

}