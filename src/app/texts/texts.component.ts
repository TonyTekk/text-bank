// Angular
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

// Animation
import { trigger } from '@angular/animations';
import { style } from '@angular/animations';
import { animate } from '@angular/animations';
import { state } from '@angular/animations';
import { transition } from '@angular/animations';

// RxJs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

// Material
import { MatDialog } from '@angular/material';

// App
import { ArticleService } from '../services/article.service';
import { ArticleModel } from '../models/article.model';
import { TextUpdateComponent } from './text-update/text-update.component';
import { TextRemoveComponent } from './text-remove/text-remove.component';

@Component({
    selector: 'app-texts',
    templateUrl: './texts.component.html',
    styleUrls: ['./texts.component.css'],
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
        ])
    ],
})
export class TextsComponent implements OnInit, OnDestroy {
    // Subscribe to list
    private subscription: Subscription;

    // Animation triggers
    public init = false;
    public update = false;

    // Table data
    public columns = ['title', 'text', 'action'];
    public database: TableDatabase;
    public dataSource: TableDataSource | null;

    @ViewChild('filter') public filter: ElementRef;

    public constructor(
        public article: ArticleService,
        public dialog: MatDialog
    ) { }

    public ngOnInit(): void {
        this.database = new TableDatabase(this.article);
        this.dataSource = new TableDataSource(this.database);

        this.subscription = this.article.list
            .subscribe(() => {
                this.update = true;
            });

        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (this.dataSource) {
                    this.dataSource.filter = this.filter.nativeElement.value;
                }
            });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public add(): void {
        const dialogRef = this.dialog.open(TextUpdateComponent, {
            data: new ArticleModel({})
        });

        dialogRef.afterClosed().subscribe(
            (article: ArticleModel) => {
                if (article) {
                    this.article.push(article);
                }
            });
    }

    public edit(item: ArticleModel): void {
        const dialogRef = this.dialog.open(TextUpdateComponent, {
            data: item
        });

        dialogRef.afterClosed().subscribe(
            (article: ArticleModel) => {
                if (article) {
                    this.article.update(article);
                }
            });
    }

    public remove(article: ArticleModel): void {
        const dialogRef = this.dialog.open(TextRemoveComponent);

        dialogRef.afterClosed().subscribe(
            (result: boolean) => {
                if (result) {
                    this.article.remove(article);
                }
            });
    }
}

export class TableDatabase {
    public dataChange: BehaviorSubject<ArticleModel[]> = new BehaviorSubject<ArticleModel[]>([]);

    public get data(): ArticleModel[] {
        return this.dataChange.value;
    }

    public constructor(
        public article: ArticleService,
    ) {
        this.article.list.subscribe(list => this.dataChange.next(list));
    }
}

export class TableDataSource extends DataSource<any> {
    private filterChange = new BehaviorSubject('');

    public get filter(): string {
        return this.filterChange.value;
    }

    public set filter(filter: string) {
        this.filterChange.next(filter);
    }

    public constructor(private database: TableDatabase) {
        super();
    }

    public connect(): Observable<ArticleModel[]> {
        const displayDataChanges = [
            this.database.dataChange,
            this.filterChange,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.database.data.slice().filter((item: ArticleModel) => {
                // Search title and description
                const searchStr = (item.title + item.description).toLowerCase();

                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });
    }

    public disconnect() {}
}
