import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../../model/project.model';
import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent {

  code: number;
  fileSelected: boolean;
  fileTxt: File;
  fileXml: File;
  isFile: boolean;
  project: Project;
  urlTxt: string;
  urlXml: string;

  constructor(private elasticsearchService: ElasticsearchService, private http: HttpClient, private router: Router) {
    this.code = 0;
    this.fileSelected = true;
    this.fileTxt = null;
    this.fileXml = null;
    this.isFile = true;
    this.urlTxt = '';
    this.urlXml = '';
    this.project = new Project();
    this.project.name = '';
    this.elasticsearchService.countProjects().subscribe(response => this.project.id = response);
    this.project.num_execs = 0;
  }

  cancel() {
    this.urlTxt = '';
    this.urlXml = '';
  }

  save() {
    this.code = 1;
    this.elasticsearchService.postProject(this.project).subscribe(
      response => {
        if (this.urlTxt !== 'Empty') {
          this.elasticsearchService.downloadUrl(this.urlTxt).subscribe(
            result0 => console.log(result0)
          );
        } else {
          let headers: HttpHeaders = new HttpHeaders();
          this.http.post('http://localhost:8443/files/update', JSON.stringify(this.project.name), {headers: headers}).subscribe(
            result1 => {
              headers = new HttpHeaders();
              headers.append('Content-Type', 'application/pdf');
              const formData = new FormData();
              formData.append('file', this.fileTxt);
              this.http.post('http://localhost:8443/files/upload', formData, {headers: headers}).subscribe(
                result2 => {
                  this.code = 2;
                }
              );
            },
            error => console.log(error)
          );
        }
      }
    );
  }

  update(file: File) {
    (file.name.includes('.txt')) ? (this.fileTxt = file) : (this.fileXml = file);
    this.urlTxt = 'Empty';
    this.urlXml = 'Empty';
  }

  private returnHome() {
    this.router.navigateByUrl('/');
  }

}
