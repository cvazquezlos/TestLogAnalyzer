import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent {

  importStep: FormGroup;
  nameStep: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.nameStep = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.importStep = this.formBuilder.group({
      import: ['', Validators.required]
    });
  }

}
