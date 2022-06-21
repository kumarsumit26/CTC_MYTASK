import { LightningElement, api, wire, track } from 'lwc';
import getPromoBanner from '@salesforce/apex/CTCHomePageBannersController.getPromoBanner';

export default class Demobanner extends LightningElement {
  @track PagList = [];
  @track PageList = [];
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

  @api autoScroll = false;
  @api customHeight = '';
  @api customWidth = '600px';
  @api hideNavigationButtons = false;
  @api hideNavigationDots = false;
  @api hideSlideNumber = false;
  @api hideSlideText = false;
  @api scrollDuration = 5000;

  slides = [];
  slideIndex = 1;
  timer;

  get maxWidth() {
    return 'width: ${this.customWidth}';
  }

  get maxHeight() {
    return 'height: ${this.customHeight}';
  }
  connectedCallback() {

  }
  @wire(getPromoBanner)
  promoBannerList({ error, data }) {
    console.log('Banners>>>>>', JSON.stringify(data));
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

      var i = 0;
      if (this.banners.desktopBannerId.length > i) {
        for (var i = 0; i < this.pageSize; i++) {
          this.PagList.push(this.banners.desktopBannerId[i]);
        }
        this.dektopBannerList = this.PagList;
      }
      console.log('geturl>>>>>>>>>>>>>>' + this.banners.desktopBannerId[0].url);
      console.log('bannerlist>>>>>>>>>>>>>>' + JSON.stringify(this.dektopBannerList));
      console.log('bannerlist>>>>>>>>>>>>>>' + JSON.stringify(this.PagList));
      this.error = undefined;
    } else if (error) {
      this.error = error;
      console.log('error>>>>>', error);
      this.banners = undefined;
    }
  }
}