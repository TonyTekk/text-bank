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
import { ProjectModel } from '../../models/project.model';

@Component({
    selector: 'app-project-update',
    templateUrl: './project-update.component.html',
    styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent {
    public constructor(
        public dialogRef: MatDialogRef<ProjectUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public project: ProjectModel
    ) { }

    public form = new FormGroup({
        name: new FormControl(this.project.name, [Validators.required, Validators.minLength(5)]),
        apiId: new FormControl(this.project.apiId),
    });

    public update(): void {
        const article = new ProjectModel({
            id: this.project.id,
            apiId: this.form.controls.apiId.value,
            name: this.form.controls.name.value,
            color: this.project.color,
        });

        this.dialogRef.close(article);
    }

    public onNoClick(): void {
        this.dialogRef.close(false);
    }
}
