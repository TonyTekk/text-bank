// Angular
import { Component } from '@angular/core';

// Material
import { MatDialog } from '@angular/material';

// App
import { ArticleService } from '../services/article.service';
import { Article } from '../services/article.service';
import { TextAddComponent } from './text-add/text-add.component';

@Component({
    selector: 'app-texts',
    templateUrl: './texts.component.html',
    styleUrls: ['./texts.component.css']
})
export class TextsComponent {
    public constructor(
        public article: ArticleService,
        public dialog: MatDialog
    ) { }

    public addArticle(): void {
        const dialogRef = this.dialog.open(TextAddComponent);

        dialogRef.afterClosed().subscribe(
            (article: Article) => {
                if (article) {
                    this.article.push(article);
                }
            });
    }
}
