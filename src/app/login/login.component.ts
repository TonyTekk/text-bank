// Angular
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

// Services
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public email     = new FormControl('', [Validators.required, Validators.email]);
    public password  = new FormControl('', [Validators.required, Validators.minLength(6)]);

    public constructor(
        public authService: AuthService
    ) {}

    public login() {
        this.authService.login(this.email.value, this.password.value);
    }

    public signup() {
        this.authService.signUp(this.email.value, this.password.value);
    }

    public change() {
        this.authService.error = null;
    }
}
