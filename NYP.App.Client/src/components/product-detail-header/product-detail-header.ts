import { Directive, ElementRef, Renderer } from '@angular/core';

/*
  Generated class for the ProductDetailHeader directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
    selector: '[product-detail-header]',
    host: {
        '(ionScroll)': 'onContentScroll($event)',
        '(window:resize)': 'onWindowResize($event)'
    }
})
export class ProductDetailHeader {

    constructor(public element: ElementRef, public renderer: Renderer) {
    
    }

}
