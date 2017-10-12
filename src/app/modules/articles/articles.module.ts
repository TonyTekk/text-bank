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

// App
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { ArticleService } from '../../services/article.service';

@NgModule({
    imports: [
        CommonModule,
        ArticlesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatMenuModule,
    ],
    declarations: [
        ArticlesComponent,
    ],
    providers: [
        ArticleService,
    ],
})
export class ArticlesModule { }
