// Angular
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';

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

// App
import { ArticleService } from '../services/article.service';
import { ArticleModel } from '../models/article.model';

@Component({
    selector: 'app-texts',
    templateUrl: './texts.component.html',
    styleUrls: ['./texts.component.css'],
    animations: [
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
    // Subscription
    private listSubscription: Subscription;
    private keySubscription: Subscription;

    // Animation trigger
    public update = false;

    // Table data
    public columns = ['title', 'text', 'action'];
    public database: TableDatabase;
    public dataSource: TableDataSource | null;

    // DOM
    @ViewChild('filter') public filter: ElementRef;

    public constructor(
        private router: Router,
        public article: ArticleService,
    ) { }

    public ngOnInit(): void {
        this.database = new TableDatabase(this.article);
        this.dataSource = new TableDataSource(this.database);

        this.listSubscription = this.article.list
            .subscribe(() => {
                this.update = true;
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

    public create(): void {
        this.router.navigate(['/article']);
    }

    public toArticle(article: ArticleModel): void {
        this.router.navigate(['/article/' + article.id]);
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

    public constructor(
        private database: TableDatabase
    ) {
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
