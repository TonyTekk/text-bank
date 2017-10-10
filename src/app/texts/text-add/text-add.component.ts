// Angular
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

// Material
import { MatDialogRef } from '@angular/material';

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
        this.dialogRef.close({
            title: this.form.controls.title.value,
            description: this.form.controls.description.value,
            text: this.form.controls.text.value,
        });
    }

    public onNoClick(): void {
        this.dialogRef.close(false);
    }
}
