import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from "lightning/uiRecordApi";

const fieldsArray = [
    "Account.Name",
    "Account.BillingStreet",
    "Account.BillingCity",
    "Account.BillingPostalCode",
    "Account.BillingState",
    "Account.BillingCountry",
];

export default class AccountMap extends LightningElement {
    @api recordId;
     mapMarkers = [];

    accountName;
    billingStreet;
    billingCity;
    billingPostalCode;
    billingState;
    billingCountry;

    @wire(getRecord, { recordId: "$recordId", fields: fieldsArray })
    wiredRecord({ error, data }) {
        if (data) {
            JSON.stringify('Data', data);
            this.billingCity = data.fields.BillingCity.value;
            console.log('billingCity>>>>>>>>>', this.billingCity);
            this.billingStreet = data.fields.BillingStreet.value;
            this.billingPostalCode = data.fields.BillingPostalCode.value;
            this.billingState = data.fields.BillingState.value;
            this.billingCountry = data.fields.BillingCountry.value;
            this.accountName = data.fields.accountName.value;


            const marker = {
                location: {
                    Street: this.billingStreet ? this.billingStreet : "",
                    City: this.billingCity ? this.billingCity : "",
                    State: this.billingState ? this.billingState : "",
                    PostalCode: this.billingPostalCode ? this.billingPostalCode : "",
                    Country: this.billingCountry ? this.billingCountry : "",
                },
                title: this.accountName ? this.accountName : ""
            }

            this.mapMarkers = [marker];
            console.log('{mapMarkers}>>>>>>>>>', this.mapMarkers);
            this.error = undefined;
        }
        else if (error) {
            this.mapMarkers = undefined;
            this.error = error;
        }
    }
}