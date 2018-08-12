import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from './products.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductComponent} from './product/product.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ],
  declarations: [ProductsComponent, ProductsListComponent, ProductComponent]
})
export class ProductsModule {
}
