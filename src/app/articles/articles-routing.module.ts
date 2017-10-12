// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

// App
import { ArticlesComponent } from './articles.component';
import { AuthGuard } from '../services/auth-guard.service';

const articlesRoutes: Routes = [
    {
        path: '',
        component: ArticlesComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(articlesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ArticlesRoutingModule {}
