import { LightningElement, track, api } from 'lwc';
const CARD_VISIBILE_CLASSES = 'slds-show'
const CARD_HIDDEN_CLASSES = 'slds-hide'

const DOT_HIDDEN_CLASSES = 'dot'
const DOT_VISIBLE_CLASSES = 'dot active'

const DEFAULT_SLIDER_TIMER = 3000


export default class DemobannerChild extends LightningElement {
    @track slideIndex = 1;
    @track slides = [];
    @track timer;
    @api slideTimer = DEFAULT_SLIDER_TIMER;
    @api
    get slidesData() {
        console.log('inside get');
        return this.slides

    }
    set slidesData(data) {
        console.log('inside set');
        this.slides = data.map((item, index) => {
            return index === 0 ? {
                ...item,
                slideIndex: index + 1,
                cardClasses: CARD_VISIBILE_CLASSES,
                dotClases: DOT_VISIBLE_CLASSES
            } : {
                ...item,
                slideIndex: index + 1,
                cardClasses: CARD_HIDDEN_CLASSES,
                dotClases: DOT_HIDDEN_CLASSES
            }
        })
        console.log('check slides' + this.slides);

    }
    connectedCallback() {
        this.timer = window.setInterval(() => {
            this.slideSelectionHandler(this.slideIndex + 1)

        }, Number(this.slideTimer))
    }
    disconnectedCallback() {
        window.clearInterval(this.timer);
    }
    currentSlide(event) {
        let slideIndex = Number(event.target.dataset.id);
        this.slideSelectionHandler(slideIndex);
    }
    backSlide() {
        let slideIndex = this.slideIndex - 1;
        this.slideSelectionHandler(slideIndex);

    }
    forwardSlide() {
        let slideIndex = this.slideIndex + 1;
        this.slideSelectionHandler(slideIndex);

    }
    slideSelectionHandler(id) {
        if (id > this.slides.length) {
            this.slideIndex = 1;
        }
        else if (id < 1) {
            this.slideIndex = this.slides.length;
        }
        else {
            this.slideIndex = id;
        }
        this.slides = this.slides.map(item => {
            return this.slideIndex === item.slideIndex ? {
                ...item,
                cardClasses: CARD_VISIBILE_CLASSES,
                dotClases: DOT_VISIBLE_CLASSES
            } : {
                ...item,
                cardClasses: CARD_HIDDEN_CLASSES,
                dotClases: DOT_HIDDEN_CLASSES
            }
        })
    }

}