// Angular
import { Component } from '@angular/core';

// Services
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public constructor(
        public authService: AuthService
    ) {}

    public logout(): void {
        this.authService.logout();
    }
}
