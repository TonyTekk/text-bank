// Angular
import { Component } from '@angular/core';

// Services
import { ArticleService } from '../services/article.service';
import { Article } from '../services/article.service';

@Component({
    selector: 'app-texts',
    templateUrl: './texts.component.html',
    styleUrls: ['./texts.component.css']
})
export class TextsComponent {
    private newArticle: Article = {
        title: 'title',
        description: 'description',
        text: 'text' ,
    };

    public constructor(
        public article: ArticleService,
    ) { }

    public addArticle(): void {
        this.article.push(this.newArticle);
    }
}
