// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

// App
import { SignUpComponent } from './sign-up.component';

const signUpRoutes: Routes = [
    {
        path: '',
        component: SignUpComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(signUpRoutes),
    ],
    exports: [
        RouterModule,
    ]
})
export class SignUpRoutingModule {}
