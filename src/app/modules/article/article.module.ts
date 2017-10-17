// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';

// App
import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleService } from '../../services/article.service';
import { ArticleRemoveComponent } from './article-remove/article-remove.component';
import { ArticleAddComponent } from './article-add/article-add.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ProjectService } from '../../services/project.service';

@NgModule({
    imports: [
        CommonModule,
        ArticleRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatMenuModule,
        MatSelectModule,
    ],
    declarations: [
        ArticleComponent,
        ArticleRemoveComponent,
        ArticleAddComponent,
        ArticleEditComponent,
    ],
    entryComponents: [
        ArticleRemoveComponent,
    ],
    providers: [
        ArticleService,
        ProjectService,
    ],
})
export class ArticleModule { }
