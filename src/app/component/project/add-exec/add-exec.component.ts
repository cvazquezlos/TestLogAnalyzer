import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BreadcrumbsService} from 'ng2-breadcrumbs';
import {Project} from '../../../model/project.model';
import {ElasticsearchService} from '../../../service/elasticsearch.service';

@Component({
  selector: 'app-add-exec',
  templateUrl: './add-exec.component.html',
  styleUrls: ['./add-exec.component.css']
})

export class AddExecComponent implements OnInit {

  code: number;
  fileSelected: boolean;
  fileTxt: File;
  fileXml: File;
  isFile: boolean;
  project: Project;
  urlTxt: string;
  urlXml: string;

  constructor(private http: HttpClient, private router: Router, private elasticsearchService: ElasticsearchService,
              private activatedRoute: ActivatedRoute, private breadcrumbs: BreadcrumbsService) {
    this.code = 0;
    this.fileSelected = true;
    this.fileTxt = null;
    this.fileXml = null;
    this.isFile = true;
    this.urlTxt = '';
    this.urlXml = '';
  }

  cancel() {
    this.urlTxt = '';
    this.urlXml = '';
  }


  ngOnInit() {
    const name = this.activatedRoute.snapshot.parent.params['project'];
    this.elasticsearchService.getProjectByName(name).subscribe(response => {
        this.project = response;
      }
    );
    this.breadcrumbs.store([{label: 'Home', url: '/', params: []},
      {label: name, url: '/projects/' + name, params: []},
      {label: 'Add exec', url: '/projects/' + name + '/add', params: []}]);
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
