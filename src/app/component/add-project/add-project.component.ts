import {
  Component,
  OnInit
} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Project} from '../../model/project.model';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent {

  fileSelected: boolean;
  fileTxt: any;
  fileXml: any;
  urlTxt: string;
  urlXml: string;
  isFile: boolean;
  project: Project;

  constructor() {
    this.project = new Project();
    this.isFile = true;
    this.urlTxt = '';
    this.urlXml = '';
    this.fileSelected = true;
    this.fileTxt = '';
    this.fileXml = '';
  }

  cancel() {
    this.urlTxt = '';
    this.urlXml = '';
  }

  update(file: File) {
    (file.name.includes('.txt')) ? (this.fileTxt = file) : (this.fileXml = file);
    this.urlTxt = 'Empty';
    this.urlXml = 'Empty';
  }

}
