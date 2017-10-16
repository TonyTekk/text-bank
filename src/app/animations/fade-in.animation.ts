// Animation
import { trigger } from '@angular/animations';
import { style } from '@angular/animations';
import { animate } from '@angular/animations';
import { transition } from '@angular/animations';
import { state } from '@angular/animations';

export const FadeInAnimation =  trigger('fade-in', [
    state('true', style({
        opacity: 1
    })),
    state('false',   style({
        opacity: 0
    })),
    transition('* => *', [
        animate(300)
    ]),
]);
