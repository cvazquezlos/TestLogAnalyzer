import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Project} from '../../model/project.model';
import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-add-exec',
  templateUrl: './add-exec.component.html',
  styleUrls: ['./add-exec.component.css']
})

export class AddExecComponent {

  code: number;
  fileSelected: boolean;
  fileTxt: File;
  fileXml: File;
  isFile: boolean;
  project: Project;
  urlTxt: string;
  urlXml: string;

  constructor(private http: HttpClient, private router: Router, private elasticsearchService: ElasticsearchService,
              private activatedRoute: ActivatedRoute) {
    this.code = 0;
    this.fileSelected = true;
    this.fileTxt = null;
    this.fileXml = null;
    this.isFile = true;
    this.urlTxt = '';
    this.urlXml = '';
    const name = this.activatedRoute.snapshot.params['project'];
    this.elasticsearchService.getProjectByName(name).subscribe(response => {
        this.project = response;
      }
    );
  }

  cancel() {
    this.urlTxt = '';
    this.urlXml = '';
  }

  save() {
    this.code = 1;
    this.elasticsearchService.postProject(this.project).subscribe(
      response => {
        let headers: HttpHeaders = new HttpHeaders();
        this.http.post<string>('http://localhost:8443/files/update', JSON.stringify(this.project.name), {headers: headers}).subscribe(
          result1 => {
            if (this.urlTxt !== 'Empty') {
              this.elasticsearchService.downloadUrl(this.urlTxt).subscribe(
                result2 => {
                  this.code = 2;
                }
              );
            } else {
              headers = new HttpHeaders();
              headers.append('Content-Type', 'application/pdf');
              const formData = new FormData();
              formData.append('file', this.fileTxt);
              this.http.post<string>('http://localhost:8443/files/file', formData, {headers: headers}).subscribe(
                result2 => {
                  this.code = 2;
                }
              );
            }
          },
          error => console.log(error)
        );
      }
    );
  }

  update(file: File) {
    (file.name.includes('.txt')) ? (this.fileTxt = file) : (this.fileXml = file);
    this.urlTxt = 'Empty';
    this.urlXml = 'Empty';
  }
}
