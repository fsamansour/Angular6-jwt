import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductService} from '../product.service';

@Component({
  selector: 'am-products-list',
  templateUrl: './products-list.component.html',
  styles: []
})
export class ProductsListComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProductService,
  ) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  delete(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.products.splice(this.products.indexOf(product), 1);
    });
  }

}
