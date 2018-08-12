import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductsComponent} from './products.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductComponent} from './product/product.component';
import {AuthGuard} from '../core/services/auth.guard';

const routes: Routes = [
  {
    path: 'products', component: ProductsComponent, children: [
      {path: '', component: ProductsListComponent},
      {path: 'add', component: ProductComponent},
      {path: 'edit/:id', component: ProductComponent}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
