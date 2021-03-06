import { Directive, Renderer, ElementRef } from '@angular/core';
import { Searchbar } from 'ionic-angular';

/*
  Generated class for the FocusSearchinput directive.

  See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
  for more info on Angular 2 Directives.
*/
@Directive({
  selector: '[focus-searchinput]' // Attribute selector
})
export class FocusSearchinput {
 
    constructor(public renderer: Renderer, public elementRef: ElementRef) { }
    ngOnInit() {
        //search bar is wrapped with a div so we get the child input
        const searchInput = this.elementRef.nativeElement.querySelector('input');
        setTimeout(() => {
            //delay required or ionic styling gets finicky
            this.renderer.invokeElementMethod(searchInput, 'focus', []);
        }, 0);
    }
}
