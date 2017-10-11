// Angular
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy} from '@angular/core';

// Animation
import { trigger } from '@angular/animations';
import { style } from '@angular/animations';
import { animate } from '@angular/animations';
import { transition } from '@angular/animations';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css'],
    animations: [
        trigger('init', [
            transition('* => *', [
                style({transform: 'translateX(-100%)'}),
                animate(300)
            ]),
        ]),
    ],
})
export class ProjectsComponent  implements OnInit, OnDestroy {
    // Animation triggers
    public init = false;

    public ngOnInit(): void {}
    public ngOnDestroy(): void { }

    public add(): void {

    }
}
