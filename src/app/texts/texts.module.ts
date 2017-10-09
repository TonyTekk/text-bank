// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Firebase
import { AngularFireDatabase } from 'angularfire2/database';

// Material
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';

// App
import { TextsRoutingModule } from './texts-routing.module';
import { TextsComponent } from './texts.component';
import { ArticleService } from '../services/article.service';

@NgModule({
    imports: [
        CommonModule,
        TextsRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatDialogModule,
    ],
    declarations: [
        TextsComponent,
    ],
    providers: [
        AngularFireDatabase,
        ArticleService,
    ],
})
export class TextsModule { }
