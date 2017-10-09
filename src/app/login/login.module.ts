// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';

// App
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutingModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
    declarations: [
        LoginComponent,
    ],
})
export class LoginModule { }
