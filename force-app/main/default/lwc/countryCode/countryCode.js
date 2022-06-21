import { LightningElement,api,track } from 'lwc';
import intlTellinputjs from '@salesforce/resourceUrl/intlTellinputjs';
import utils from '@salesforce/resourceUrl/utils';
import intlTellinputcss from '@salesforce/resourceUrl/intlTellinputcss';
import democss from '@salesforce/resourceUrl/democss';
import flags from '@salesforce/resourceUrl/flags';
import {loadScript,loadStyle} from 'lightning/platformResourceLoader';
import { createRecord } from 'lightning/uiRecordApi';

export default class CountryCode extends LightningElement {
@api CountryName ='';   
@track inputElem; 
@track iti;

connectedCallback(){
    loadStyle(this,democss)
    .then(() => {

    });

    loadStyle(this,intlTellinputcss)
     .then(() => {

     });

     loadScript(this,utils)
     .then(()=> {

     });

     loadScript(this,intlTellinputjs)
     .then(() =>{
         this.inputElem = this.template.querySelector("[data-id= country]")
         window.intlTelInput(this.inputElem, {
             utilsScript: utils,
             initialCountry: "IN",
             preferredCountries: ['IN'],
         })
     })
}


// value = 'Country-Code';

//     get options() {
//         return [
//                 {label:"Norway (+47)" ,value: "+47"},
//                 {label:"UK (+44)" , value: "+44"},
//                 {label:"Algeria (+213)" , value:"+213"},
//                 {label:"Andorra (+376)" , value: "+376"},
//                 {label:"Angola (+244)" , value: "+244"},
//                 {label:"Anguilla/Barbuda (+1264)" , value: "+1264"},
//                 {label:"Argentina (+54)" , value: "+54"},
//                 {label:"Armenia (+374)" , value: "+374"},
//                 {label:"Aruba (+297)" , value: "+297"},
//                 {label:"Australia (+61)" , value: "+61"},
//                 {label:"Austria (+43)" , value: "+43"},
//                 {label:"Azerbaijan (+994)" , value: "+994"},
//                 {label:"Bahamas (+1242)" , value: "+1242"},
//                 {label:"Bahrain (+973)" , value: "+973"},
//                 {label:"Bangladesh (+880)" , value: "+880"},
//                 {label:"Barbados (+1246)" , value: "+1246"},
//                 {label:"Belarus (+375)" , value: "+375"},
//                 {label:"Belgium (+32)" , value: "+32"},
//                 {label:"Belize (+501)" , value: "+501"},
//                 {label:"Benin (+229)" , value: "+229"},
//                 {label:"Bermuda (+1441)" , value: "+1441"},
//                 {label:"Bhutan (+975)" , value: "+975"},
//                 {label:"Bolivia (+591)" , value: "+591"},
//                 {label:"Bosnia Herzegovina (+387)" , value: "+387"},
//                 {label:"Botswana (+267)" , value: "+267"},
//                 {label:"Brazil (+55)" , value: "+55"},
//                 {label:"Brunei (+673)" , value: "+673"},
//                 {label:"Bulgaria (+359)" , value: "+359"},
//                 {label:"Burkina Faso (+226)" , value: "+226"},
//                 {label:"Cambodia (+855)" , value: "+855"},
//                 {label:"Cameroon (+237)" , value: "+237"},
//                 {label:"Canada (+1)" , value: "+1"},
//                 {label:"Cape Verde Islands (+238)" , value: "+238"},
//                 {label:"Cayman Islands (+1345)" , value: "+1345"},
//                 {label:"Central African Republic (+236)" , value: "+236"},
//                 {label:"Chile (+56)" , value: "+56"},
//                 {label:"China (+86)" , value: "+86"},
//                 {label:"Colombia (+57)" , value: "+57"},
//                 {label:"Comoros (+269)" , value: "+269"},
//                 {label:"Congo (+242)" , value: "+242"},
//                 {label:"Cook Islands (+682)" , value: "+682"},
//                 {label:"Costa Rica (+506)" , value: "+506"},
//                 {label:"Croatia (+385)" , value: "+385"},
//                 {label:"Cuba (+53)" , value: "+53"},
//                 {label:"Cyprus North (+90392)" , value: "+90392"},

//         ];

//     }
//     handleChange(event) {
//         this.value = event.detail.value;
//     }


    strName;
    strEmail;
//     strCountryCode;
     strPhone;

    nameChangedHandler(event){
        this.strName = event.target.value;
    }
    emailChangedHandler(event){
        this.strEmail = event.target.value;
    }
    // countryCodeChangedHandler(event){
    //     this.strCountryCode = event.target.value;
    // }
    phoneChangedHandler(event){
        this.strPhone = event.target.value;
    }

    save(event){
        // this.inputElem = this.template.querySelector("[data-id= country]");
        // var iti = window.intlTelInputGlobals.getInstance(input);
        // var countryName = iti.getSelectedCountryData().name;
        // console.log(countryName);
        const name = document.getElementById('country').value;
        console.log(name);

       // var full_number = this.inputElem.getNumber(intlTelInputUtils.numberFormat.E164);
        console.log('<<<<full_number>>>>.')
        //console.log(full_number)
       // this.strPhone= this.strCountryCode + " " + this.strPhone;
       console.log(this.inputElem.value); 
        console.log('<<<<<<<strPhone>>>>>>>');
        //console.log(this.inputElem);
        
        
        // Creating mapping of fields of Account with values
        var fields = {'Name' : this.strName, 'Email__c' : this.strEmail,'Country_Code__c' : this.strCountryCode, 'Phone' : this.strPhone};
        // Record details to pass to create method with api name of Object.
        var objRecordInput = {'apiName' : 'Account', fields};
        console.log('<<<<<test>>>>>>');
        console.log('<<<<<<objRecordInput>>>>>>>>>>',objRecordInput);
        // LDS method to create record.
        // createRecord(objRecordInput).then(response => {
        //     alert('Record Save Successfully: ' +response.id);  
        //     this.strName=null;
        //     this.strCountryCode=null;
        //     this.strEmail = null;
        //     this.strPhone = null;
        // }).catch(error => {
        //     alert('Error: ' +JSON.stringify(error));
        // });
    }
}