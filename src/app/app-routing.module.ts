// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

// App
import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
    {
        path: 'projects',
        loadChildren: 'app/projects/projects.module#ProjectsModule',
        canLoad: [AuthGuard],
    },
    {
        path: 'texts',
        loadChildren: 'app/texts/texts.module#TextsModule',
        canLoad: [AuthGuard],
    },
    {
        path: 'article',
        loadChildren: 'app/article/article.module#ArticleModule',
        canLoad: [AuthGuard],
    },
    {
        path: 'article/:articleId',
        loadChildren: 'app/article/article.module#ArticleModule',
        canLoad: [AuthGuard],
    },
    {
        path: 'login',
        loadChildren: 'app/login/login.module#LoginModule',
    },
    {
        path: '**',
        redirectTo: '/projects',
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
