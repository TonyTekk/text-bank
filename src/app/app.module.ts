// Angular
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

// Material
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { MatMenuModule } from '@angular/material';

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
        HttpModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatMenuModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        AuthService,
        AuthGuard,
        AngularFireDatabase,
        MatIconRegistry,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {}
