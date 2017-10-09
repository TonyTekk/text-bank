// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// App
import { TextsRoutingModule } from './texts-routing.module';
import { TextsComponent } from './texts.component';

@NgModule({
  imports: [
      CommonModule,
      TextsRoutingModule
  ],
  declarations: [
      TextsComponent,
  ]
})
export class TextsModule { }
