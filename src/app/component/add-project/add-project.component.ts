import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {Project} from '../../model/project.model';
import {ElasticsearchService} from '../../service/elasticsearch.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {

  code: number;
  fileSelected: boolean;
  fileTxt: File;
  fileXml: File;
  isFile: boolean;
  project: Project;
  urlTxt: string;
  urlXml: string;

  constructor(private elasticsearchService: ElasticsearchService, private http: HttpClient, private router: Router,
              private breadcrumbs: BreadcrumbsService) {
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

  ngOnInit() {
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []},
      {label: 'Add project', url: '/projects/add', params: []}])
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
                  if (this.urlXml !== 'Empty') {
                    this.elasticsearchService.downloadUrl(this.urlXml).subscribe(
                      result3 => {
                      }
                    );
                  }
                }
              );
            } else {
              headers = new HttpHeaders();
              headers.append('Content-Type', 'application/pdf');
              const mainFormData = new FormData();
              if (this.fileTxt !== null) {
                mainFormData.append('file', this.fileTxt);
                this.http.post<string>('http://localhost:8443/files/file', mainFormData, {headers: headers}).subscribe(
                  result2 => {
                    this.code = 2;
                    if (this.fileXml !== null) {
                      const secondaryFormData = new FormData();
                      secondaryFormData.append('file', this.fileXml);
                      this.http.post<string>('http://localhost:8443/files/file', secondaryFormData, {headers: headers}).subscribe(
                        result3 => {
                          this.code = 2;
                        }
                      );
                    }
                  }
                );
              } else {
                mainFormData.append('file', this.fileXml);
                this.http.post<string>('http://localhost:8443/files/file', mainFormData, {headers: headers}).subscribe(
                  result2 => {
                    this.code = 2;
                    if (this.fileTxt !== null) {
                      const secondaryFormData = new FormData();
                      secondaryFormData.append('file', this.fileTxt);
                      this.http.post<string>('http://localhost:8443/files/file', secondaryFormData, {headers: headers}).subscribe(
                        result3 => {
                          this.code = 2;
                        }
                      );
                    }
                  }
                );
              }
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

  private returnHome() {
    this.router.navigateByUrl('/');
  }
}
