// Angular
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { OnDestroy} from '@angular/core';

// RxJs
import { Subscription } from 'rxjs/Subscription';

// App
import { ArticleService } from '../../../services/article.service';
import { ProjectService } from '../../../services/project.service';
import { ArticleModel } from '../../../models/article.model';
import { FadeInAnimation } from '../../../animations/fade-in.animation';
import { Location } from '@angular/common';

@Component({
    selector: 'app-article-add',
    templateUrl: './article-add.component.html',
    styleUrls: ['./article-add.component.css'],
    animations: [
        FadeInAnimation,
    ],
})
export class ArticleAddComponent implements OnInit, OnDestroy {
    private projectSubscription: Subscription;

    public form = new FormGroup({
        projectId  : new FormControl(''),
        title      : new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl(''),
        text       : new FormControl(''),
    });

    public constructor(
        private location: Location,
        public articleService: ArticleService,
        public projectService: ProjectService,
    ) { }

    public ngOnInit(): void {
        this.projectSubscription = this.projectService.list.subscribe();
    }

    public ngOnDestroy(): void {
        this.projectSubscription.unsubscribe();
    }

    public submit(): void {
        this.articleService.push(new ArticleModel(this.form.value))
            .then(() => {
                this.location.back();
            });
    }
}
