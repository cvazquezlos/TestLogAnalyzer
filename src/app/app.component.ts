import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  constructor(private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
  }

  toggleFullscreen() {
    let documentVar = document as any;
    let documentElement = document.documentElement as any;
    let documentBody = document.body as any;

    if (documentVar.fullscreenElement || // alternative standard method
      documentVar.mozFullScreenElement || // currently working methods
      documentVar.webkitFullscreenElement ||
      documentVar.msFullscreenElement) {
      if (documentVar.exitFullscreen) {
        documentVar.exitFullscreen();
      } else if (documentVar.mozCancelFullScreen) {
        documentVar.mozCancelFullScreen();
      } else if (documentVar.webkitExitFullscreen) {
        documentVar.webkitExitFullscreen();
      } else if (documentVar.msExitFullscreen) {
        documentVar.msExitFullscreen();
      }
    } else {
      let element = Element as any;
      if (documentElement.requestFullscreen) {
        documentElement.requestFullscreen();
      } else if (documentElement.mozRequestFullScreen) {
        documentElement.mozRequestFullScreen();
      } else if (documentElement.webkitRequestFullscreen) {
        documentElement.webkitRequestFullscreen(element.ALLOW_KEYBOARD_INPUT);
      } else if (documentBody.msRequestFullscreen) {
        documentBody.msRequestFullscreen();
      }
    }
  }
}
