// Angular
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

// App
import { ArticleService } from '../../../services/article.service';
import { ArticleModel } from '../../../models/article.model';
import { FadeInAnimation } from '../../../animations/fade-in.animation';

@Component({
    selector: 'app-article-add',
    templateUrl: './article-add.component.html',
    styleUrls: ['./article-add.component.css'],
    animations: [
        FadeInAnimation,
    ],
})
export class ArticleAddComponent {
    public form = new FormGroup({
        title      : new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl(''),
        text       : new FormControl(''),
    });

    public constructor(
        private router: Router,
        public articleService: ArticleService,
    ) { }

    public submit(): void {
        this.articleService.push(new ArticleModel(this.form.value))
            .then(() => {
                this.router.navigate(['/articles']);
            });
    }
}
