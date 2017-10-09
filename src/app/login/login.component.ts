// Angular
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

// Animation
import { trigger } from '@angular/animations';
import { style } from '@angular/animations';
import { animate } from '@angular/animations';
import { transition } from '@angular/animations';

// Services
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [
        trigger('toggleState', [
            transition('* => *', [
                style({transform: 'translateX(-100%)'}),
                animate(300)
            ]),
        ])
    ],
})
export class LoginComponent {
    public email     = new FormControl('', [Validators.required, Validators.email]);
    public password  = new FormControl('', [Validators.required, Validators.minLength(6)]);

    public toggle = false;

    public constructor(
        public authService: AuthService,
    ) {}

    public login() {
        this.authService.login(this.email.value, this.password.value);
    }

    public signUp() {
        this.authService.signUp(this.email.value, this.password.value);
    }

    public changeInput() {
        this.authService.error = null;
    }

    public toggleState() {
        this.toggle = !this.toggle;
    }
}
