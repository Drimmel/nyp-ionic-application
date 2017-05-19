import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ReceiptProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ReceiptProvider {

    public receipt: any = [];
    public receiptTotal: number = 0;
    public numberOfItems: number;

    constructor(public http: Http) {
        this.receiptTotal = 0;
        
    }

    // Add product to receipt array
    addToReceipt(product) {
        if (this.receipt.filter(function (e) { return e.name == product.name; }).length > 0) {
            for (var i in this.receipt) {
                if (this.receipt[i].name == product.name) {
                    this.receipt[i].amount++;
                    break;
                }
            } 
        } else {
            product.amount = 1;
            this.receipt.push(product);
        }
    }

    addToReceiptTotal(product) {        
        this.receiptTotal = this.receiptTotal + product.Price;
        (<HTMLElement>document.getElementById('totalPrice')).innerHTML = ((this.receiptTotal).toFixed(2)).toString();
    }

    getReceiptTotal() {
        return this.receiptTotal;
    }

    removeProduct(product, i) {
        if (this.receipt.filter(function (e) { return e.name == product.name; }).length > 0) {
            if (product.amount <= 1) {
                product.amount--;
                this.receiptTotal -= product.Price;
                this.receipt.splice(i, 1);
            } else {
                product.amount--;
                this.receiptTotal -= product.Price;
            }
        }
        (<HTMLElement>document.getElementById('totalPrice')).innerHTML = ((this.receiptTotal).toFixed(2)).toString();
    }

    addProduct(product, i) {
        if (this.receipt.filter(function (e) { return e.name == product.name; }).length > 0) {
                product.amount++;
                this.receiptTotal += product.Price;
        }
        (<HTMLElement>document.getElementById('totalPrice')).innerHTML = ((this.receiptTotal).toFixed(2)).toString();
    }

}
