import {
  Component,
  OnInit
} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../../model/project.model';
import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent {

  fileSelected: boolean;
  fileTxt: File;
  fileXml: File;
  urlTxt: string;
  urlXml: string;
  isFile: boolean;
  project: Project;
  updatingFile: boolean;

  constructor(private elasticsearchService: ElasticsearchService, private http: HttpClient) {
    this.project = new Project();
    this.project.name = '';
    this.elasticsearchService.countProjects().subscribe(response => this.project.id = response);
    this.project.num_execs = 1;
    this.isFile = true;
    this.urlTxt = '';
    this.urlXml = '';
    this.fileSelected = true;
    this.fileTxt = null;
    this.fileXml = null;
    this.updatingFile = false;
  }

  cancel() {
    this.urlTxt = '';
    this.urlXml = '';
  }

  save() {
    this.updatingFile = true;
    this.elasticsearchService.postProject(this.project).subscribe(
      response => {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:8443/files/update', this.project.name, {headers: headers});
        headers = new HttpHeaders();
        headers.append('Content-Type', 'application/pdf');
        const formData = new FormData();
        formData.append('file', this.fileTxt);
        this.http.post('http://localhost:8443/files/upload', formData, {headers: headers});
        this.updatingFile = false;
      }
    );
  }

  update(file: File) {
    (file.name.includes('.txt')) ? (this.fileTxt = file) : (this.fileXml = file);
    this.urlTxt = 'Empty';
    this.urlXml = 'Empty';
  }

}
