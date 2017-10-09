// Angular
import { Component } from '@angular/core';

@Component({
    selector: 'app-texts',
    templateUrl: './texts.component.html',
    styleUrls: ['./texts.component.css']
})
export class TextsComponent {
    public addArticle(): void {
        console.log('add');
    }
}
