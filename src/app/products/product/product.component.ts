import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../product.service';
import {ValidateUniqueCode} from '../validators/async-unique-code.validator';

@Component({
  selector: 'am-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit, OnDestroy {
  productId: number;
  editMode = false;
  pageTitle: string;
  buttonText: string;
  form: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    this.form = this.createFormGroup();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['id'] ? params['id'] : 0;
      this.editMode = params['id'] != null;

      if (this.editMode) {
        this.productService.getProduct(params['id']).subscribe(product => {
          this.form.setValue(product);
        }, error => {
          this.router.navigate(['/products']);
        });
      }

      this.pageTitle = this.editMode ? 'Edit Product' : 'New Product';
      this.buttonText = this.editMode ? 'Update' : 'Create';

      this.form.controls['code'].setAsyncValidators(ValidateUniqueCode.createValidator(this.productService, this.productId));
    });
  }

  ngOnDestroy() {
  }

  createFormGroup() {
    return this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      code: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const product = Object.assign({}, this.form.value);
    if (!this.editMode) {
      this.productService.addProduct(product).subscribe(value => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.updateProduct(product).subscribe(value => {
        this.router.navigate(['/products']);
      });
    }
  }
}
