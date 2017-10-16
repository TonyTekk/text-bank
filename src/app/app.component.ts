// Angular
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { OnDestroy} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Material
import { MatIconRegistry } from '@angular/material';

// RxJs
import { Subscription } from 'rxjs/Subscription';

// Services
import { AuthService } from './services/auth.service';
import { FadeInAnimation } from './animations/fade-in.animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        FadeInAnimation,
    ],
})
export class AppComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    public title: string;

    // Animation trigger
    public update = false;

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
        this.subscription = this.router.events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.update = true;
                    this.title = event.url;
                }
            });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public logout(): void {
        this.authService.logout();
    }
}
