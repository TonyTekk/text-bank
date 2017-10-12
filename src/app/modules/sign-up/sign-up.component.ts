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
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    animations: [
        trigger('toggle', [
            transition('* => *', [
                style({transform: 'translateX(-100%)'}),
                animate(300)
            ]),
        ])
    ],
})
export class SignUpComponent {
    public email     = new FormControl('', [Validators.required, Validators.email]);
    public password  = new FormControl('', [Validators.required, Validators.minLength(5)]);

    public toggle = false;

    public constructor(
        public authService: AuthService,
    ) {}

    public signUp(): void {
        this.authService.signUp(this.email.value, this.password.value);
    }

    public changeInput(): void {
        this.authService.error = null;
    }
}
