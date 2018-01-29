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

export class AddProjectComponent implements OnInit {

  importStep: FormGroup;
  nameStep: FormGroup;
  files: {
    'txt': any,
    'xml': any
  };
  urls: {
    'txt': string,
    'xml': string
  };
  isFile: boolean;
  project: Project;

  constructor(private formBuilder: FormBuilder) {
    this.project = new Project();
    this.isFile = true;
  }

  cancel() {
    this.urls.txt = '';
    this.urls.txt = '';
  }

  ngOnInit() {
    this.nameStep = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.importStep = this.formBuilder.group({
      urlTxt: ['', Validators.required]
    });
  }

  update(file: File) {
    this.urls.txt = 'Empty';
    this.urls.txt = 'Empty';
    console.log(this.project);
  }

}
