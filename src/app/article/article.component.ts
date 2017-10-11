// Angular
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

// Animation
import { trigger } from '@angular/animations';
import { style } from '@angular/animations';
import { animate } from '@angular/animations';
import { state } from '@angular/animations';
import { transition } from '@angular/animations';

// RxJs
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

// App
import { ArticleService } from '../services/article.service';
import { ArticleModel } from '../models/article.model';

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
        public articleService: ArticleService,
    ) { }

    public form = new FormGroup({
        title      : new FormControl(),
        description: new FormControl(),
        text       : new FormControl(),
    });

    public ngOnInit(): void {
        this.paramsSubscription = this.route.params
            .subscribe(params => {

                this.articleSubscription = this.articleService.get(params['id'])
                    .subscribe((action) => {
                        this.article = new ArticleModel(action.payload.val());

                        this.form = new FormGroup({
                            title      : new FormControl(this.article.title, [Validators.required, Validators.minLength(5)]),
                            description: new FormControl(this.article.description),
                            text       : new FormControl(this.article.text),
                        });
                    });
            });
    }

    public ngOnDestroy(): void {
        this.paramsSubscription.unsubscribe();
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
                this.router.navigate(['/texts']);
            });
    }

    public toTexts(): void {
        this.router.navigate(['/texts']);
    }
}
