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

    public article: ArticleModel = new ArticleModel({});
    public show = false;

    public constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public articleService: ArticleService,
    ) { }

    public ngOnInit(): void {
        this.paramsSubscription = this.route.params
            .subscribe(params => {
                this.articleSubscription = this.articleService.get(params['articleId'])
                    .subscribe((article) => {
                        article ? this.showForm(article) : this.router.navigate(['/articles']);
                    });
            });
    }

    public ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
        this.articleSubscription.unsubscribe();
    }

    private showForm(article): void {
        this.article = new ArticleModel(article);
        this.show = true;
    }

    public submit(): void {
        this.articleService.update(this.article)
            .then(() => {
                this.router.navigate(['/articles']);
            });
    }

    public remove(): void {
        const dialogRef = this.dialog.open(ArticleRemoveComponent);

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
