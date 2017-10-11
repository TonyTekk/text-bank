// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { AuthGuard } from '../services/auth-guard.service';

const projectsRoutes: Routes = [
    {
        path: '',
        component: ProjectsComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(projectsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProjectsRoutingModule {}
