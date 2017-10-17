// Angular
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy} from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';

// Material
import { MatDialog } from '@angular/material';

// RxJs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

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
    private keySubscription: Subscription;

    // Animation trigger
    public show = 'false';

    // List data
    public database: ListDatabase;
    public dataSource: ListDataSource | null;

    // DOM
    @ViewChild('filter') public filter: ElementRef;

    public constructor(
        private router: Router,
        public dialog: MatDialog,
        public project: ProjectService,
    ) {}

    public ngOnInit(): void {
        this.database = new ListDatabase(this.project);
        this.dataSource = new ListDataSource(this.database);

        this.listSubscription = this.project.list
            .subscribe(() => {
                this.show = 'true';
            });

        this.keySubscription = Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (this.dataSource) {
                    this.dataSource.filter = this.filter.nativeElement.value;
                }
            });
    }
    public ngOnDestroy(): void {
        this.listSubscription.unsubscribe();
        this.keySubscription.unsubscribe();
    }

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

    public toArticle(item: ProjectModel): void {
        this.router.navigate([`/articles/`]);
    }
}

export class ListDatabase {
    public dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    public get data(): any[] {
        return this.dataChange.value;
    }

    public constructor(
        public project: ProjectService,
    ) {
        this.project.list.subscribe(list => this.dataChange.next(list));
    }
}

export class ListDataSource extends DataSource<any> {
    private filterChange = new BehaviorSubject('');

    public get filter(): string {
        return this.filterChange.value;
    }

    public set filter(filter: string) {
        this.filterChange.next(filter);
    }

    public constructor(
        private database: ListDatabase
    ) {
        super();
    }

    public connect(): Observable<ProjectModel[]> {
        const displayDataChanges = [
            this.database.dataChange,
            this.filterChange,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.database.data.slice().filter((item: ProjectModel) => {
                const searchStr = item.name.toLowerCase();

                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    public disconnect() {}
}
