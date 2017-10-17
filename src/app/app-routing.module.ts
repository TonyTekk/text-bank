// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

// App
import { AuthGuard } from './services/auth-guard.service';

const appRoutes: Routes = [
    {
        path: 'projects',
        loadChildren: 'app/modules/projects/projects.module#ProjectsModule',
        canLoad: [AuthGuard],
    },
    {
        path: 'articles/:projectId',
        loadChildren: 'app/modules/articles/articles.module#ArticlesModule',
        canLoad: [AuthGuard],
    },
    {
        path: 'article',
        loadChildren: 'app/modules/article/article.module#ArticleModule',
        canLoad: [AuthGuard],
    },
    {
        path: 'login',
        loadChildren: 'app/modules/login/login.module#LoginModule',
    },
    {
        path: 'sign-up',
        loadChildren: 'app/modules/sign-up/sign-up.module#SignUpModule',
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
