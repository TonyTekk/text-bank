// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';

// App
import { TextsRoutingModule } from './texts-routing.module';
import { TextsComponent } from './texts.component';

@NgModule({
  imports: [
      CommonModule,
      TextsRoutingModule,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
  ],
  declarations: [
      TextsComponent,
  ]
})
export class TextsModule { }
