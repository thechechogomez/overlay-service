import { Component } from '@angular/core';
import { OverlayService } from './overlay-service/overlay.service';
import { SlideInComponent } from './slide-in/slide-in.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private overlayService: OverlayService) {}

  openPortal() {
    this.overlayService
      .open(SlideInComponent, {
        data: {
          test: 'test',
        },
      })

  }
}
