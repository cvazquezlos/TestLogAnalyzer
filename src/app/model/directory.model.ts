import {Output, EventEmitter} from "@angular/core";

export class Directory{
  @Output() dirChecked = new EventEmitter();

  name: string;
  directories: Array<Directory>;
  files: Array<String>;
  expanded:boolean;
  checked:boolean;
  constructor(name,directories,files) {
    this.name = name;
    this.files = files;
    this.directories = directories;
    this.expanded = false;
    this.checked = false;
  }

  toggle(){
    this.expanded = !this.expanded;
  }

  check(){
    let newState = !this.checked;
    this.checked = newState;
    this.checkRecursive(newState);
    this.dirChecked.emit(this.name);        //quizá this checked ya que se llama también cuando descheckeas.
  }

  checkRecursive(state){
    this.directories.forEach(d => {
      d.checked = state;
      d.checkRecursive(state);
    })
  }
}
