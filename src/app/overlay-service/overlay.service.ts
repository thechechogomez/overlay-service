import { ComponentType, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { OverlayReference } from './overlay-reference';

const DEFAULT_CONFIG: OverlayConfig = {
  hasBackdrop: true,
  backdropClass: 'transparent-backdrop',
  width: 'auto',
  height: '100%',
  maxWidth: '90%',
  maxHeight: '100%',
  panelClass: 'overlay-panel',
};

interface Data_OverlayConfig extends OverlayConfig {
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T>(component: ComponentType<T>, options: Data_OverlayConfig): OverlayReference {
    const { data, ...config } = options;
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
    const overlayConfig: OverlayConfig = {
      ...DEFAULT_CONFIG,
      ...config,
      positionStrategy,
    };

    const overlayRef = this.overlay.create(overlayConfig);
    const overlayComponentRef = new OverlayReference(overlayRef, data);
    const injectorTokens = new WeakMap([[OverlayReference, overlayComponentRef]]);

    const containerRef = overlayRef.attach(new ComponentPortal(component, null, new PortalInjector(this.injector, injectorTokens)));
    overlayComponentRef.componentInstance = containerRef.instance;

    return overlayComponentRef;
  }
}
