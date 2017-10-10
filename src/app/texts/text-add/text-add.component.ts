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
import { Article } from '../../services/article.service';

@Component({
    selector: 'app-text-add',
    templateUrl: './text-add.component.html',
    styleUrls: ['./text-add.component.css']
})
export class TextAddComponent {
    public constructor(
        public dialogRef: MatDialogRef<TextAddComponent>,
        @Inject(MAT_DIALOG_DATA) public article: Article
    ) { }

    public form = new FormGroup({
        title      : new FormControl(this.article.title, [Validators.required, Validators.minLength(5)]),
        description: new FormControl(this.article.description),
        text       : new FormControl(this.article.text),
    });

    public add(): void {
        this.dialogRef.close({
            id: this.article.id,
            title: this.form.controls.title.value,
            description: this.form.controls.description.value,
            text: this.form.controls.text.value,
        });
    }

    public onNoClick(): void {
        this.dialogRef.close(false);
    }
}
