import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer } from '@angular/core';
import { Gesture } from 'ionic-angular/gestures/gesture';
import { DomController, Platform } from 'ionic-angular';
declare var Hammer: any

@Directive({
    selector: '[pizza-detail-drag]' // Attribute selector
})
export class PizzaDetailDrag {
    private _panGesture: Gesture;
    private mainContentContainer = (<HTMLElement>document.getElementById('main-content-container'));
    _appliedStyles: boolean = false;

    // Start y-pos  where user started pulling down
    startY: number = null;

    // Current y-pos
    currentY: number = null;

    // distance between startY and currentY pos
    deltaY: number = null;

    // Representing how far is pulled down
    progress: number = 0;

    // Minimum drag distance when content gets dragged down;
    pullMin: number = 100;

    // Maximum distance when content automatically stops at ypos
    pullMax: number = (this.pullMin * 2);

    startPosElement: number;
    endPosElement: number;

    constructor(public el: ElementRef, public renderer: Renderer, public domCtrl: DomController, private _plt: Platform) {
    }

    _onStart(e) {

        // Set starting point of touch
        this.startY = this.currentY = e.center.y;
        this.startPosElement = (<HTMLElement>document.getElementById('main-content-container')).getBoundingClientRect().top;

    }

    _onMove(e) {
        e.preventDefault();

        // Set the current position of touch
        this.currentY = e.center.y;

        // Set distance between current position and starting position
        this.deltaY = (e.center.y - this.startY);

        let scrollTop = (<HTMLElement>document.getElementById('main-content-container')).getBoundingClientRect().top;

        if (screen.width > 600) {
            this.pullMax = 400;
        } else {
            this.pullMax = this.pullMin * 2;
        }

        if (scrollTop <= this.pullMax) {
            this._setCss(this.startPosElement + this.deltaY, '0', true, '');
        } else {
            return;
        }

        if (scrollTop <= 100) {
            (<HTMLElement>document.getElementById('arrowdown')).style.transform = 'rotate(0deg)';
        } else {
            (<HTMLElement>document.getElementById('arrowdown')).style.transform = 'rotate(180deg)';
        }

        if ((<HTMLElement>document.getElementById('main-content')).getBoundingClientRect().top <= 100) {
            (<HTMLElement>document.querySelector('page-product-details-modal .back-button')).classList.add("scrolled");
            (<HTMLElement>document.getElementById('shoppingBasket')).classList.add("scrolled");
        } else {
            (<HTMLElement>document.querySelector('page-product-details-modal .back-button')).classList.remove("scrolled");
            (<HTMLElement>document.getElementById('shoppingBasket')).classList.remove("scrolled");
        }

        this._onInMoveZone(e);
    }

    _onInMoveZone(e) {
        this.progress = (this.deltaY / this.pullMin);
    }

    _onEnd(e) {

        this.endPosElement = (<HTMLElement>document.getElementById('main-content-container')).getBoundingClientRect().top;
        if (screen.width > 600) {
            if (this.endPosElement <= 0) {
                this._setCss(200, '300', true, '');
                (<HTMLElement>document.querySelector('page-product-details-modal .back-button')).classList.add("scrolled");
                (<HTMLElement>document.getElementById('shoppingBasket')).classList.add("scrolled");
            } else if (this.endPosElement > 0 && this.endPosElement < 300) {
                this._setCss(200, '300', true, '');
                (<HTMLElement>document.getElementById('arrowdown')).style.transform = 'rotate(0deg)';
            } else {
                this._setCss(this.pullMax, '300', true, '');
                (<HTMLElement>document.getElementById('arrowdown')).style.transform = 'rotate(180deg)';
            }
        } else {
            if (this.endPosElement < -100) {
                this._setCss(-200, '300', true, '');
            } else if (this.endPosElement > -100 && this.endPosElement < 100) {
                this._setCss(0, '300', true, '');
                (<HTMLElement>document.getElementById('arrowdown')).style.transform = 'rotate(0deg)';
            } else {
                this._setCss(this.pullMax, '300', true, '');
                (<HTMLElement>document.getElementById('arrowdown')).style.transform = 'rotate(180deg)';
            }
        }
        
    }

    _setCss(y: number, duration: string, overflowVisible: boolean, delay: string) {
        this._appliedStyles = (y >= -200);
        const Css = this._plt.Css;
        if (y >= -200) {
            (<HTMLElement>document.getElementById('main-content-container')).style.transform = ((y >= -200) ? 'translateY(' + y + 'px) translateZ(0px)' : 'translateZ(0px)');
            (<HTMLElement>document.getElementById('main-content-container')).style.transition = 'all ' + duration + 'ms ease-in-out';
        } else if (y < -200) {
            (<HTMLElement>document.getElementById('main-content-container')).style.transform = ((y < -200) ? 'translateY(' + -200 + 'px) translateZ(0px)' : 'translateZ(0px)');
            (<HTMLElement>document.getElementById('main-content-container')).style.transition = 'all ' + duration + 'ms ease-in-out';
        }
        
    }

    ngOnInit() {
        this._panGesture = new Gesture(this.el.nativeElement, {
            recognizers: [
                [Hammer.Pan],
                [Hammer.Tap]
            ]
        });
        this._panGesture.listen();
        this._panGesture.on('panstart tap', (e) => {
            this._onStart(e);
        });
        this._panGesture.on('pan tap', (e) => {
            this._onMove(e);
        });
        this._panGesture.on('panend tap', (e) => {
            this._onEnd(e);
        });
    }

    ngOnDestroy() {
      
    }

}