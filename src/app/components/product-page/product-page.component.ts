import { Component, OnInit } from '@angular/core';
import *  as data from '../../products.json';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  public productStore: Array<any>
  constructor() {
    this.productStore = (data as any).default;
  }

  deleteProductFromStore(title: string) {
    const index = this.productStore.findIndex(item => item.title === title)
    this.productStore.splice(index, 1)
  }
  addNewProduct(product) {
    this.productStore.push(product)
  }
  ngOnInit(): void {
  }

}
