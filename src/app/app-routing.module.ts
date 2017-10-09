// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

// App
import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: 'app/login/login.module#LoginModule',
    },
    {
        path: 'login',
        loadChildren: 'app/login/login.module#LoginModule',
    },
    {
        path: 'texts',
        loadChildren: 'app/texts/texts.module#TextsModule',
        canLoad: [AuthGuard],
    },
    {
        path: '**',
        redirectTo: '/login',
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { },
        )
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }
