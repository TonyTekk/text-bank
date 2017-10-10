// Angular
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Inject} from '@angular/core';

// Material
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

// App
import { ArticleModel } from '../../models/article.model';

@Component({
    selector: 'app-text-update',
    templateUrl: './text-update.component.html',
    styleUrls: ['./text-update.component.css']
})
export class TextUpdateComponent {
    public constructor(
        public dialogRef: MatDialogRef<TextUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public article: ArticleModel
    ) { }

    public form = new FormGroup({
        title      : new FormControl(this.article.title, [Validators.required, Validators.minLength(5)]),
        description: new FormControl(this.article.description),
        text       : new FormControl(this.article.text),
    });

    public update(): void {
        const article = new ArticleModel({
            id: this.article.id,
            projectId: this.article.projectId,
            title: this.form.controls.title.value,
            description: this.form.controls.description.value,
            text: this.form.controls.text.value,
        });

        this.dialogRef.close(article);
    }

    public onNoClick(): void {
        this.dialogRef.close(false);
    }
}
