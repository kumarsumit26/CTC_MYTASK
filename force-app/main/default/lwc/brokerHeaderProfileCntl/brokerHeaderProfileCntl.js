import { api, LightningElement, track } from 'lwc';
import communityBasePath from '@salesforce/community/basePath';
import { NavigationMixin } from 'lightning/navigation';
import Broker_Feedback_Icon from '@salesforce/resourceUrl/Broker_Feedback_Icon';
import Broker_Feedback_URL from '@salesforce/label/c.Broker_Feedback_URL';
import Broker_logout_URL from '@salesforce/label/c.Broker_logout_URL';


export default class BrokerHeaderProfileCntl extends NavigationMixin(LightningElement) {
    @track Open = false;
    @track selectedOption;
    @track isModalOpen;
    @track dropdownlist = false;
    @api dropdownlist;
    @track options = ['Home', 'My Profile', 'My Settings', 'Logout'];
    @track userInfo = String;
    Broker_Feedback_Iconurl = Broker_Feedback_Icon;
     
    label = {
        Broker_Feedback_URL
    }

    drop(event) {
        console.log('in drop>>>>>>>>>>>');
        if (this.Open == false) {
            this.Open = true;
        }
        else {
            this.Open = false;
        }
    }

    handleClick(event) {
        console.log('inside of function');
        console.log("base url" + communityBasePath);
        let targetId = event.target.dataset.targetId;
        console.log('get name ' + targetId);
        if (targetId == 'Home') {
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: communityBasePath + '/' //home
                },
            });
        }
        if (targetId == 'Logout') {
            window.location.replace(Broker_logout_URL);
        }
        
    }
}