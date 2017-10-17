// Angular
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Material
import { MatDialog } from '@angular/material';

// RxJs
import { Subscription } from 'rxjs/Subscription';

// App
import { ArticleService } from '../../../services/article.service';
import { ArticleModel } from '../../../models/article.model';
import { ArticleRemoveComponent } from '../article-remove/article-remove.component';
import { ShowAnimation } from '../../../animations/show.animation';

@Component({
    selector: 'app-article-edit',
    templateUrl: './article-edit.component.html',
    styleUrls: ['./article-edit.component.css'],
    animations: [
        ShowAnimation,
    ],
})
export class ArticleEditComponent implements OnInit, OnDestroy {
    // Subscription
    private paramsSubscription: Subscription;
    private articleSubscription: Subscription;

    public article: ArticleModel;
    public show = false;
    public form = new FormGroup({
        title      : new FormControl('', [Validators.required, Validators.minLength(5)]),
        description: new FormControl(''),
        text       : new FormControl(''),
    });

    public constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public articleService: ArticleService,
    ) { }

    public ngOnInit(): void {
        this.paramsSubscription = this.route.params
            .subscribe(params => {
                if (params['articleId']) {
                    this.articleSubscription = this.articleService.get(params['articleId'])
                        .subscribe((article) => {
                            if (article) {
                                this.article = new ArticleModel(article);
                                this.show = true;

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
        this.articleSubscription.unsubscribe();
    }

    public submit(): void {
        const article = {
            id: this.article.id,
            apiId: this.article.apiId,
            projectId: this.article.projectId,
            title: this.form.controls.title.value,
            description: this.form.controls.description.value,
            text: this.form.controls.text.value,
        };

        this.articleService.update(article)
            .then(() => {
                this.router.navigate(['/articles']);
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
                                this.router.navigate(['/articles']);
                            });
                    }
                });
        }
    }
}
