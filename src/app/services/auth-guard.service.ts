// Angular
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { CanLoad } from '@angular/router';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';

// RxJs
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    public constructor(
        private router: Router,
        private auth: AngularFireAuth
    ) {}

    public canActivate(): Observable<boolean> {
        return this.auth.authState
            .take(1)
            .map(authState => !!authState)
            .do(auth => !auth ? this.router.navigate(['/login']) : true);
    }

    public canLoad(): Observable<boolean> {
        return this.auth.authState
            .take(1)
            .map(authState => !!authState)
            .do(auth => !auth ? this.router.navigate(['/login']) : true);
    }
}

