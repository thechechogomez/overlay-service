import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export class OverlayReference {
  public componentInstance: any;
  public afterClosed = new Subject<any>();

  constructor(public overlay: OverlayRef, public data: any) {}

  close(data?: any) {
    this.componentInstance.startExitAnimation();

    this.componentInstance.animationStateChanged
      .pipe(
        filter((event: any) => event.phaseName === 'done' && event.toState === 'leave'),
        take(1)
      )
      .subscribe((response: any) => {
        
        this.overlay.dispose();
        this.afterClosed.next(data);
        this.afterClosed.complete();

        this.componentInstance = null!;
      });

  }
}
