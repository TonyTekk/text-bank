// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatGridListModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';

// App
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectService } from '../../services/project.service';
import { ProjectUpdateComponent } from './project-update/project-update.component';
import { ProjectRemoveComponent } from './project-remove/project-remove.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ProjectsRoutingModule,
        MatGridListModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatInputModule,
        MatMenuModule,
        MatDialogModule,
    ],
    declarations: [
        ProjectsComponent,
        ProjectUpdateComponent,
        ProjectRemoveComponent,
    ],
    entryComponents: [
        ProjectUpdateComponent,
        ProjectRemoveComponent,
    ],
    providers: [
        ProjectService,
    ],
})
export class ProjectsModule { }
