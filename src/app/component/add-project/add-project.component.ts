import {
  Component,
  OnInit
} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {

  importStep: FormGroup;
  nameStep: FormGroup;
  projectName: string;
  txtUrl: string;
  xmlUrl: string;

  constructor(private formBuilder: FormBuilder) {
  }

  cancel() {
    this.txtUrl = '';
    this.xmlUrl = '';
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
    this.txtUrl = 'None';
    this.xmlUrl = 'None';
  }

}
