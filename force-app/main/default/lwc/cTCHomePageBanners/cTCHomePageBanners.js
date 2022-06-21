import { LightningElement, track, api, wire } from 'lwc';
import getPromoBanner from '@salesforce/apex/CTCHomePageBannersController.getPromoBanner';

export default class CTCHomePageBanners extends LightningElement {
    @track value = 'next';
    autoScroll = true;
    scrollDuration = 5000;
    @track banners;
    @track error;
    @track desktopBannerLength;
    @track pageSize = 1;
    @track startPage;
    @track endPage;
    @track dektopBannerList;
    @track autoRotate = true;
    @track stopNext = false;
    @track stopPrevious = true;
    @track desktopBannerSize;
    @track bannerIntervals;
    @track desktopList;
    @track progress = 5000;
    // @track bullet;
    
      @wire(getPromoBanner)
    promoBannerList({ error, data }) {
        console.log('Banners>>>>>', data);
        if (data) {
            this.banners = data;
            this.desktopBannerSize = this.banners.desktopBannerId.length;
            console.log('check length>>>>>>>' + this.banners.desktopBannerId.length);
            for (var i = 0; i < this.desktopBannerSize; i++) {
                this.PageList.push(this.banners.desktopBannerId[i]);
            }
            console.log('check data length' + JSON.stringify(this.PageList));

            if (this.banners.desktopBannerId.length > 1) {
                this.desktopBannerLength = true;
            }
            else {
                this.desktopBannerLength = false;
            }
            this.startPage = 0;
            this.endPage = this.pageSize - 1;
            var PagList = [];
            var i = 0;
            if (this.banners.desktopBannerId.length > i) {
                for (var i = 0; i < this.pageSize; i++) {
                    this.PagList.push(this.banners.desktopBannerId[i]);
                }
                this.dektopBannerList = this.PagList;
            }
           
            this.error = undefined;
        } else if (error) {
            this.error = error;
            console.log('error>>>>>', error);
            this.banners = undefined;
        }

    }

    connectedCallback() {
        if (this.value == 'next') {
            if (this.autoScroll) {
                this.timer = window.setInterval(() => {
                    this.next();
                }, Number(this.scrollDuration));
            }
        }
        else if (this.value == 'previous') {
            if (this.autoScroll) {
                this.timer = window.setInterval(() => {
                    this.previous();
                }, Number(this.scrollDuration));
            }
        }

         //bullet = this.endPage + 0 / this.pageSize == index;
    }


    disconnectedCallback() {
        if (this.autoScroll) {
            window.clearInterval(this.timer);
        }
    }

    previous() {
        console.log('inside previous');
        var desktopList = this.banners.desktopBannerId;
        var end = this.endPage;
        var start = this.startPage;
        var pageSize = this.pageSize;
        console.log(pageSize);
        var PagList = [];
        var counter = 0;
        for (var i = start - pageSize; i < start; i++) {
            if (i > -1) {
                PagList.push(desktopList[i]);
                counter++;
            } else {
                start++;
            }
        }
        start = start - counter;
        console.log(start);
        end = end - counter;
        console.log(end);
        this.startPage = start;
        this.endPage = end;
        this.dektopBannerList = PagList;
        if (this.endPage + 1 <= this.desktopBannerSize) {
            this.stopNext = false;
        }
        if (this.startPage == 0) {
            this.stopPrevious = true;
            this.value = 'next';
            this.disconnectedCallback();
            this.connectedCallback();
        }
        else {
            this.stopPrevious = false;
        }
    }
    next() {
        var desktopList = this.banners.desktopBannerId;
        var end = this.endPage;
        var start = this.startPage;
        var pageSize = this.pageSize;
        console.log(pageSize);
        var PagList = [];
        var counter = 0;
        for (var i = end + 1; i < end + pageSize + 1; i++) {
            if (desktopList.length > i) {
                PagList.push(desktopList[i]);
            }
            console.log('pagList', PagList);
            counter++;
        }
        start = start + counter;
        end = end + counter;
        this.startPage = start;
        this.endPage = end;
        this.dektopBannerList = PagList;
        console.log('EndPAge>>>', this.endPage);
        if (this.endPage + 1 >= this.desktopBannerSize) {
            this.stopNext = true;
            this.value = 'previous';
            this.disconnectedCallback();
            this.connectedCallback();

        }
        if (this.startPage == 0) {
            this.stopPrevious = true;

        }
        else {
            this.stopPrevious = false;
        }
    }

    buttonClick(event) {
        console.log('>>>>insidebuttonclick<<<<');
        this.Number = event.target.value;
        let index = event.target.dataset.index;
        console.log('index>>>');
        console.log(index);
        i = index;
        this.desktopList = this.banners.desktopBannerId;
        console.log('desktopList')
        this.startPage = i;
        this.endPage = i;
        this.dektopBannerList = desktopList[i];
        console.log('dektopBannerList')
        const divs = this.template.querySelectorAll('slds-button');
        console.log('divs length' + divs.length);
        Array.from(divs).forEach((div) => {
            const index = Number(div.getAttribute('indx'));
            console.log('index>>>', index);
        });

    }
    // this.index = event.target.dataset.banner.recordId;
    //     console.log('bannerindex', index);

    // bulletClick(event){
    //     if(((endPage+0)/pageSize)==index){
    //             return this.bulletClick;
    //         }
    // }
}