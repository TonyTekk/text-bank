// Angular
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

// Material
import { MatDialog } from '@angular/material';

// RxJs
import { Subscription } from 'rxjs/Subscription';

// App
import { ProjectService } from '../../services/project.service';
import { ProjectModel } from '../../models/project.model';
import { ProjectRemoveComponent } from './project-remove/project-remove.component';
import { ProjectUpdateComponent } from './project-update/project-update.component';
import { ShowAnimation } from '../../animations/show.animation';
import { FadeInAnimation } from '../../animations/fade-in.animation';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css'],
    animations: [
        ShowAnimation,
        FadeInAnimation,
    ],
})
export class ProjectsComponent  implements OnInit, OnDestroy {
    // Subscription
    private listSubscription: Subscription;

    // Animation trigger
    public update = 'false';

    public constructor(
        private router: Router,
        public dialog: MatDialog,
        public project: ProjectService,
    ) {}

    public ngOnInit(): void {
        this.listSubscription = this.project.list
            .subscribe(() => {
                this.update = 'true';
            });
    }
    public ngOnDestroy(): void { }

    public add(): void {
        const dialogRef = this.dialog.open(ProjectUpdateComponent, {
            data: new ProjectModel({})
        });

        dialogRef.afterClosed().subscribe(
            (project: ProjectModel) => {
                if (project) {
                    this.project.push(project);
                }
            });
    }

    public edit(item: ProjectModel): void {
        const dialogRef = this.dialog.open(ProjectUpdateComponent, {
            data: item
        });

        dialogRef.afterClosed().subscribe(
            (project: ProjectModel) => {
                if (project) {
                    this.project.update(project);
                }
            });
    }

    public remove(item: ProjectModel): void {
        const dialogRef = this.dialog.open(ProjectRemoveComponent, {
            data: item
        });

        dialogRef.afterClosed().subscribe(
            (result: boolean) => {
                if (result) {
                    this.project.remove(item);
                }
            });
    }

    public toArticle(): void {
        this.router.navigate(['/articles']);
    }
}
