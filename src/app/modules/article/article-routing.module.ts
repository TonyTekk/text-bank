// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

// App
import { ArticleComponent } from './article.component';
import { AuthGuard } from '../../services/auth-guard.service';

const articleRoutes: Routes = [
    {
        path: '',
        component: ArticleComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(articleRoutes),
    ],
    exports: [
        RouterModule,
    ]
})
export class ArticleRoutingModule { }
