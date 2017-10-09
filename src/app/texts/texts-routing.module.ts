import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TextsComponent } from './texts.component';
import { AuthGuard } from '../services/auth-guard.service';

const textsRoutes: Routes = [
    {
        path: '',
        component: TextsComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(textsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TextsRoutingModule {}
