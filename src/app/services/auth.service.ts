// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

// RxJs
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    public user: Observable<firebase.User>;
    public error: string = null;

    public constructor(
        private auth: AngularFireAuth,
        private router: Router,
    ) {
        this.user = auth.authState;
    }

    public signUp(email: string, password: string): void {
        this.error = 'Sign up form temporary not available';
/*
        this.auth.auth.createUserWithEmailAndPassword(email, password)
            .then((value) => {
                console.log('Sing up with: ', value);

                this.router.navigate(['/texts']);
            })
            .catch((err) => {
                console.warn('Something went wrong with sing up:', err);

                this.error = err.message;
            });
*/
    }

    public login(email: string, password: string): void {
        this.error = null;

        this.auth.auth.signInWithEmailAndPassword(email, password)
            .then((value) => {
                console.log('Logged in: ', value);

                this.router.navigate(['/texts']);
            })
            .catch((err) => {
                console.warn('Something went wrong with login:', err);

                this.error = err.message;
            });
    }

    public logout(): void {
        this.auth.auth.signOut();
        this.router.navigate(['/login']);
    }
}
