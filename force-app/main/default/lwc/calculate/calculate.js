import { LightningElement,track } from 'lwc';

export default class Calculate extends LightningElement {

    @track First;
    @track Second;
    @track Third;
    @track Forth;
    @track Five;

    First(event){
        this.Num1=event.target.value;
    }
    Second(event){
        this.Num2=event.target.value;
    }
    Third(event){
        this.Num3=event.target.value;
    }
    Forth(event){
        this.Num4=event.target.value; 
    }
    Five(event){
        this.Num5=event.target.value; 
    }

    NUM(event){
        const wh = event.target.name; 
        if(wh='Num1'){
            this.Num1=event.target.value; 
        }
        else if(wh='Num2'){
            this.Num2=event.target.value; 
        }
        else if(wh=='Num3'){
            this.Num3=event.target.value; 
        }
        else if(wh='Num4'){
            this.Num4=event.target.value; 
        }
        else{
            this.Num5=event.target.value; 
        }

    }


    calculate(event){
        const a = parseInt(this.Num1);
        const b = parseInt(this.Num2); 
        const c = parseInt(this.Num3);
        const d = parseInt(this.Num4);
        const e = parseInt(this.Num5);
        if(c!=null){
            c=this.c*10/100;
            c=this.d;
        }else if(this.e=a+b){
           this.e=this.Num5;
        }
        else{
            alert('Error');
        }

    }
    clear(event){
        this.Num1='';
        this.Num2='';
        this.Num3='';
        this.Num4='';
        this.Num5='';
    }


}