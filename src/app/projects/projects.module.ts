// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatGridListModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

// App
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectService } from '../services/project.service';

@NgModule({
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        MatGridListModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatInputModule,
    ],
    declarations: [
        ProjectsComponent,
    ],
    providers: [
        ProjectService,
    ],
})
export class ProjectsModule { }
