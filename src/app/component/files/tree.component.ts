import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Directory} from '../../model/directory.model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
})

export class TreeComponent {
  @Input() directories: Array<Directory>;
  @Output() checked = new EventEmitter<string>();

  ngOnChanges() {         //Intercept input property changes
    if(this.directories) {
      for (let dir of this.directories) {
        dir.dirChecked.subscribe((checkboxed)=> {
          this.checked.emit(checkboxed);
        });
      }
    }
  }
}
