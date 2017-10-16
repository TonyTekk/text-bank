// Angular
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

// App
import { AuthService } from '../../services/auth.service';
import { FlyInAnimation } from '../../animations/fly-in.animation';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    animations: [
        FlyInAnimation
    ],
})
export class SignUpComponent {
    public email     = new FormControl('', [Validators.required, Validators.email]);
    public password  = new FormControl('', [Validators.required, Validators.minLength(5)]);

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
