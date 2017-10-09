// Angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Material
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        AuthService,
        AuthGuard,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}
