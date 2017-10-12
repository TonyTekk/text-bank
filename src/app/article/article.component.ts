// Angular
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

// Material
import { MatDialog } from '@angular/material';

// Animation
import { trigger } from '@angular/animations';
import { style } from '@angular/animations';
import { animate } from '@angular/animations';
import { transition } from '@angular/animations';

// RxJs
import { Subscription } from 'rxjs/Subscription';

// App
import { ArticleService } from '../services/article.service';
import { ArticleModel } from '../models/article.model';
import { ArticleRemoveComponent } from './article-remove/article-remove.component';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css'],
    animations: [
        trigger('init', [
            transition('* => *', [
                style({transform: 'translateX(-100%)'}),
                animate(300)
            ]),
        ]),
    ],
})
export class ArticleComponent implements OnInit, OnDestroy {
    // Subscription
    private paramsSubscription: Subscription;
    private articleSubscription: Subscription;

    // Animation triggers
    public init = false;

    public article: ArticleModel;

    public constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public articleService: ArticleService,
    ) { }

    public form = new FormGroup({
        title      : new FormControl('', [Validators.required, Validators.minLength(5)]),
        description: new FormControl(''),
        text       : new FormControl(''),
    });

    public ngOnInit(): void {
        this.paramsSubscription = this.route.params
            .subscribe(params => {
                if (params['articleId']) {
                    this.articleSubscription = this.articleService.get(params['articleId'])
                        .subscribe((article) => {
                            if (article) {
                                this.article = new ArticleModel(article);

                                this.form = new FormGroup({
                                    title      : new FormControl(this.article.title, [Validators.required, Validators.minLength(5)]),
                                    description: new FormControl(this.article.description),
                                    text       : new FormControl(this.article.text),
                                });
                            }
                        });
                }
            });
    }

    public ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
    }

    public submit(): void {
        const article = {
            id: this.article ? this.article.id : '',
            apiId: this.article ? this.article.apiId : '',
            projectId: this.article ? this.article.projectId : '',
            title: this.form.controls.title.value,
            description: this.form.controls.description.value,
            text: this.form.controls.text.value,
        };

        this.article ? this.update(article) : this.push(article);
    }


    public push(article): void {
        this.articleService.push(article)
            .then(() => {
                this.toTexts();
            });
    }

    public update(article): void {
        this.articleService.update(article)
            .then(() => {
                this.toTexts();
            });
    }

    public remove(): void {
        if (this.article) {
            const dialogRef = this.dialog.open(ArticleRemoveComponent, {});

            dialogRef.afterClosed().subscribe(
                (result: boolean) => {
                    if (result) {
                        this.articleService.remove(this.article)
                            .then(() => {
                                this.toTexts();
                            });
                    }
                });
        }
    }

    public toTexts(): void {
        this.router.navigate(['/texts']);
    }
}
