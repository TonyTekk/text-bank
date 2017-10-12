// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

// App
import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(loginRoutes),
    ],
    exports: [
        RouterModule,
    ]
})
export class LoginRoutingModule {}
