import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'am-access-denied',
  templateUrl: './access-denied.component.html',
  styles: []
})
export class AccessDeniedComponent implements OnInit {

  isAuthenticated = false;

  constructor(
    private location: Location,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthUserLoggedIn();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
