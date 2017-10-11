// Angular
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Inject} from '@angular/core';

// Material
import { MAT_DIALOG_DATA } from '@angular/material';

// App
import { ProjectModel } from '../../models/project.model';

@Component({
  selector: 'app-project-remove',
  templateUrl: './project-remove.component.html',
  styleUrls: ['./project-remove.component.css']
})
export class ProjectRemoveComponent {
    public projectName = new FormControl('', [Validators.required]);

    public constructor(
        @Inject(MAT_DIALOG_DATA) public project: ProjectModel
    ) {}
}
