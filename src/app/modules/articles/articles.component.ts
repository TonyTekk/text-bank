// Angular
import { Component } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';

// RxJs
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

// App
import { ArticleService } from '../../services/article.service';
import { ArticleModel } from '../../models/article.model';
import { ShowAnimation } from '../../animations/show.animation';
import { FadeInAnimation } from '../../animations/fade-in.animation';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css'],
    animations: [
        ShowAnimation,
        FadeInAnimation,
    ],
})
export class ArticlesComponent implements OnInit, OnDestroy {
    // Subscription
    private listSubscription: Subscription;
    private keySubscription: Subscription;

    // Animation trigger
    public show = 'false';

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
