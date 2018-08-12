import {AbstractControl} from '@angular/forms';
import {ProductService} from '../product.service';
import {map} from 'rxjs/operators';

export class ValidateUniqueCode {
  static createValidator(productService: ProductService, id: number) {
    return (control: AbstractControl) => {
      return productService.checkUniqueCode(control.value, id).pipe(map(res => {
        return res ? null : {codeTaken: true};
      }));
    };
  }
}
