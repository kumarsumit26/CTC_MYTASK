import { LightningElement, track } from 'lwc';
import getLoanstatusFromFeed from '@salesforce/apex/BrokerFieldTracking.getLoanstatusFromFeed';

export default class BrokerDealsFieldTracking extends LightningElement {
    @track residentialMortgageHistoryList;
    @track error;
    @track showSpinner = false;
    connectedCallback() {
        console.log('-----Test Git--------');
        this.showSpinner = true;
        console.log('this.showSpinner...' + this.showSpinner);
        getLoanstatusFromFeed().then(result => {
            console.log('result//' + result);
            this.residentialMortgageHistoryList = result;
            this.showSpinner = false;
        })
            .catch(error => {
                console.log('error-=-' + error);
                this.error = error;
                this.showSpinner = false;
            })
    }
}