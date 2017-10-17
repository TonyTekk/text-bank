// Angular
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

// Material
import { MatIconRegistry } from '@angular/material';

// Services
import { AuthService } from './services/auth.service';
import { ShowAnimation } from './animations/show.animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        ShowAnimation,
    ],
})
export class AppComponent implements OnInit {
    public title = '';

    public constructor(
        private router: Router,
        public iconRegistry: MatIconRegistry,
        public sanitizer: DomSanitizer,
        public authService: AuthService,
    ) {
        this.iconRegistry
            .addSvgIcon('chest', sanitizer.bypassSecurityTrustResourceUrl('./assets/img/chest.svg'));
    }

    public ngOnInit() {
        this.router.events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.title = event.url;
                }
            });
    }

    public logout(): void {
        this.authService.logout();
    }
}
