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
}
