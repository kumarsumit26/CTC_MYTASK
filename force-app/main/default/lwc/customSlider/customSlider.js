import { api, LightningElement, track ,wire} from 'lwc';
    import getPromoBanner from '@salesforce/apex/CTCHomePageBannersController.getPromoBanner';
    export default class CustomSlider extends LightningElement {
        @api autoScroll = false;
        @api customHeight = '';
        @api customWidth = '600px';
        @api hideNavigationButtons = false;
        @api hideNavigationDots = false;
        @api hideSlideNumber = false;
        @api hideSlideText = false;
        @api scrollDuration = 5000;
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
        slides = [];
        slideIndex = 1;
        timer;

        @track PageList = [];

        @wire(getPromoBanner)
        promoBannerList({ error, data }) {
            console.log('Banners>>>>>', data);
            // console.log('Banners>In JSON.parse formate>>>>', JSON.parse(result));
            if (data) {
                this.banners = data;
                    this.desktopBannerSize = this.banners.desktopBannerId.length;
                    console.log(' this.banners---1',this.banners);
                    console.log(' this.banners.desktopBannerId---2',this.banners.desktopBannerId);
                    console.log('this.dektopBannerList ---- 3', this.desktopBannerSize);
                    console.log('this.dektopBannerList>> Index>>>>',this.banners.desktopBannerId[0]);
                    this.slideData =this.banners.desktopBannerId;
                    console.log('this.this.slideData>>>>>this.slideData>>>>>>>this.slideData>>>>>>>>>',this.slideData);

                
                // this.desktopBannerSize = this.banners.desktopBannerId.length;
                // if (this.banners.desktopBannerId.length > 1) {
                //     this.desktopBannerLength = true;
                // }
                // else {
                //     this.desktopBannerLength = false;
                // }
                // this.startPage = 0;
                // this.endPage = this.pageSize - 1;
                // var PagList = [];
                // var i = 0;
                // if (this.banners.desktopBannerId.length > i) {
                //     for (var i = 0; i < this.pageSize; i++) {
                //         PagList.push(this.banners.desktopBannerId[i]);
                //         this.PageList.push(this.banners.desktopBannerId[i]);
                //     }
                //     this.dektopBannerList = PagList;
                   
                //     console.log('this.dektopBannerList>>>>>>>>>>>>>>>>>>>>>',this.dektopBannerList);
                //    console.log('pagelist>>>>>>>>>>>>>>>>>>>>>',this.PageList);
                // }
                this.error = undefined;
            } else if (error) {
                this.error = error;
                console.log('error>>>>>', error);
                this.banners = undefined;
            }
      
        }


       



        // slideData = [
        //     {
        //         "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
        //         "heading": "Slide 1",
        //         "description": "Some description for slide 1"
        //     },
        //     {
        //         "image": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        //         "heading": "Slide 2",
        //         "description": "Some description for slide 2"
        //     }
        // ]

        get maxWidth() {
            return 'width: ${this.customWidth}';
        }
        get maxHeight() {
            return 'height: ${this.customHeight}';
        }

        @api
        get slideData() {
            console.log('this.slides>>>>',this.slides);
            return this.slides;
        }
        set slideData(data) {
            console.log('data>>>>>>>>>>>',data);
            this.slides = data.map((slide, i) => {
                console.log('this.slides>>>>>>>>>>>',this.slides);
                if (i === 0) {
                    return {
                        ...slide,
                        index: i + 1,
                        slideClass: 'fade slds-show',
                        dotClass: 'dot active'
                    };
                }
                return {
                    ...slide,
                    index: i + 1,
                    slideClass: 'fade slds-hide',
                    dotClass: 'dot'
                };
            });
        }



        connectedCallback() {
            if (this.autoScroll) {
                this.timer = window.setInterval(() => {
                    this.handleSlideSelection(this.slideIndex + 1);
                }, Number(this.scrollDuration));
            }
        }
        disconnectedCallback() {
            if (this.autoScroll) {
                window.clearInterval(this.timer);
            }
        }
        showSlide(event) {
            const slideIndex = Number(event.target.dataset.id);
            console.log('slideIndex>>>>',slideIndex);
            this.handleSlideSelection(slideIndex);
        }
        slideBackward() {
            const slideIndex = this.slideIndex - 1;
            this.handleSlideSelection(slideIndex);
        }
        slideForward() {
            const slideIndex = this.slideIndex + 1;
            this.handleSlideSelection(slideIndex);
        }
        handleSlideSelection(index) {
            if (index > this.slides.length) {
                this.slideIndex = 1;
            } else if (index < 1) {
                this.slideIndex = this.slides.length;
            } else {
                this.slideIndex = index;
            }
            this.slides = this.slides.map((slide) => {
                if (this.slideIndex === slide.index) {
                    return {
                        ...slide,
                        slideClass: 'fade slds-show',
                        dotClass: 'dot active'
                    };
                }
                return {
                    ...slide,
                    slideClass: 'fade slds-hide',
                    dotClass: 'dot'
                };
            });
        }
    }