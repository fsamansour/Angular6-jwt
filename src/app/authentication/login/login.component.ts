import {Component, OnInit} from '@angular/core';
import {Credentials} from '../../core/models/credentials';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'am-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';
  returnUrl: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.createFormGroup();

    // get the return url from route parameters
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  ngOnInit() {
  }

  createFormGroup() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const result: Credentials = Object.assign({}, this.loginForm.value);
    this.error = '';
    this.authService.login(result)
      .subscribe(isLoggedIn => {
          if (isLoggedIn) {
            if (this.returnUrl) {
              this.router.navigate([this.returnUrl]);
            } else {
              this.router.navigate(['/protectedPage']);
            }
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Login error', error);
          if (error.status === 401) {
            this.error = 'Invalid User name or Password. Please try again.';
          } else {
            this.error = `${error.statusText}: ${error.message}`;
          }
        });
  }
}
