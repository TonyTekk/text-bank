// Angular
import { Component } from '@angular/core';
import { Location } from '@angular/common';

// App
import { FadeInAnimation } from '../../animations/fade-in.animation';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css'],
    animations: [
        FadeInAnimation,
    ],
})
export class ArticleComponent {
    public constructor(
        private location: Location,
    ) { }

    public toArticles(): void {
        this.location.back();
    }
}
