// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

// App
import { ArticleComponent } from './article.component';

const articleRoutes: Routes = [
    {
        path: '',
        component: ArticleComponent,
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
