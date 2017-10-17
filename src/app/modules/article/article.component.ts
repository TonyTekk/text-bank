// Angular
import { Component } from '@angular/core';
import { FadeInAnimation } from '../../animations/fade-in.animation';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css'],
    animations: [
        FadeInAnimation,
    ],
})
export class ArticleComponent { }
