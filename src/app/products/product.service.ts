import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BASE_URL} from '../core/services/app.config';
import {Observable} from 'rxjs';
import {Product} from './product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = this.baseUrl + '/products';  // URL to web api

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string,
  ) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  addProduct(product: Product): Observable<Product | any> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions);
  }

  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, httpOptions);
  }

  updateProduct(product: Product): Observable<any> {
    const id = product.id;
    const url = `${this.productsUrl}/${id}`;

    return this.http.put(url, product, httpOptions);
  }

  checkUniqueCode(code: string, id: number) {
    return this.http.post(`${this.productsUrl}/checkUniqueCode`, {
      code,
      id
    });
  }
}
