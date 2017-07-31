import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Directory} from '../../model/directory.model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
})

export class TreeComponent {
  @Input() directories: Array<Directory>;
  @Output() checked = new EventEmitter<string>();

  OnChanges() {         // Intercept input property changes
    if (this.directories) {
      for (const dir of this.directories) {
        dir.dirChecked.subscribe((checkboxed) => {
          this.checked.emit(checkboxed);
        });
      }
    }
  }
}
