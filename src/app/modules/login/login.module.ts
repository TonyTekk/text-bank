// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';

// App
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    declarations: [
        LoginComponent,
    ],
})
export class LoginModule { }
