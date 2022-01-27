import { animate, state, style, transition, trigger } from '@angular/animations';
import { EventEmitter } from '@angular/core';
import { AnimationEvent } from "@angular/animations";

export const OVERLAY_ANIMATIONS_EXAMPLE = [
  trigger('slideContent', [
    state('void', style({ transform: 'translate3d(100%, 0, 0)' })),
    state('enter', style({ transform: 'none' })),
    state('leave', style({ transform: 'translate3d(100%, 0, 0)' })),
    transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
  ]),
];

export class OverlayAnimationsExample {
  public animationState: 'void' | 'enter' | 'leave' = 'enter';
  private animationStateChanged = new EventEmitter<AnimationEvent>();

  onAnimationStart(event: AnimationEvent) {    
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation() {
    this.animationState = 'leave';
  }
}
