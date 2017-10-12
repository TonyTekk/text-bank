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
        path: 'articles',
        loadChildren: 'app/articles/articles.module#ArticlesModule',
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
        path: 'signup',
        loadChildren: 'app/signup/sign-up.module#SignUpModule',
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
