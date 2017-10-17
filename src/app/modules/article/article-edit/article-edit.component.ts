// Angular
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Material
import { MatDialog } from '@angular/material';

// RxJs
import { Subscription } from 'rxjs/Subscription';

// App
import { ArticleService } from '../../../services/article.service';
import { ProjectService } from '../../../services/project.service';
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
    private projectSubscription: Subscription;

    // Animation trigger
    public show = 'false';

    // Article model
    public article: ArticleModel = new ArticleModel({});

    public constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public articleService: ArticleService,
        public projectService: ProjectService,
    ) { }

    public ngOnInit(): void {
        this.projectSubscription = this.projectService.list.subscribe();

        this.paramsSubscription = this.route.params
            .subscribe(params => {
                this.articleSubscription = this.articleService.get(params['articleId'])
                    .subscribe((article) => {
                        article ? this.showForm(article) : this.toArticles();
                    });
            });
    }

    public ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
        this.articleSubscription.unsubscribe();
        this.projectSubscription.unsubscribe();
    }

    private showForm(article): void {
        this.article = new ArticleModel(article);
        this.show = 'true';
    }

    public submit(): void {
        this.articleService.update(this.article)
            .then(() => {
                this.toArticles();
            });
    }

    public remove(): void {
        const dialogRef = this.dialog.open(ArticleRemoveComponent);

        dialogRef.afterClosed().subscribe(
            (result: boolean) => {
                if (result) {
                    this.articleService.remove(this.article)
                        .then(() => {
                            this.toArticles();
                        });
                }
            });
    }

    public toArticles(): void {
        this.router.navigate(['/articles']);
    }
}
