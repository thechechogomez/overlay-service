import { Component, OnInit } from '@angular/core';
import {
  OverlayAnimationsExample,
  OVERLAY_ANIMATIONS_EXAMPLE,
} from '../overlay-service/animation-example';
import { OverlayReference } from '../overlay-service/overlay-reference';

@Component({
  selector: 'app-slide-in',
  templateUrl: './slide-in.component.html',
  animations: OVERLAY_ANIMATIONS_EXAMPLE,
})
export class SlideInComponent extends OverlayAnimationsExample implements OnInit{

  constructor(private overlayRef: OverlayReference) {
    super();
    console.log('Component Data', this.overlayRef.data);
  }

  ngOnInit() {
    this.overlayRef.overlay.backdropClick().subscribe(() => {        
      this.overlayRef.close();
    });
  }
}
