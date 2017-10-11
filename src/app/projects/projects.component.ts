// Angular
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

// Material
import { MatDialog } from '@angular/material';

// Animation
import { trigger } from '@angular/animations';
import { style } from '@angular/animations';
import { animate } from '@angular/animations';
import { state } from '@angular/animations';
import { transition } from '@angular/animations';

// RxJs
import { Subscription } from 'rxjs/Subscription';

// App
import { ProjectService } from '../services/project.service';
import { ProjectModel } from '../models/project.model';
import { ProjectRemoveComponent } from './project-remove/project-remove.component';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css'],
    animations: [
        trigger('init', [
            transition('* => *', [
                style({transform: 'translateX(-100%)'}),
                animate(300)
            ]),
        ]),
        trigger('update', [
            state('true', style({
                opacity: 0
            })),
            state('false',   style({
                opacity: 1
            })),
            transition('* => *', [
                animate(300)
            ]),
        ]),
    ],
})
export class ProjectsComponent  implements OnInit, OnDestroy {
    // Subscription
    private listSubscription: Subscription;

    // Animation triggers
    public init = false;
    public update = false;

    public constructor(
        private router: Router,
        public dialog: MatDialog,
        public project: ProjectService,
    ) {}

    public ngOnInit(): void {
        this.listSubscription = this.project.list
            .subscribe(() => {
                this.update = true;
            });
    }
    public ngOnDestroy(): void { }

    public add(): void {
        this.project.push(new ProjectModel({}));
    }

    public edit(): void {

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
        this.router.navigate(['/texts']);
    }
}
