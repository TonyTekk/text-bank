// Angular
import { Component } from '@angular/core';

// Services
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    public email: string;
    public password: string;

    public constructor(
        public authService: AuthService
    ) {}

    public login() {
        this.authService.login(this.email, this.password);
        this.email = this.password = '';
    }

    public signup() {
        this.authService.signUp(this.email, this.password);
        this.email = this.password = '';
    }
}
