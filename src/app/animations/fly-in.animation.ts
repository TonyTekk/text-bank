// Animation
import { trigger } from '@angular/animations';
import { style } from '@angular/animations';
import { animate } from '@angular/animations';
import { transition } from '@angular/animations';

export const FlyInAnimation = trigger('fly-in', [
                     transition('void => *', [
                         style({transform: 'translateX(-100%)'}),
                         animate(300)
                     ]),
                 ]);
