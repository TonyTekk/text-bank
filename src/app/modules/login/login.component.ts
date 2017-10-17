// Angular
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

// App
import { AuthService } from '../../services/auth.service';
import { FadeInAnimation } from '../../animations/fade-in.animation';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [
        FadeInAnimation,
    ],
})
export class LoginComponent {
    public email     = new FormControl('', [Validators.required, Validators.email]);
    public password  = new FormControl('', [Validators.required]);

    public constructor(
        public authService: AuthService,
    ) {}

    public login(): void {
        this.authService.login(this.email.value, this.password.value);
    }

    public changeInput(): void {
        this.authService.error = null;
    }
}
