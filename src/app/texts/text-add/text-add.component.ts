// Angular
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

// Material
import { MatDialogRef } from '@angular/material';

// App
import { Article } from '../../services/article.service';

@Component({
    selector: 'app-text-add',
    templateUrl: './text-add.component.html',
    styleUrls: ['./text-add.component.css']
})
export class TextAddComponent {
    public form = new FormGroup({
        title      : new FormControl('', [Validators.required, Validators.minLength(5)]),
        description: new FormControl(''),
        text       : new FormControl(''),
    });

    public constructor(
        public dialogRef: MatDialogRef<TextAddComponent>
    ) { }

    public add(): void {
        const article: Article = {
            title: this.form.controls.title.value,
            description: this.form.controls.description.value,
            text: this.form.controls.text.value,
        };

        this.dialogRef.close(article);
    }

    public onNoClick(): void {
        this.dialogRef.close(false);
    }
}
